// lib/actions.ts
'use server'

import { getServerSession } from 'next-auth'
import { getUserFromToken } from './auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Update user profile (jika dipakai)
export async function updateUserProfile(data: {
  id: number
  name: string
  email: string
  image: string
}) {
  const res = await fetch('/api/user/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  return res.json()
}

// Tambah akomodasi (akomodasi baru)
export async function addAccommodation(form: {
  name: string
  description?: string
  pricePerNight: number
  location?: string
  availableRooms: number
  address?: string
  profileImage?: string
  amenities?: string[] // sesuaikan dengan tipe field `amenities` di schema.prisma
}) {
  const user = await getUserFromToken()
  if (!user) throw new Error('Unauthorized')

  await prisma.accommodation.create({
    data: {
      name: form.name,
      description: form.description,
      pricePerNight: form.pricePerNight,
      location: form.location,
      remainingRooms: form.availableRooms,
      address: form.address,
      profileImage: form.profileImage,
      amenities: form.amenities ?? [], // default empty array jika undefined
      owner: {
        connect: { id: user.id },
      },
    },
  })

  revalidatePath('/akomodasi')
}
