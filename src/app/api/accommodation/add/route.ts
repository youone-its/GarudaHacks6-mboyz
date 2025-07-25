// src/app/api/accommodation/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { name, description, pricePerNight, location, availableRooms, ownerId } = data

    const newAkomodasi = await prisma.accommodation.create({
      data: {
        name,
        description,
        pricePerNight,
        location,
        remainingRooms: availableRooms,
        ownerId,
      },
    })

    return NextResponse.json(newAkomodasi, { status: 201 })
  } catch (error) {
    console.error('Error creating accommodation:', error)
    return NextResponse.json({ error: 'Failed to create accommodation' }, { status: 500 })
  }
}
