'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Login from '@/components/Login'
import Register from '@/components/Register'

const TOTAL_IMAGES = 5

const getRandomImage = (exclude: string | null) => {
  let next
  do {
    const index = Math.floor(Math.random() * TOTAL_IMAGES) + 1
    next = `/images/login${index}.jpg`
  } while (next === exclude)
  return next
}

const LoginPage = () => {
  const [image, setImage] = useState(() => getRandomImage(null))
  const [mode, setMode] = useState<'landing' | 'login' | 'register'>('landing')

  useEffect(() => {
    const interval = setInterval(() => {
      setImage((prev) => getRandomImage(prev))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="md:w-1/2 w-full md:h-full h-[30vh] relative transition-all duration-1000">
        <Image
          key={image}
          src={image}
          alt="Login visual"
          fill
          className="object-cover transition-opacity duration-1000 ease-in-out"
          priority
        />
      </div>

      <div className="md:w-1/2 w-full md:h-full h-[70vh] flex items-center justify-center p-8 bg-white">
        {mode === 'landing' && (
          <div className="max-w-md w-full text-center text-gray-800">
            <h2 className="text-3xl font-bold mb-4">Selamat Datang di NusaLoka</h2>
            <p className="text-gray-700 mb-6">Gabung bersama komunitas pembelajar masa depan</p>
            <div className="flex flex-col gap-4 md:flex-row justify-center">
              <button
                onClick={() => setMode('login')}
                className="px-6 py-2 text-white rounded-lg bg-green-700 hover:bg-green-800 transition duration-200"
              >
                Login
              </button>
              <button
                onClick={() => setMode('register')}
                className="px-6 py-2 text-green-700 rounded-lg border border-green-700 hover:bg-green-50 transition duration-200"
              >
                Register
              </button>
            </div>
          </div>
        )}
        {mode === 'login' && <Login onBack={() => setMode('landing')} />}
        {mode === 'register' && <Register onBack={() => setMode('landing')} />}
      </div>
    </div>
  )
}

export default LoginPage
