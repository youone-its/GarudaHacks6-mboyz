'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type Props = {
  title: string
  captions: string[]
  buttonText: string
  alignRight?: boolean
  delay?: number
}

export default function MotionCard({
  title,
  captions,
  buttonText,
  alignRight = false,
  delay = 0,
}: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: '-20% 0px', once: false })

  const direction = alignRight ? 100 : -100

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: direction }}
      transition={{ duration: 0.6, delay }}
      className={`max-w-[1000px] bg-white w-[90%] mt-[3vh] h-[25vh] rounded-2xl shadow-xl p-10 z-10 relative ${
        alignRight ? 'text-right' : 'text-left'
      }`}
    >
      <h1 className="text-3xl font-bold text-[#467750] mb-4">{title}</h1>
      {captions.map((line, idx) => (
        <p key={idx} className="text-[#467750] text-xl">
          {line}
        </p>
      ))}
      <button className="bg-[#467750] mt-5 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition">
        {buttonText}
      </button>
    </motion.div>
  )
}
