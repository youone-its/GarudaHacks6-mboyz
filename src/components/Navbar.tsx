'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaChevronDown, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa'
import { useState, useEffect } from 'react'

const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Story', href: '/story' },
  {
    label: 'Education',
    hasDropdown: true,
    dropdownItems: [
      { label: 'NusaEdu', href: '/education/nusaedu' },
      { label: 'NusaGames', href: '/education/nusagames' },
      { label: 'NusaArticle', href: '/education/nusaarticle' },
    ],
  },
  {
    label: 'Connect',
    hasDropdown: true,
    dropdownItems: [
      { label: 'NusaMarket', href: '/connect/nusamarket' },
      { label: 'NusaOutfit', href: '/connect/nusaoutfit' },
      { label: 'NusaExperience', href: '/connect/nusaexperience' },
    ],
  },
  { label: 'About Us', href: '/about' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1100)
    }

    handleResize() // initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  return (
    <nav className="w-full fixed top-10 z-50 flex justify-center">
      <div className="w-full max-w-7xl mx-[5vw] px-4 flex items-center justify-between relative">

        {/* Base layer container */}
        <div className="w-fit bg-white/30 rounded-full px-4 py-3 flex items-center justify-between backdrop-blur-sm shadow-md md:w-full ml-auto">

          {/* Logo */}
          <Link href="/" className="text-black text-3xl font-bold hidden md:inline">
            NusaLoka
          </Link>

          {/* Bubble Navbar */}
          <div className="bg-[#467750] text-white px-3 py-1 md:px-6 md:py-3 rounded-full flex items-center shadow-md text-sm md:text-lg font-semibold relative w-fit md:w-auto ml-auto">
            {/* Mobile: Hamburger + Profile */}
            {isMobile ? (
              <div className="flex items-center gap-4">
                {/* Hamburger */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-white text-lg md:text-xl focus:outline-none"
                >
                  {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Profile Circle */}
                <Link href="/profile">
                  <div className="w-7 h-7 md:w-9 md:h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition cursor-pointer">
                    <FaUserCircle className="text-[#467750] text-xl" />
                  </div>
                </Link>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white text-[#467750] rounded-md shadow-lg py-1 w-40 md:w-52 z-50 text-sm md:text-base">
                    <Link
                      href="/"
                      className="block px-4 py-2 hover:bg-[#467750] hover:text-white transition"
                    >
                      NusaLoka
                    </Link>

                    {navItems.map(({ label, href, hasDropdown, dropdownItems }) => (
                      <div key={label} className="border-t">
                        {hasDropdown ? (
                          <>
                            <button
                              onClick={() => toggleDropdown(label)}
                              className="w-full text-left px-4 py-2 flex items-center justify-between hover:bg-[#467750] hover:text-white transition"
                            >
                              {label}
                              <FaChevronDown className="text-xs ml-2" />
                            </button>
                            {openDropdown === label && (
                              <div>
                                {dropdownItems.map((item) => (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    className="block px-6 py-2 text-sm hover:bg-[#467750] hover:text-white transition"
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link
                            href={href ?? '/home'}
                            className="block px-4 py-2 hover:bg-[#467750] hover:text-white transition"
                          >
                            {label}
                          </Link>
                        )}
                      </div>
                    ))}

                    <Link
                      href="/login"
                      className="block mt-2 px-4 py-2 text-center bg-[#467750] text-white rounded-md mx-2 hover:opacity-90 transition"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              // Desktop: Full Navbar Items + Login + Profile
              <div className="flex items-center gap-8">
                {navItems.map(({ label, href, hasDropdown, dropdownItems }) => (
                  <div key={label} className="relative">
                    {hasDropdown ? (
                      <button
                        onClick={() => toggleDropdown(label)}
                        className={`flex items-center gap-1 hover:underline transition ${
                          pathname?.startsWith(`/${dropdownItems?.[0]?.href?.split('/')?.[1] ?? ''}`) ? 'underline' : ''
                        }`}
                      >
                        {label}
                        <FaChevronDown className="text-xs" />
                      </button>
                    ) : (
                      <Link
                        href={href ?? '/home'}
                        className={`hover:underline transition ${
                          pathname === href ? 'underline' : ''
                        }`}
                      >
                        {label}
                      </Link>
                    )}

                    {hasDropdown && openDropdown === label && (
                      <div className="absolute top-full left-0 bg-white text-[#467750] mt-2 rounded-md shadow-lg w-40 py-2 z-50">
                        {dropdownItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 hover:bg-[#467750] hover:text-white transition"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <Link
                  href="/login"
                  className="ml-4 bg-white text-[#467750] px-5 py-2 rounded-md font-bold hover:opacity-90 transition"
                >
                  Login
                </Link>

                {/* Profile Circle */}
                <Link href="/profile" className="ml-2">
                  <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition cursor-pointer">
                    <FaUserCircle className="text-[#467750] text-base md:text-xl" />
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )

}
