// src/app/tambah/page.tsx
'use client'

import { useState } from 'react'
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

    const res = await fetch('/api/accommodation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        pricePerNight: parseFloat(form.pricePerNight),
        availableRooms: parseInt(form.availableRooms),
        ownerId: 1, // bisa diganti dari auth nanti
      }),
    })

    if (res.ok) {
      alert('Akomodasi ditambahkan!')
      router.refresh()
    } else {
      const err = await res.json()
      alert('Gagal menambahkan: ' + err?.error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input placeholder="Nama Akomodasi" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
      <textarea placeholder="Deskripsi" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
      <input type="number" placeholder="Harga per malam" value={form.pricePerNight} onChange={e => setForm(f => ({ ...f, pricePerNight: e.target.value }))} />
      <input placeholder="Lokasi" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
      <input type="number" placeholder="Sisa kamar" value={form.availableRooms} onChange={e => setForm(f => ({ ...f, availableRooms: e.target.value }))} />

      <div className="flex justify-end gap-2">
        <button type="button">Batal</button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Simpan</button>
      </div>
    </form>
  )
}
