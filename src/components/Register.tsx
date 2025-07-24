'use client'

import { useState } from 'react'


const Register = ({ onBack }: { onBack: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    role: '', // <== tambahin ini
  })
  const [error, setError] = useState('')
  const [showRoleSelect, setShowRoleSelect] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [isRegistered, setIsRegistered] = useState(false)


  const countries = [
    'England',
    'Japan',
    'Germany',
    'China',
    'USA',
    'Egypt',
    'Saudi Arabia',
    'South Africa',
    'Brazil',
    'Bulgaria',
    'Greek',
    'Spain',
    'Italy',
    'France',
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectRole = async (role: string) => {
  if (!userId) return

  try {
    const res = await fetch('/api/set-role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role }),
    })
    if (!res.ok) throw new Error('Gagal menyimpan role')

    alert('Role berhasil disimpan')
    onBack()
  } catch (err: any) {
    setError(err.message)
  }
}


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi tidak sama')
      return
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Gagal daftar')

      alert('Register berhasil')
      onBack()
    } catch (err: any) {
      setError(err.message)
    }
  }



  return (
    <div className="max-w-md w-full text-center text-gray-800">
      <h2 className="text-2xl font-semibold mb-4">Form Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
        <div>
          <label className="block mb-1 text-sm font-medium">Nama</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Masukkan nama"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="email@example.com"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="********"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Konfirmasi Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="********"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 overflow-y-auto"
            size={1}
          >
            <option value="">Pilih negara</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Role</label>
          <select
            name="role"
            value={(formData as any).role || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Pilih peranmu</option>
            <option value="pengusaha">Aku menyediakan kamar</option>
            <option value="pengunjung">Aku mau menyewa kamar</option>
          </select>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex gap-4 justify-center mt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
          >
            Register
          </button>
        </div>
      </form>


    </div>
  )
}

export default Register
