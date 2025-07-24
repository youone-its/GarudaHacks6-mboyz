import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { id, name, email, image } = body

    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        email,
        image, // ⬅️ cloudinary image url masuk sini
      },
    })

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error('Update user failed:', error)
    return NextResponse.json({ success: false, message: 'Update failed' }, { status: 500 })
  }
}
