import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password, country, role } = body

    // Validasi sederhana
    if (!name || !email || !password || !country || !role) {
      return NextResponse.json({ message: 'Semua field wajib diisi' }, { status: 400 })
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ message: 'Email sudah terdaftar' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Simpan user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        country,
        role,
      },
    })

    return NextResponse.json({ message: 'User berhasil terdaftar', userId: newUser.id })
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Internal server error' }, { status: 500 })
  }
}
