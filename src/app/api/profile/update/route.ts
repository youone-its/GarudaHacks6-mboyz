// app/api/user/update/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  try {
    await prisma.user.update({
      where: { id: body.id },
      data: {
        name: body.name,
        email: body.email,
        image: body.image,
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false, error: 'Gagal update profil' }, { status: 500 })
  }
}
