// lib/actions.ts
'use server'

import { getServerSession } from 'next-auth'
import { getUserFromToken } from './auth'
import { prisma } from '@/lib/prisma' // atau wherever kamu define Prisma
import { revalidatePath } from 'next/cache'

// lib/actions.ts
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


export async function addAccommodation(form: {
  name: string
  description?: string
  pricePerNight: number
  location?: string
  availableRooms: number
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
      owner: {
        connect: { id: user.id },
      },
    },
  })

  revalidatePath('/akomodasi')
}