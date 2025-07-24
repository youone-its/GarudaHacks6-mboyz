import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/auth' // pastikan path ini sesuai

export async function POST(req: Request) {
  try {
    const user = await getUserFromToken()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()
    const { name, description, pricePerNight, location, availableRooms } = data

    const newAkomodasi = await prisma.accommodation.create({
      data: {
        name,
        description,
        pricePerNight,
        location,
        remainingRooms: availableRooms,
        owner: {
          connect: { id: user.id }, // 🔥 user.id dari token
        },
      },
    })

    return NextResponse.json(newAkomodasi, { status: 201 })
  } catch (error) {
    console.error('Error creating accommodation:', error)
    return NextResponse.json({ error: 'Failed to create accommodation' }, { status: 500 })
  }
}
