// app/profile/page.tsx
'use client'

import { useEffect, useState } from 'react'
import AddAccommodationModal from '@/components/AddAccommodationModal'

type User = {
  id: number
  name: string
  country: string
  role: 'pengusaha' | 'wisatawan'
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/profile')
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      } else {
        console.error('Gagal ambil profil')
      }
      setLoading(false)
    }

    fetchProfile()
  }, [])

  const handleModalClose = () => setShowModal(false)

  if (loading) return <p>Loading...</p>
  if (!user) return <p>Gagal memuat profil. Silakan login dulu.</p>

  return (
    <div className="max-w-xl mx-auto p-6 relative">
      <h1 className="text-2xl font-bold mb-4">Profil Pengguna</h1>
      <p>Nama: {user.name}</p>
      <p>Negara: {user.country}</p>
      <p>Role: <strong>{user.role}</strong></p>

      {user.role === 'pengusaha' && (
        <div className="mt-8 border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Akomodasi Saya</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Tambah Akomodasi
          </button>
        </div>
      )}

      {showModal && (
        <AddAccommodationModal
          onClose={handleModalClose}
          onSuccess={() => console.log('akomodasi berhasil ditambah')}
        />
      )}
    </div>
  )
}
