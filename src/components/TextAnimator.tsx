'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

const linesToType = [
  'Kita tidak butuh teknologi hebat,',
  'tapi teknologi yang membebaskan.',
]

export default function TextAnimator() {
  const [startTyping, setStartTyping] = useState(false)
  const [fadeOutText, setFadeOutText] = useState(false)
  const [showButton, setShowButton] = useState(true)

  const [animatedLines, setAnimatedLines] = useState<string[]>([])

  const handleSecondButtonClick = () => {
    setFadeOutText(true)
    setShowButton(false)

    setTimeout(() => {
      setAnimatedLines(linesToType)
      setStartTyping(true)
    }, 1200) // ⏳ tunggu selesai fade out dulu
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-center py-16">
      {/* ✨ Text awal */}
      {!fadeOutText && (
        <div
          className={clsx(
            'text-[#2a3f2e] text-3xl sm:text-4xl md:text-5xl font-semibold transition-opacity duration-1000',
            {
              'opacity-0': fadeOutText,
              'opacity-100': !fadeOutText,
            }
          )}
        >
          Ini teks awal yang akan difade out...
        </div>
      )}

      {/* ✨ Typing text */}
      {startTyping && (
        <div className="absolute z-20 rotate-[-3.47deg] text-[#467750] font-normal text-center leading-snug">
          <div className="text-xl sm:text-2xl md:text-3xl space-y-3 font-mono">
            {animatedLines.map((line, lineIndex, allLines) => {
              const prevCharCount = allLines
                .slice(0, lineIndex)
                .reduce((acc, l) => acc + l.length, 0)

              return (
                <p key={lineIndex} className="flex justify-center gap-[1px]">
                  {line.split('').map((char, charIndex) => {
                    const delay = ((prevCharCount + charIndex) * 0.05 + 1).toFixed(2)
                    return (
                      <span
                        key={`${lineIndex}-${charIndex}-${char}`}
                        className="invisible inline-block animate-type-char"
                        style={{
                          animationDelay: `${delay}s`,
                          animationFillMode: 'forwards',
                          animationDuration: '0.5s',
                          animationTimingFunction: 'steps(1)',
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    )
                  })}
                </p>
              )
            })}
          </div>
        </div>
      )}

      {/* 🔘 Button Trigger */}
      {showButton && (
        <button
          onClick={handleSecondButtonClick}
          className="absolute bottom-20 px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
          aria-label="Button Down2"
        >
          Button Down2
        </button>
      )}
    </div>
  )
}
