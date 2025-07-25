'use client'

import { useState } from 'react'
import { addAccommodation } from '@/lib/actions'
import { useRouter } from 'next/navigation'

const locations = ['Banten', 'Solo', 'Jogja', 'Padang', 'Aceh', 'Papua', 'Nusa Tenggara']
const amenityOptions = ['WIFI', 'ROOM_SERVICE', 'PARKING', 'POOL', 'GYM'] as const

export default function TambahAkomodasiForm() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    pricePerNight: '',
    location: '',
    availableRooms: '',
    address: '',
    profileImage: '',
    amenities: [] as string[],
  })

  const router = useRouter()

  function toggleAmenity(value: string) {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(value)
        ? prev.amenities.filter((a) => a !== value)
        : [...prev.amenities, value],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (!form.name || !form.pricePerNight || !form.availableRooms || !form.location || !form.address) {
        alert('Harap isi semua field wajib')
        return
      }

      await addAccommodation({
        name: form.name,
        description: form.description || undefined,
        pricePerNight: parseFloat(form.pricePerNight),
        location: form.location,
        availableRooms: parseInt(form.availableRooms),
        address: form.address,
        profileImage: form.profileImage || undefined,
        amenities: form.amenities,
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
        type="text"
        placeholder="Alamat Lengkap"
        value={form.address}
        onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        placeholder="URL Gambar Profil (opsional)"
        value={form.profileImage}
        onChange={e => setForm(f => ({ ...f, profileImage: e.target.value }))}
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

      <select
        value={form.location}
        onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Pilih Lokasi</option>
        {locations.map(loc => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Sisa kamar tersedia"
        value={form.availableRooms}
        onChange={e => setForm(f => ({ ...f, availableRooms: e.target.value }))}
        className="w-full p-2 border rounded"
        required
      />

      <fieldset className="border rounded p-2">
        <legend className="text-sm font-semibold">Fasilitas</legend>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {amenityOptions.map(amenity => (
            <label key={amenity} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={amenity}
                checked={form.amenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
              />
              {amenity.replace('_', ' ')}
            </label>
          ))}
        </div>
      </fieldset>

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
