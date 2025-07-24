'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

export default function SlideSection({ onScrollDown }: { onScrollDown: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const slides = [
  <div key="slide1" className="w-full h-screen relative flex items-center justify-center bg-[#467750]">
    <SlideContent
      lines={[
        'Untuk menyelesaikan masalah ini kami ',
        'menggunakan 3 langkah tepat yaitu :',
        'Intro Level : memperkenalkan budaya',
        'dengan cara yang asyik dan modern',
      ]}
    />
  </div>,
  <div key="slide2" className="w-full h-screen relative flex items-center justify-center bg-[#467750]">
    <SlideContent
      lines={[
        'Experience Level : kemudian setelah user ',
        'kenal budaya maka langkah selanjutnya',
        'mencoba fitur yang kamu buat untuk ',
        'mencoba sensasi budaya Nusantara secara',
        'online maupun offline',
      ]}
    />
  </div>,
  <div key="slide3" className="w-full h-screen relative flex items-center justify-center bg-[#467750]">
    <SlideContent
      lines={[
        'Expert Level : setelah mencoba, user akan',
        'menjadi lebih paham dan menghargai budaya.',
        'Level ini mendorong user untuk jadi',
        'advokat budaya Nusantara itu sendiri.',
      ]}
    />
  </div>,
]

  const handleNext = () => {
    const container = containerRef.current
    const next = currentIndex + 1
    if (container && next < slides.length) {
      container.scrollTo({
        left: next * window.innerWidth,
        behavior: 'smooth',
      })
      setCurrentIndex(next)
    }
  }

  const handlePrev = () => {
    const container = containerRef.current
    const prev = currentIndex - 1
    if (container && prev >= 0) {
      container.scrollTo({
        left: prev * window.innerWidth,
        behavior: 'smooth',
      })
      setCurrentIndex(prev)
    }
  }

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <div
        ref={containerRef}
        className="flex w-full h-full transition-all duration-500"
        style={{ scrollSnapType: 'x mandatory', overflowX: 'hidden' }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="w-screen h-full flex-shrink-0"
            style={{ scrollSnapAlign: 'start' }}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Buttons */}
      {/* Tombol LEFT */}
        {currentIndex > 0 && (
        <div
            className="absolute bottom-24 z-40 cursor-pointer scale-150 left-[25vw]"
            onClick={handlePrev}
        >
            <Image src="/images/right.svg" alt="Kembali" width={60} height={60} />
        </div>
        )}

        {/* Tombol RIGHT */}
        {currentIndex < slides.length - 1 && (
        <div
            className="absolute bottom-24 z-40 cursor-pointer scale-150 right-[25vw]"
            onClick={handleNext}
        >
            <Image src="/images/left.svg" alt="Lanjut" width={60} height={60} />
        </div>
        )}
      {/* Tombol DOWN selalu muncul */}
        <div
        className="absolute bottom-24 z-40 cursor-pointer scale-150 left-1/2 -translate-x-1/2"
        onClick={onScrollDown}
        >
        <Image src="/images/down.svg" alt="Scroll Down" width={60} height={60} />
        </div>

    </div>
  )
}

function SlideContent({ lines }: { lines: string[] }) {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <Image
          key={i}
          src="/images/batik.svg"
          alt="background"
          fill
          className="object-cover opacity-10 pointer-events-none select-none"
        />
      ))}
      <div className="absolute z-10 w-[90vw] max-w-[800px] aspect-square">
        <Image
          src="/images/paperclip.svg"
          alt="Paperclip"
          fill
          className="object-contain opacity-80"
        />
      </div>
      <div className="absolute z-20 rotate-[-3.47deg] text-[#467750] font-normal text-center leading-snug">
        <div className="text-l sm:text-xl md:text-2xl space-y-3 font-mono">
          {lines.map((line, li) => (
            <p key={li} className="flex justify-center gap-[1px]">
              {line.split('').map((ch, ci) => {
                const delay = ((li * 10 + ci) * 0.05 + 1).toFixed(2)
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
          ))}
        </div>
      </div>
    </>
  )
}
