'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'


const Login = ({ onBack }: { onBack: () => void }) => {
  const [formData, setFormData] = useState({ name: '', password: '' })
  const [error, setError] = useState('')

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login gagal')

      alert('✅ Login berhasil!')
      router.push('/profile')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md w-full text-center text-gray-800">
      <h2 className="text-2xl font-semibold mb-4">Form Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
        <div>
          <label className="block mb-1 text-sm font-medium">Username</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Username"
            required
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
            required
          />
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
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
