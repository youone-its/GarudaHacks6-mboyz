// components/AddAccommodationModal.tsx
'use client'

import { useState } from 'react'

export default function AddAccommodationModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void
  onSuccess: () => void
}) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [pricePerNight, setPricePerNight] = useState('')
  const [location, setLocation] = useState('')
  const [remainingRooms, setRemainingRooms] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    if (!name || !pricePerNight || !remainingRooms) {
      setMessage('Isi semua field wajib!')
      return
    }

    const res = await fetch('/api/accommodation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        pricePerNight: parseFloat(pricePerNight),
        location,
        remainingRooms: parseInt(remainingRooms),
      }),
    })

    const data = await res.json()
    if (res.ok) {
      setMessage('Akomodasi berhasil ditambahkan!')
      onSuccess()
      onClose()
    } else {
      setMessage(data.message || 'Gagal tambah akomodasi')
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
        <h2 className="text-xl font-bold mb-4">Tambah Akomodasi</h2>
        <input
          type="text"
          placeholder="Nama Akomodasi"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 w-full mb-2 rounded"
        />
        <textarea
          placeholder="Deskripsi (opsional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-3 py-2 w-full mb-2 rounded"
        />
        <input
          type="number"
          placeholder="Harga per malam"
          value={pricePerNight}
          onChange={(e) => setPricePerNight(e.target.value)}
          className="border px-3 py-2 w-full mb-2 rounded"
        />
        <input
          type="text"
          placeholder="Lokasi"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border px-3 py-2 w-full mb-2 rounded"
        />
        <input
          type="number"
          placeholder="Sisa kamar"
          value={remainingRooms}
          onChange={(e) => setRemainingRooms(e.target.value)}
          className="border px-3 py-2 w-full mb-4 rounded"
        />
        {message && <p className="text-sm mb-2 text-red-600">{message}</p>}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-500 px-4 py-2">
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  )
}
