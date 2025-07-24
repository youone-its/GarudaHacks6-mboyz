import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma' // asumsi kamu udah pake singleton

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        country: true,
        role: true,
      },
    })

    if (!user) {
      return NextResponse.json({ message: 'User tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('[PROFILE_GET]', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
