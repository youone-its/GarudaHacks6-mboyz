'use client'

import { updateUserProfile } from '@/lib/actions'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ProfileForm({ user }: { user: any }) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [image, setImage] = useState(user.image || '')
  const [file, setFile] = useState<File | null>(null)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let uploadedUrl = image

    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'your_upload_preset') // ⬅️ ganti sesuai pengaturan Cloudinary

      const res = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      uploadedUrl = data.secure_url
    }

    const result = await updateUserProfile({
      id: user.id,
      name,
      email,
      image: uploadedUrl,
    })

    if (result.success) {
      router.refresh()
      alert('Profil berhasil diperbarui!')
    } else {
      alert(result.error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div>
        <label>Foto Profil</label>
        <div className="flex items-center space-x-4">
          {image && <Image src={image} alt="profile" width={64} height={64} className="rounded-full" />}
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>
      </div>

      <div>
        <label>Nama</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2" required />
      </div>

      <div>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2" required />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Simpan</button>
    </form>
  )
}
