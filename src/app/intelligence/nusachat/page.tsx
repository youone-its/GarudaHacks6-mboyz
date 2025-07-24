"use client";

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Send, User, Bot, RefreshCw } from 'lucide-react';
import { Square } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function NusaChats() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello, I'm Nusa Assistant...",
      sender: 'assistant',
      timestamp: '23:10'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState('General');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const prevMessagesLength = useRef(messages.length);
  const [typingMessage, setTypingMessage] = useState(''); // Untuk efek mengetik
  const [fullGeminiText, setFullGeminiText] = useState(''); // Untuk menyimpan jawaban penuh
  const typewriterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [dotCount, setDotCount] = useState(1); // Untuk animasi titik

  // Animasi titik pada "Generating..."
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTyping) {
      interval = setInterval(() => {
        setDotCount((prev) => (prev % 3) + 1);
      }, 500);
    } else {
      setDotCount(1);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTyping]);

  const scrollToBottom = () => {
    if (messagesEndRef.current && messagesEndRef.current.parentElement) {
      messagesEndRef.current.parentElement.scrollTop = messagesEndRef.current.parentElement.scrollHeight;
    }
  };

  useEffect(() => {
    if (messages.length > prevMessagesLength.current) {
      scrollToBottom();
    }
    prevMessagesLength.current = messages.length;
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Filter: hanya pertanyaan tentang Nusantara/budaya yang diteruskan ke API
    const allowedKeywordsByAgent: Record<string, string[]> = {
      'General': ['budaya', 'nusantara', 'tradisi', 'adat', 'indonesia', 'makanan khas', 'rumah adat', 'pakaian adat', 'lagu daerah', 'seni', 'wayang', 'batik', 'keris', 'upacara', 'festival', 'kesenian', 'daerah', 'provinsi', 'pulau', 'suku', 'bahasa daerah'],
      'Tarian': ['tarian', 'tari', 'tari daerah', 'tari tradisional', 'tari nusantara', 'tari indonesia', 'tari adat', 'tari modern', 'tari klasik', 'tari kreasi', 'tari rakyat', 'tari istana', 'tari upacara'],
      'Alat Musik': ['alat musik', 'musik', 'musik tradisional', 'musik daerah', 'musik nusantara', 'musik indonesia', 'musik adat', 'musik modern', 'musik klasik', 'musik kreasi', 'musik rakyat', 'musik istana', 'musik upacara']
    };
    const agentKeywords = allowedKeywordsByAgent[activeCategory as keyof typeof allowedKeywordsByAgent] || allowedKeywordsByAgent['General'];
    const isAgentQuestion = agentKeywords.some((keyword: string) => inputMessage.toLowerCase().includes(keyword));

    // Siapkan prompt untuk Gemini
    let promptText = inputMessage;
    if (!isAgentQuestion) {
      promptText = `Pertanyaan pengguna: "${inputMessage}"

Anda adalah AI Assistant dengan spesialisasi di bidang ${activeCategory}. Jika pertanyaan ini tidak berkaitan dengan ranah ${activeCategory}, tolong jawab dengan sopan: 'Mohon maaf, saya hanya dapat membantu pertanyaan seputar ${activeCategory}.'`;
    } else {
      promptText = `Anda adalah AI Assistant dengan spesialisasi di bidang ${activeCategory}. Jawablah pertanyaan berikut secara informatif dan relevan sesuai bidang ${activeCategory}:\n${inputMessage}`;
    }

    try {
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyD4JBbto4i8V4ZnRKgkCFj3LeFiVrFaPDI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const geminiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Maaf, saya tidak bisa menjawab saat ini.';
      // Efek mengetik
      let i = 0;
      setTypingMessage('');
      setFullGeminiText(geminiText);
      const typeWriter = () => {
        if (i <= geminiText.length) {
          setTypingMessage(geminiText.slice(0, i));
          i++;
          typewriterTimeoutRef.current = setTimeout(typeWriter, 15); // kecepatan mengetik
        } else {
          const assistantMessage = {
            id: messages.length + 2,
            text: geminiText,
            sender: 'assistant',
            timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, assistantMessage]);
          setTypingMessage('');
          setFullGeminiText('');
          setIsTyping(false);
        }
      };
      typeWriter();
    } catch (err) {
      setMessages(prev => [...prev, {
        id: messages.length + 2,
        text: 'Maaf, terjadi kesalahan pada server AI.',
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
      setTypingMessage('');
      setFullGeminiText('');
      if (typewriterTimeoutRef.current) clearTimeout(typewriterTimeoutRef.current);
    }
  };

  // Fungsi untuk pause efek mengetik dan tampilkan seluruh jawaban
  const handlePauseTyping = () => {
    if (typewriterTimeoutRef.current) clearTimeout(typewriterTimeoutRef.current);
    if (fullGeminiText) {
      const assistantMessage = {
        id: messages.length + 2,
        text: fullGeminiText,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMessage]);
      setTypingMessage('');
      setFullGeminiText('');
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 1,
        text: `Hello, I am ${activeCategory} agent NusaAssistant...`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/batik.svg')",
        backgroundRepeat: "repeat",
        backgroundColor: "#388e3c",
        backgroundSize: "1000px"
      }}
    >
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center pt-56 pb-8 relative w-full">
        {/* Watermark di tengah form chat, tidak ikut scroll */}
        {/* <div className="pointer-events-none select-none z-10" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', opacity: 0.18 }}>
          <span className="text-gray-300 text-5xl font-semibold">NusaIntelligence</span>
        </div> */}
        <div className={`max-w-4xl mx-auto w-full transition-all ${isTyping ? 'mt-16' : ''} relative`}> {/* tambahkan relative agar spinner absolute ke chat */}
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Let's Talk with our Assistant NusaChats
          </h1>

          {/* Category Selection */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 flex">
              {['General', 'Tarian', 'Alat Musik'].map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setMessages([
                      {
                        id: 1,
                        text: `Hello, I am ${category} agent NusaAssistant...`,
                        sender: 'assistant',
                        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                      }
                    ]);
                  }}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category ? 'bg-green-700 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Container */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gray-100 px-6 py-4 border-b relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Nusa Intelligence</h3>
                    <p className="text-sm text-gray-600">Online</p>
                  </div>
                </div>
                <button onClick={resetChat} className="p-2 rounded-full hover:bg-gray-200 transition-colors" title="Reset Chat">
                  <RefreshCw className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              {/* Spinner Loading di tengah header chat */}
              {isTyping && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex justify-center items-center">
                  <div className="rounded-full p-2 flex items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-600 border-solid mr-2" />
                   <span className="text-black text-x font-semibold ml-1" style={{letterSpacing:1}}>
                     Generating{'.'.repeat(dotCount)}
                   </span>
                  </div>
                </div>
              )}
            </div>

            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 relative">
              {messages.map((message, idx) => (
                <div
                  key={message.id}
                  className={`w-full mb-4 flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center w-full" style={{ maxWidth: '90vw' }}>
                    <span className={`text-xs font-semibold mb-1 ${message.sender === 'user' ? 'text-green-700 text-right ml-auto' : 'text-gray-700 text-left'}`}
                      style={{}}>
                      {message.sender === 'user' ? 'You' : 'NusaAssistant'}
                    </span>
                    {/* Spinner di samping kanan label NusaAssistant */}
                  </div>
                  <div
                    className={`relative max-w-[90vw] sm:max-w-md md:max-w-lg px-6 py-4 pr-14 rounded-2xl shadow-sm break-words leading-relaxed ${
                      message.sender === 'user'
                        ? 'bg-green-600 text-white rounded-br-md ml-8'
                        : 'bg-gray-200 text-gray-800 rounded-bl-md mr-8'
                    }`}
                    style={{ minHeight: 44 }}
                  >
                    {message.sender === 'assistant' ? (
                      <ReactMarkdown 
                        components={{
                          p: ({node, ...props}) => <p className="text-sm whitespace-pre-line mb-2" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc ml-6 mb-2" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal ml-6 mb-2" {...props} />,
                          li: ({node, ...props}) => <li className="mb-1" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
                          em: ({node, ...props}) => <em className="italic" {...props} />,
                          code: ({node, ...props}) => <code className="bg-gray-100 px-1 rounded text-xs" {...props} />,
                          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-green-600 pl-4 italic text-gray-600 my-2" {...props} />
                        }}
                      >{message.text}</ReactMarkdown>
                    ) : (
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    )}
                    <span className={`text-xs select-none ${
                      message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                    }`} style={{ position: 'absolute', right: 12, bottom: 8, background: 'rgba(255,255,255,0.0)', paddingLeft: 4 }}>
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              {/* Efek mengetik untuk jawaban assistant */}
              {isTyping && typingMessage && (
                <div className="flex w-full mb-4 justify-start flex-col items-start">
                  <div className="flex items-center w-full" style={{ maxWidth: '90vw' }}>
                    <span className="text-xs font-semibold mb-1 text-gray-700 text-left">NusaAssistant</span>
                  </div>
                  <div className="relative max-w-[90vw] sm:max-w-md md:max-w-lg px-6 py-4 pr-14 rounded-2xl shadow-sm break-words leading-relaxed bg-gray-200 text-gray-800 rounded-bl-md mr-8" style={{ minHeight: 44 }}>
                    <ReactMarkdown 
                      components={{
                        p: ({node, ...props}) => <p className="text-sm whitespace-pre-line mb-2" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc ml-6 mb-2" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal ml-6 mb-2" {...props} />,
                        li: ({node, ...props}) => <li className="mb-1" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
                        em: ({node, ...props}) => <em className="italic" {...props} />,
                        code: ({node, ...props}) => <code className="bg-gray-100 px-1 rounded text-xs" {...props} />,
                        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-green-600 pl-4 italic text-gray-600 my-2" {...props} />
                      }}
                    >{typingMessage}</ReactMarkdown>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Apa saja budaya Indonesia..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  onClick={e => {
                    e.preventDefault();
                    if (isTyping) {
                      handlePauseTyping();
                    } else {
                      sendMessage();
                    }
                  }}
                  className={`w-12 h-12 p-0 rounded-full flex items-center justify-center transition-colors disabled:opacity-50
                    ${isTyping ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'}
                  `}
                  disabled={!inputMessage.trim() && !isTyping}
                >
                  {isTyping ? <Square className="h-6 w-6 text-white" /> : <Send className="h-5 w-5 text-white" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}