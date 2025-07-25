import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/auth' // pastikan path ini sesuai
import { NextRequest, NextResponse } from 'next/server';

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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dest = searchParams.get('dest');

  try {
    const accommodations = await prisma.accommodation.findMany({
      where: dest
        ? {
            location: {
              contains: dest, // case-insensitive cari yang mengandung "Banten"
            },
          }
        : undefined,
    });

    return NextResponse.json(accommodations);
  } catch (error) {
    console.error('❌ Error fetching accommodations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
