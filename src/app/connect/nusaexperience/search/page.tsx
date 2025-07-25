'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Accommodation {
  id: number
  name: string
  description: string
  pricePerNight: string // sudah di-convert dari Decimal
  location: string
  rating: number
  image: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const destination = searchParams.get('dest')
  const [data, setData] = useState<Accommodation[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/accommodation?dest=${destination ?? ''}`)
      const json = await res.json()
      setData(json)
    }

    fetchData()
  }, [destination])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        Hasil pencarian: {destination ?? 'Semua destinasi'}
      </h1>

      {data.length === 0 && <p>Tidak ada akomodasi ditemukan.</p>}

      <div className="grid gap-4">
        {data.map((acc) => (
          <div
            key={acc.id}
            className="flex gap-4 border border-gray-200 rounded-lg p-4 shadow"
          >
            <img
              src={acc.image ?? '/default.jpg'}
              alt={acc.name}
              className="w-32 h-32 object-cover rounded-md"
            />
            <div>
              <h2 className="text-lg font-bold">{acc.name}</h2>
              <p className="text-sm text-gray-600">{acc.location}</p>
              <p className="text-sm mt-1">{acc.description}</p>
              <p className="text-sm mt-2 text-green-700">
                Rp {Number(acc.pricePerNight).toLocaleString('id-ID')} / malam
              </p>
              <p className="text-sm text-yellow-600">
                Rating: {acc.rating ?? 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
