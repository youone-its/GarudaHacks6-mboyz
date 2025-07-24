'use client'

import { useState } from 'react'
import { addAccommodation } from '@/lib/actions'
import { useRouter } from 'next/navigation'

export default function TambahAkomodasiForm() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    pricePerNight: '',
    location: '',
    availableRooms: '',
  })

  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      // validasi dasar
      if (!form.name || !form.pricePerNight || !form.availableRooms) {
        alert('Harap isi semua field wajib')
        return
      }

      await addAccommodation({
        name: form.name,
        description: form.description || undefined,
        pricePerNight: parseInt(form.pricePerNight) || 0,
        location: form.location || undefined,
        availableRooms: parseInt(form.availableRooms) || 0,
      })

      alert('Akomodasi berhasil ditambahkan!')
      router.refresh()
    } catch (err) {
      console.error('❌ Gagal menambahkan:', err)
      alert('Terjadi kesalahan saat menambahkan akomodasi')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4 border rounded bg-white">
      <input
        type="text"
        placeholder="Nama Akomodasi"
        value={form.name}
        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Deskripsi (opsional)"
        value={form.description}
        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Harga per malam"
        value={form.pricePerNight}
        onChange={e => setForm(f => ({ ...f, pricePerNight: e.target.value }))}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Lokasi"
        value={form.location}
        onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Sisa kamar tersedia"
        value={form.availableRooms}
        onChange={e => setForm(f => ({ ...f, availableRooms: e.target.value }))}
        className="w-full p-2 border rounded"
        required
      />

      <div className="flex justify-end gap-2">
        <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded">
          Batal
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Simpan
        </button>
      </div>
    </form>
  )
}
