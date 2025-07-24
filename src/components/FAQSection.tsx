'use client'

import { useState } from 'react'

const faqData = [
  {
    question: 'Apa itu NusaExperience?',
    answer: 'NusaExperience adalah platform edukasi budaya Nusantara dengan pendekatan interaktif dan modern.'
  },
  {
    question: 'Bagaimana cara mengakses konten?',
    answer: 'Kamu bisa mengakses konten melalui tombol "Try Now" dan login dengan akunmu.'
  },
  {
    question: 'Apakah konten ini gratis?',
    answer: 'Ya, semua konten bisa diakses secara gratis untuk pengguna terdaftar.'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full flex flex-col items-center py-10 bg-[#467750]">
      <h2 className="text-white text-4xl font-bold mb-8">F.A.Q</h2>
      {faqData.map((item, index: number) => (
        <div
          key={index}
          className="w-[60%] bg-white rounded-full px-6 py-4 mb-4 shadow-lg relative transition-all duration-300"
          style={{
            borderRadius: openIndex === index ? '20px' : '20px',
            minHeight: openIndex === index ? 'auto' : '4rem'
          }}
        >
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggle(index)}>
            <p className="text-[#467750] text-left font-semibold text-lg">{item.question}</p>
            <button className="text-[#467750] text-2xl font-bold focus:outline-none">
              {openIndex === index ? '−' : '+'}
            </button>
          </div>
          {openIndex === index && (
            <div className="mt-4 text-[#467750] text-sm">{item.answer}</div>
          )}
        </div>
      ))}
    </section>
  )
}
