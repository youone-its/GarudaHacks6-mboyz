'use client'

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'
import MotionCard from '@/components/MotionCard'
import SlideSection from '@/components/SlideSection'


const imageList = [
  '/images/home1.jpg',
  '/images/home2.jpg',
  '/images/home3.jpg',
  '/images/home4.jpg',
  '/images/home5.jpg',
]

const typingText = 'Nusantara Culture...'

const animatedLines = [
  'Indonesia has been more',
  'culture in one country and',
  'the young people have',
  'little knowledge about that',
]

const animatedLines2 = [
  'Untuk menyelesaikan masalah ini kami ',
  'menggunakan 3 langkah tepat yaitu :',
  'Intro Level : memperkenalkan budaya',
  'dengan cara yang asyik dan modern',
  'Experience Level : kemudian setelah user ',
  'kenal budaya maka langkah selanjutnya',
  'mencoba fitur yang kamu buat untuk ',
  'mencoba sensasi budaya Nusantara secara',
  'online maupun offline',
]

export default function Home() {
  // **Scroll to top on mount**
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [current, setCurrent] = useState(0)
  const [typed, setTyped] = useState('')
  const [charIndex, setCharIndex] = useState(0)
  const [startLineTyping, setStartLineTyping] = useState(false)
  const secondSectionRef = useRef<HTMLDivElement>(null)
  const secondSectionRef2 = useRef<HTMLDivElement>(null)
  const secondSectionRef3 = useRef<HTMLDivElement>(null)
  const scrollableContentRef = useRef<HTMLDivElement>(null)
  const scrollableContentright1 = useRef<HTMLDivElement>(null)
  

  // Ganti gambar tiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imageList.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Efek typing teks utama (atas)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (charIndex < typingText.length) {
        setTyped((prev) => prev + typingText[charIndex])
        setCharIndex((prev) => prev + 1)
      } else {
        setTimeout(() => {
          setTyped('')
          setCharIndex(0)
        }, 2000)
      }
    }, 100)
    return () => clearTimeout(timeout)
  }, [charIndex])

  // Scroll ke section 2
  const handleScrollDown = () => {
    secondSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => setStartLineTyping(true), 1000)
  }

  // Scroll ke section 3
  const handleScrollDown2 = () => {
    secondSectionRef2.current?.scrollIntoView({ behavior: 'smooth' })
    // (jika mau reset animasi, buat state terpisah untuk animatedLines2)
  }

  const handleScrollDown3 = () => {
    // scroll ke section 4
    secondSectionRef3.current?.scrollIntoView({ behavior: 'smooth' })

    // ❗️Aktifkan scroll ke body setelah pindah ke section 4
    setTimeout(() => {
      document.body.style.overflow = 'auto'
    }, 1200)
  }

  // Scroll ke section 6
  const [currentSlide, setCurrentSlide] = useState(0)
  const scrollableContainerRef = useRef<HTMLDivElement>(null)

  const handleSwipeLeft = () => {
    const container = scrollableContainerRef.current
    const nextSlide = currentSlide + 1

    if (container && nextSlide < container.children.length) {
      container.scrollTo({
        left: window.innerWidth * nextSlide,
        behavior: 'smooth',
      })
      setCurrentSlide(nextSlide)
    }
  }

  const handleSwipeRight = () => {
  const container = scrollableContainerRef.current
  const nextSlide = currentSlide - 1

  if (container && nextSlide >= 0) {
    container.scrollTo({
      left: window.innerWidth * nextSlide,
      behavior: 'smooth',
    })
    setCurrentSlide(nextSlide)
  }
}

  // 🔒 Lock scroll saat di awal
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <main className="overflow-x-hidden flex flex-col bg-[#467750]">
      {/* Unscrollable wrapper */}
      <div className="overflow-hidden h-screen w-full">
        {/* Section 1 */}
        <section className=" w-full h-screen relative flex items-center justify-center">
          {/* Background batik */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/batik.svg"
              alt="Batik Background"
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>
          {/* Gambar utama */}
          <div className="relative z-10 w-[90vw] h-[90vh] rounded-3xl  shadow-2xl flex items-end justify-center">
            {imageList.map((src, idx) => (
              <Image
                key={src}
                src={src}
                alt={`Slide ${idx + 1}`}
                fill
                className={`object-cover transition-opacity duration-1000 ease-in-out ${
                  idx === current ? 'opacity-100' : 'opacity-0'
                }`}
                priority={idx === 0}
              />
            ))}
            {/* Teks typing */}
            <div className="absolute bottom-1/4 left-10 z-30 text-white font-bold text-4xl sm:text-6xl md:text-7xl font-mono">
              {typed}
              <span className="animate-pulse">|</span>
            </div>
          </div>
          {/* Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-64 z-20 bg-gradient-to-t from-black/80 to-transparent" />
          {/* Scroll down */}
          <div
            onClick={handleScrollDown}
            className="absolute bottom-24 z-40 animate-bounce cursor-pointer scale-150"
          >
            <Image src="/images/down.svg" alt="Scroll Down" width={60} height={60} />
          </div>
          
        </section>

        {/* Section 2 */}
        <section
          ref={secondSectionRef}
          className="w-full h-screen relative flex items-center justify-center bg-[#467750] "
        >
          {/* background batik berlapis */}
          {[...Array(4)].map((_, i) => (
            <Image
              key={i}
              src="/images/batik.svg"
              alt="background"
              fill
              className="object-cover opacity-10 pointer-events-none select-none"
            />
          ))}
          {/* Paperclip */}
          <div className="absolute z-10 w-[90vw] max-w-[800px] aspect-square">
            <Image src="/images/paperclip.svg" alt="Paperclip" fill className="object-contain opacity-80" />
          </div>
          {/* Animated lines */}
          {startLineTyping && (
            <div className="absolute z-20 rotate-[-3.47deg] text-[#467750] font-normal text-center leading-snug">
              <div className="text-2xl sm:text-3xl md:text-4xl space-y-3 font-mono">
                {animatedLines.map((line, li, arr) => {
                  const prevChars = arr.slice(0, li).reduce((a, l) => a + l.length, 0)
                  return (
                    <p key={li} className="flex justify-center gap-[1px]">
                      {line.split('').map((ch, ci) => {
                        const delay = ((prevChars + ci) * 0.05 + 1).toFixed(2)
                        return (
                          <span
                            key={`${li}-${ci}`}
                            className="invisible inline-block animate-type-char"
                            style={{
                              animationDelay: `${delay}s`,
                              animationFillMode: 'forwards',
                              animationDuration: '0.5s',
                              animationTimingFunction: 'steps(1)',
                            }}
                          >
                            {ch === ' ' ? '\u00A0' : ch}
                          </span>
                        )
                      })}
                    </p>
                  )
                })}
              </div>
            </div>
          )}
          {/* Scroll down 2 */}
          <div
            onClick={handleScrollDown2}
            className="absolute bottom-24 z-40 animate-bounce cursor-pointer scale-150"
          >
            <Image src="/images/down.svg" alt="Scroll Down 2" width={60} height={60} />
          </div>
        </section>

        {/* Section 3 */}
        <section
          ref={secondSectionRef2}
          className="w-full min-h-screen relative flex items-center justify-center bg-[#467750]"
        >
          <SlideSection onScrollDown={handleScrollDown3} />
        </section>
        
        
      </div>



      <div ref={scrollableContentRef}>  
        {/* Section 4 */}
        <section ref={secondSectionRef3} className="w-full min-h-screen relative flex flex-col items-center justify-start bg-[#467750]">
          {/* Gambar atas blok putih */}
          <div className="w-full mt-[20vh] z-20">
            <Image
              src="/images/connecting level.svg"
              alt="Connecting Level"
              width={0}        // supaya gunakan `sizes` dan `style` responsif
              height={0}
              sizes="100vw"
              className="w-full h-auto"
              priority
            />
          </div>
          
          <MotionCard
            title="NusaExperience"
            captions={['Bantu kamu mengajarkan', 'budaya Nusantara']}
            buttonText="Try Now"
            alignRight={false}
          />

          <MotionCard
            title="NusaKarya"
            captions={['Mainkan kamu memiliki','produk budaya Nusantara']}
            buttonText="Try Now"
            alignRight={true}
          />

          <MotionCard
            title="NusaOutfit"
            captions={['Bantu kamu mencoba','outfit budaya Nusantara']}
            buttonText="Try Now"
            alignRight={false}
          />

          {/* background batik */}
          {[...Array(4)].map((_, i) => (
            <Image
              key={i}
              src="/images/batik.svg"
              alt="background"
              fill
              className="object-cover opacity-10 pointer-events-none select-none"
            />
          ))}
        </section>
        <section className="w-full min-h-screen relative flex flex-col items-center justify-start bg-[#467750]">
          {/* Gambar atas blok putih 2 */}
          <div className="w-full mt-[5vh] z-20">
            <Image
              src="/images/nusaintel.svg"
              alt="Connecting Level"
              width={0}        // supaya gunakan `sizes` dan `style` responsif
              height={0}
              sizes="100vw"
              className="w-full h-auto"
              priority
            />
          </div>
          
          <MotionCard
            title="NusaOutfit"
            captions={['Bantu kamu mengajarkan', 'budaya Nusantara']}
            buttonText="Try Now"
            alignRight={false}
          />

          <MotionCard
            title="NusaChat"
            captions={['Bantu kamu mengajarkan', 'budaya Nusantara']}
            buttonText="Try Now"
            alignRight={true}
          />

          <MotionCard
            title="NusaImage"
            captions={['Bantu kamu mengajarkan', 'budaya Nusantara']}
            buttonText="Try Now"
            alignRight={false}
          />

          {/* background batik */}
          {[...Array(4)].map((_, i) => (
            <Image
              key={i}
              src="/images/batik.svg"
              alt="background"
              fill
              className="object-cover opacity-10 pointer-events-none select-none"
            />
          ))}
        </section>
        <FAQSection />
        <Footer />
      </div>
    </main>
  )
}
