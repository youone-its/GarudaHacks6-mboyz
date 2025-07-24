import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/auth'

// GET profile + relasi
export async function GET() {
  const user = await getUserFromToken()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      game: true,
      accommodations: true,
      bookings: true,
      ratings: true,
      reviews: true,
      likes: true
    }
  })

  if (!fullUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json(fullUser)
}

// PATCH untuk update data user
export async function PATCH(req: Request) {
  const user = await getUserFromToken()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await req.json()
  const { name, image, country } = data

  try {
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        image,
        country
      }
    })

    return NextResponse.json(updated)
  } catch (err) {
    console.error('Update failed:', err)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
