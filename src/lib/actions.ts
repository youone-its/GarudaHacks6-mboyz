'use server'

import { prisma } from '@/lib/prisma'

export async function updateUserProfile({
  id,
  name,
  email,
  image,
}: {
  id: number
  name: string
  email: string
  image?: string
}) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        ...(image && { image }), // hanya update kalau ada image
      },
    })

    return { success: true, user }
  } catch (err) {
    console.error('Update Error:', err)
    return { success: false, error: 'Gagal update profil' }
  }
}
