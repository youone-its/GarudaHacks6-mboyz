import { FaTiktok, FaYoutube, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-white text-[#467750] py-10 flex flex-col items-center gap-6">
      {/* Logo & Teks Kampus */}
      <div className="flex flex-col items-center gap-2">
        <img
          src="/images/its.png" // ganti ini ke logo kamu
          alt="ITS Logo"
          className="h-10 opacity-70"
        />
        <p className="text-sm text-center font-medium opacity-60">
          Institut Teknologi Sepuluh Nopember <br />
          IEEE Student Branch
        </p>
      </div>

      {/* Copyright */}
      <div className="flex items-center text-sm font-semibold gap-2">
        <span>©</span>
        <span>Nusa Loka Apps</span>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6 font-semibold text-base">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Events</a>
        <a href="#">News</a>
        <a href="#">Our Team</a>
      </div>

      {/* Social Icons */}
      <div className="flex gap-6 text-2xl">
        <a href="#" aria-label="TikTok" className="hover:opacity-80">
          <FaTiktok />
        </a>
        <a href="#" aria-label="YouTube" className="hover:opacity-80">
          <FaYoutube />
        </a>
        <a href="#" aria-label="Instagram" className="hover:opacity-80">
          <FaInstagram />
        </a>
      </div>
    </footer>
  )
}
