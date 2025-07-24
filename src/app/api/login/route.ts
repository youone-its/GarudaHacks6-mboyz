import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

export async function POST(req: Request) {
  try {
    const { name, password } = await req.json()

    if (!name || !password) {
      return NextResponse.json({ message: 'Username dan password wajib diisi' }, { status: 400 })
    }

    const user = await prisma.user.findFirst({ where: { name } })

    if (!user) {
      return NextResponse.json({ message: 'User tidak ditemukan' }, { status: 404 })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ message: 'Password salah' }, { status: 401 })
    }

    // 🔐 Generate JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // 🍪 Set cookie token
    const response = NextResponse.json({
      message: 'Login berhasil',
      user: { id: user.id, name: user.name, country: user.country }
    })

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 hari
    })

    return response
  } catch (err: any) {
    console.error('Error login:', err)
    return NextResponse.json({ message: 'Gagal login' }, { status: 500 })
  }
}
