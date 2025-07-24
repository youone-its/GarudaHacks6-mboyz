// src/app/api/accommodation/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient, Role } from '@prisma/client'
import { getUserFromToken } from '@/lib/auth' // kalau pakai JWT/cookie

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const body = await req.json()
  const user = await getUserFromToken(req) // ambil dari auth, atau req.body

  if (!user || user.role !== Role.pengusaha) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
  }

  const newAcc = await prisma.accommodation.create({
    data: {
      name: body.name,
      pricePerNight: body.price,
      ownerId: user.id,
      // tambahkan fields lainnya sesuai kebutuhan
    }
  })

  return NextResponse.json(newAcc)
}
