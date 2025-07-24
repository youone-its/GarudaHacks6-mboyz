"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ChevronDown, 
  ArrowRightLeft, 
  Mic, 
  ExternalLink,
  Menu,
  X,
  Volume2,
  Copy
} from 'lucide-react';
import { Button } from '@/components/ui/nusachat/button';
import { Card } from '@/components/ui/nusachat/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/nusachat/select';
import { Textarea } from '@/components/ui/nusachat/textarea';

export default function TranslatePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('english');
  const [targetLanguage, setTargetLanguage] = useState('indonesian');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState<'translate' | 'percakapan'>('translate');
  const [conversation, setConversation] = useState<{ from: 'user' | 'partner', text: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [partnerInput, setPartnerInput] = useState('');
  const [isUserRecording, setIsUserRecording] = useState(false);
  const [isPartnerRecording, setIsPartnerRecording] = useState(false);

  const swapLanguages = () => {
    const tempLang = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLang);
    
    const tempText = sourceText;
    setSourceText(translatedText);
    setTranslatedText(tempText);
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setIsLoading(true);
    setTranslatedText('');
    const langMap: Record<string, string> = {
      english: 'Inggris',
      indonesian: 'Indonesia',
      javanese: 'Jawa',
      sundanese: 'Sunda',
      balinese: 'Bali',
      madurese: 'Madura',
      minangkabau: 'Minangkabau',
      batak: 'Batak',
      banjar: 'Banjar',
      acehnese: 'Aceh',
      buginese: 'Bugis',
      makassarese: 'Makassar',
      dayak: 'Dayak',
      sasak: 'Sasak',
      torajan: 'Toraja',
      ambonese: 'Ambon',
      tidorese: 'Tidore',
      ternatese: 'Ternate',
      papuan: 'Papua',
    };
    const prompt = `Terjemahkan ke ${langMap[targetLanguage] || targetLanguage}: ${sourceText}. Hanya hasil terjemahan, tanpa penjelasan.`;
    try {
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyD4JBbto4i8V4ZnRKgkCFj3LeFiVrFaPDI', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const result = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Terjemahan tidak tersedia.';
      setTranslatedText(result);
    } catch (err) {
      setTranslatedText('Terjadi kesalahan pada server AI.');
    }
    setIsLoading(false);
  };

  // Speech-to-text
  const handleRecord = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition tidak didukung di browser ini.');
      return;
    }
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = sourceLanguage === 'english' ? 'en-US' : sourceLanguage === 'indonesian' ? 'id-ID' : 'id-ID';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setIsRecording(true);
    recognition.start();
    recognition.onresult = (event: any) => {
      setSourceText(event.results[0][0].transcript);
      setIsRecording(false);
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
  };

  // Text-to-speech
  const handleSpeak = (text: string, lang: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech tidak didukung di browser ini.');
      return;
    }
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = lang;
    window.speechSynthesis.speak(utter);
  };

  // Copy to clipboard
  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(translatedText);
    }
  };

  // Speech-to-text for conversation
  const handleRecordConversation = (who: 'user' | 'partner') => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition tidak didukung di browser ini.');
      return;
    }
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = who === 'user' ? (sourceLanguage === 'english' ? 'en-US' : sourceLanguage === 'indonesian' ? 'id-ID' : 'id-ID') : (targetLanguage === 'english' ? 'en-US' : targetLanguage === 'indonesian' ? 'id-ID' : 'id-ID');
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    if (who === 'user') setIsUserRecording(true); else setIsPartnerRecording(true);
    recognition.start();
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      if (who === 'user') setUserInput(text); else setPartnerInput(text);
      if (who === 'user') setIsUserRecording(false); else setIsPartnerRecording(false);
    };
    recognition.onerror = () => { if (who === 'user') setIsUserRecording(false); else setIsPartnerRecording(false); };
    recognition.onend = () => { if (who === 'user') setIsUserRecording(false); else setIsPartnerRecording(false); };
  };

  const handleSendConversation = async (who: 'user' | 'partner') => {
    const text = who === 'user' ? userInput : partnerInput;
    if (!text.trim()) return;
    setConversation(prev => [...prev, { from: who, text }]);
    if (who === 'user') setUserInput(''); else setPartnerInput('');
  };

  useEffect(() => {
    if (!sourceText.trim()) {
      setTranslatedText('');
      return;
    }
    const handler = setTimeout(() => {
      handleTranslate();
    }, 600);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceText, sourceLanguage, targetLanguage]);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/batik.svg')",
        backgroundRepeat: 'repeat',
        backgroundColor: '#388e3c',
        backgroundSize: '1000px'
      }}
    >
      <Navbar />
      {/* Main Content */}
      <main className="relative z-10 px-4 py-8 pt-[200px] md:py-16 md:pt-32 lg:pt-100">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 md:mb-12 leading-tight">
            Let's Speak Nusantara<br />
            with NusaTranslate
          </h1>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 flex shadow-md">
              {['translate', 'percakapan'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'translate' | 'percakapan')}
                  className={`px-8 py-2 rounded-full text-base font-semibold transition-colors duration-200 mx-1 ${
                    activeTab === tab ? 'bg-green-700 text-white shadow' : 'text-green-900 hover:bg-green-100'
                  }`}
                >
                  {tab === 'translate' ? 'Translate' : 'Percakapan'}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'translate' ? (
            <Card className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  NusaTranslate
                </h2>
              </div>

              {/* Language Selectors */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                  <SelectTrigger className="w-full md:w-48 h-12 text-lg bg-white border-2 border-gray-200 text-gray-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="indonesian">Indonesian</SelectItem>
                    <SelectItem value="javanese">Javanese</SelectItem>
                    <SelectItem value="sundanese">Sundanese</SelectItem>
                    <SelectItem value="balinese">Balinese</SelectItem>
                    <SelectItem value="madurese">Madurese</SelectItem>
                    <SelectItem value="minangkabau">Minangkabau</SelectItem>
                    <SelectItem value="batak">Batak</SelectItem>
                    <SelectItem value="banjar">Banjar</SelectItem>
                    <SelectItem value="acehnese">Acehnese</SelectItem>
                    <SelectItem value="buginese">Buginese</SelectItem>
                    <SelectItem value="makassarese">Makassarese</SelectItem>
                    <SelectItem value="dayak">Dayak</SelectItem>
                    <SelectItem value="sasak">Sasak</SelectItem>
                    <SelectItem value="torajan">Torajan</SelectItem>
                    <SelectItem value="ambonese">Ambonese</SelectItem>
                    <SelectItem value="tidorese">Tidorese</SelectItem>
                    <SelectItem value="ternatese">Ternatese</SelectItem>
                    <SelectItem value="papuan">Papuan</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  className="h-12 w-12 rounded-full bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600"
                  onClick={swapLanguages}
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </Button>

                <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                  <SelectTrigger className="w-full md:w-48 h-12 text-lg bg-white border-2 border-gray-200 text-gray-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indonesian">Indonesian</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="javanese">Javanese</SelectItem>
                    <SelectItem value="sundanese">Sundanese</SelectItem>
                    <SelectItem value="balinese">Balinese</SelectItem>
                    <SelectItem value="madurese">Madurese</SelectItem>
                    <SelectItem value="minangkabau">Minangkabau</SelectItem>
                    <SelectItem value="batak">Batak</SelectItem>
                    <SelectItem value="banjar">Banjar</SelectItem>
                    <SelectItem value="acehnese">Acehnese</SelectItem>
                    <SelectItem value="buginese">Buginese</SelectItem>
                    <SelectItem value="makassarese">Makassarese</SelectItem>
                    <SelectItem value="dayak">Dayak</SelectItem>
                    <SelectItem value="sasak">Sasak</SelectItem>
                    <SelectItem value="torajan">Torajan</SelectItem>
                    <SelectItem value="ambonese">Ambonese</SelectItem>
                    <SelectItem value="tidorese">Tidorese</SelectItem>
                    <SelectItem value="ternatese">Ternatese</SelectItem>
                    <SelectItem value="papuan">Papuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Translation Areas */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Source Text */}
                <div className="space-y-3">
                  <div className="relative">
                    <Textarea
                      placeholder="Masukkan teks"
                      value={sourceText}
                      onChange={(e) => setSourceText(e.target.value)}
                      className="min-h-60 text-lg resize-none border-2 border-gray-200 focus:border-green-500 rounded-xl bg-white text-gray-800 pr-16"
                    />
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <button
                        type="button"
                        onClick={handleRecord}
                        className={`text-gray-500 hover:text-green-600 ${isRecording ? 'animate-pulse text-red-500' : ''}`}
                        title="Rekam suara"
                      >
                        <Mic className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSpeak(sourceText, sourceLanguage === 'english' ? 'en-US' : sourceLanguage === 'indonesian' ? 'id-ID' : 'id-ID')}
                        className="text-gray-500 hover:text-green-600"
                        title="Bacakan teks"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Target Text */}
                <div className="space-y-3">
                  <div className="relative">
                    <Textarea
                      placeholder="Terjemahan"
                      value={translatedText}
                      onChange={(e) => setTranslatedText(e.target.value)}
                      className="min-h-60 text-lg resize-none border-2 border-gray-200 focus:border-green-500 rounded-xl bg-white text-gray-800 pr-16"
                      readOnly
                    />
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleSpeak(translatedText, targetLanguage === 'english' ? 'en-US' : targetLanguage === 'indonesian' ? 'id-ID' : 'id-ID')}
                        className="text-gray-500 hover:text-green-600"
                        title="Bacakan terjemahan"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="text-gray-500 hover:text-green-600"
                        title="Copy terjemahan"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Percakapan Bahasa
                </h2>
              </div>
              <div className="flex flex-col gap-6">
                {/* Chat bubbles */}
                <div className="flex flex-col gap-4 mb-6">
                  {conversation.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`rounded-2xl px-6 py-3 max-w-xs shadow ${msg.from === 'user' ? 'bg-green-100 text-green-900' : 'bg-blue-100 text-blue-900'}`}>{msg.text}</div>
                    </div>
                  ))}
                </div>
                {/* User input */}
                <div className="flex gap-4 items-end">
                  <div className="flex-1 relative">
                    <textarea
                      value={userInput}
                      onChange={e => setUserInput(e.target.value)}
                      placeholder="Ketik atau rekam (User)"
                      className="w-full min-h-16 max-h-32 rounded-xl border-2 border-gray-200 p-4 text-lg bg-white text-gray-800 resize-none pr-16"
                    />
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <button type="button" onClick={() => handleRecordConversation('user')} className={`text-gray-500 hover:text-green-600 ${isUserRecording ? 'animate-pulse text-red-500' : ''}`} title="Rekam suara">
                        <Mic className="w-5 h-5" />
                      </button>
                      <button type="button" onClick={() => handleSpeak(userInput, sourceLanguage === 'english' ? 'en-US' : sourceLanguage === 'indonesian' ? 'id-ID' : 'id-ID')} className="text-gray-500 hover:text-green-600" title="Bacakan teks">
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <Button onClick={() => handleSendConversation('user')} className="ml-2">Kirim</Button>
                </div>
                {/* Partner input */}
                <div className="flex gap-4 items-end">
                  <div className="flex-1 relative">
                    <textarea
                      value={partnerInput}
                      onChange={e => setPartnerInput(e.target.value)}
                      placeholder="Ketik atau rekam (Partner)"
                      className="w-full min-h-16 max-h-32 rounded-xl border-2 border-gray-200 p-4 text-lg bg-white text-gray-800 resize-none pr-16"
                    />
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <button type="button" onClick={() => handleRecordConversation('partner')} className={`text-gray-500 hover:text-green-600 ${isPartnerRecording ? 'animate-pulse text-red-500' : ''}`} title="Rekam suara">
                        <Mic className="w-5 h-5" />
                      </button>
                      <button type="button" onClick={() => handleSpeak(partnerInput, targetLanguage === 'english' ? 'en-US' : targetLanguage === 'indonesian' ? 'id-ID' : 'id-ID')} className="text-gray-500 hover:text-green-600" title="Bacakan teks">
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <Button onClick={() => handleSendConversation('partner')} className="ml-2">Kirim</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}