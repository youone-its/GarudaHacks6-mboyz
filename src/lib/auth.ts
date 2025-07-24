import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

export async function getUserFromToken() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) return null

  try {
    const user = jwt.verify(token, JWT_SECRET)
    return user as { id: number; name: string; email: string }
  } catch (err) {
    console.error('JWT Error:', err)
    return null
  }
}
