'use client'

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'

const imageList = [
  '/images/home1.jpg',
  '/images/home2.jpg',
  '/images/home3.jpg',
  '/images/home4.jpg',
  '/images/home5.jpg',
]

const typingText = 'NusaGames...'

const animatedLines = [
  'Indonesia has been more',
  'culture in one country and',
  'the young people have',
  'little knowledge about that',
]

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [typed, setTyped] = useState('')
  const [charIndex, setCharIndex] = useState(0)
  const [startLineTyping, setStartLineTyping] = useState(false)
  const secondSectionRef = useRef<HTMLDivElement>(null)

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

  // Scroll dan trigger animasi teks bawah
  const handleScrollDown = () => {
    secondSectionRef.current?.scrollIntoView({ behavior: 'smooth' })

    setTimeout(() => {
      setStartLineTyping(true)
    }, 1000)
  }

  const user = {
    name: "UserAnonym",
    level: "-",
    country: "-",
    localRank: "-",
    globalRank: "-",
    xp: "-",
    isLoggedIn: false,
    };


  return (
    <main className="relative min-h-screen bg-[#467750] overflow-hidden">
      {/* Section 1 */}
      <section className="w-full h-screen relative flex items-center justify-center">
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
        <div className="relative z-10 w-[90vw] h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex items-end justify-center">
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

        {/* Gradient bawah */}
        <div className="absolute bottom-0 left-0 right-0 h-64 z-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

        {/* Icon panah down */}
        <div
          onClick={handleScrollDown}
          className="absolute bottom-24 z-40 animate-bounce cursor-pointer scale-150"
        >
          <Image
            src="/images/down.svg"
            alt="Scroll Down"
            width={60}
            height={60}
            className="opacity-80"
          />
        </div>
      </section>

      {/* Section 2 */}
      <section
        ref={secondSectionRef}
        className="w-full h-screen relative flex flex-col items-center justify-center bg-[#467750] overflow-hidden text-white"
        >
        {/* Background Batik */}
        <Image
            src="/images/batik.svg"
            alt="background"
            layout="fill"
            className="object-cover opacity-10 pointer-events-none select-none"
        />

        {/* Judul */}
        <h2 className="text-4xl font-bold mb-12 text-center">
            Let’s Push Your Rank and be the Top Global...!!
        </h2>

        {/* Card 3 kolom */}
        <div className="w-[90%] max-w-4xl bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-xl flex flex-col sm:flex-row justify-between items-center text-white gap-6 shadow-lg">
            {/* Kolom 1 - Profile */}
            <div className="flex-1 flex justify-center">
            <Image
                src="/icons/user-icon.svg" // Gambar user default, misal di public/icons/
                alt="User Icon"
                width={100}
                height={100}
                className="rounded-full object-cover border-4 border-white"
            />
            </div>
            

            {/* Kolom 2 - Info User */}
            <div className="flex-1 flex flex-col gap-2 text-center sm:text-left">
            <div>
                <span className="font-semibold">Username:</span>{" "}
                <span>{user.name}</span>
            </div>
            <div>
                <span className="font-semibold">Level:</span>{" "}
                <span>{user.level}</span>
            </div>
            <div>
                <span className="font-semibold">Country:</span>{" "}
                <span>{user.country}</span>
            </div>
            </div>

            {/* Kolom 3 - Rank & XP */}
            <div className="flex-1 flex flex-col gap-2 text-center sm:text-right">
            <div>
                <span className="font-semibold">Local Rank:</span>{" "}
                <span>{user.localRank}</span>
            </div>
            <div>
                <span className="font-semibold">Global Rank:</span>{" "}
                <span>{user.globalRank}</span>
            </div>
            <div>
                <span className="font-semibold">XP Points:</span>{" "}
                <span>{user.xp}</span>
            </div>
            </div>
        </div>
        </section>



    </main>
  )
}
