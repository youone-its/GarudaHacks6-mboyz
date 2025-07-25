import Image from "next/image";
import { Lato, Lora } from "next/font/google";
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";

// Import the same fonts used in your NavBar for consistency
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });
const lora = Lora({ subsets: ["latin"], weight: ["700"] });

export default function Footer() {
  return (
    <footer className="bg-white text-black border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Section 1: Logo and Brand Info (Matches Navbar) */}
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/navbar/logo.png" // Using the same logo as the navbar
                alt="NusaLoka Logo"
                width={50}
                height={50}
                className="h-10 w-auto"
              />
              <p
                className={`${lora.className} font-extrabold text-black text-2xl`}
              >
                NusaLoka
              </p>
            </div>
            <p className={`${lato.className} text-gray-600 max-w-xs`}>
              Exploring the rich tapestry of Indonesian culture through unique
              products and experiences.
            </p>
          </div>

          {/* Section 2: Navigation Links (Matches Navbar Links & Style) */}
          <div className="flex flex-col items-start gap-3">
            <h3
              className={`${lora.className} font-bold text-lg mb-2 text-lime-700`}
            >
              Explore
            </h3>
            <a
              href="/home"
              className={`relative ${lato.className} text-black text-base after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-lime-700 after:transition-all after:duration-300 hover:after:w-full`}
            >
              Home
            </a>
            <a
              href="/market"
              className={`relative ${lato.className} text-black text-base after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-lime-700 after:transition-all after:duration-300 hover:after:w-full`}
            >
              NusaMarket
            </a>
            <a
              href="/xperience"
              className={`relative ${lato.className} text-black text-base after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-lime-700 after:transition-all after:duration-300 hover:after:w-full`}
            >
              NusaExperience
            </a>
          </div>
        </div>

        {/* Section 3: Copyright and Social Icons (Bottom Bar) */}
        <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className={`${lato.className} text-sm text-gray-500`}>
            © {new Date().getFullYear()} NusaLoka. All Rights Reserved.
          </p>
          <div className="flex gap-5 text-xl text-gray-500">
            <a
              href="#"
              aria-label="TikTok"
              className="hover:text-lime-700 transition-colors"
            >
              <FaTiktok />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="hover:text-lime-700 transition-colors"
            >
              <FaYoutube />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-lime-700 transition-colors"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
