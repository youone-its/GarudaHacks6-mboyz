import { NextResponse } from 'next/server'
import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { userId, role } = await req.json()

    if (!userId || !role || !(role in Role)) {
      return NextResponse.json({ message: 'Role tidak valid' }, { status: 400 })
    }

    await prisma.user.update({
      where: { id: Number(userId) }, // ID kamu integer
      data: { role },
    })

    return NextResponse.json({ message: 'Role berhasil disimpan' })
  } catch (err: any) {
    console.error('Error set role:', err)
    return NextResponse.json({ message: 'Gagal set role' }, { status: 500 })
  }
}
