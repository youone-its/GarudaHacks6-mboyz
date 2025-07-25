'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import SearchBox from '@/components/SearchBox'

export default function Page() {
  const imageList = ['/images/home1.jpg', '/images/home2.jpg', '/images/home3.jpg', '/images/home4.jpg', '/images/home5.jpg']
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % imageList.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen">
      {/* SECTION 1: Hero Slider */}
      <section className="relative h-[70vh]">
        {imageList.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`background-${i}`}
            fill
            className={`object-cover transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'}`}
            priority={i === 0}
          />
        ))}
        <div className="absolute inset-0 bg-white/60 flex items-center justify-cente">
          <h1 className="text-white text-4xl md:text-6xl font-bold mx-[3vw]">Selamat Datang di NusaExperience</h1>
        </div>

      </section>

    <SearchBox />

      {/* SECTION 2: Informasi */}
      <section className="mt-[10vh] grid grid-cols-1 md:grid-cols-2 gap-8 p-8 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Pengalaman Budaya Nusantara</h2>
          <p className="text-lg text-gray-700">
            Jelajahi pesona lokal yang autentik – dari budaya, tradisi, hingga keramahan masyarakat. 
            NusaExperience menghubungkanmu dengan pengalaman yang tak terlupakan.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/asset1ne2.svg"
            alt="Ilustrasi Budaya"
            width={400}
            height={400}
            className="w-full h-auto max-w-xs md:max-w-md"
          />
        </div>
      </section>
      <section className="h-screen bg-gray-100 flex items-center justify-center">
    <p className="text-xl">Ini bagian bawah buat tes scroll 👇</p>
    </section>

    </main>
  )
}
