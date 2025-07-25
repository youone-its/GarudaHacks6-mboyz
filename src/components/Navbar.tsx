"use client";
import React, { useState } from "react";
import { Menu } from "lucide-react";
import { CircleX } from "lucide-react";
import Image from "next/image";
import { Lato, Lora } from "next/font/google";
const lato = Lato({ subsets: ["latin"], weight: "400" });
const lora = Lora({ subsets: ["latin"], weight: "400" });

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative z-20 bg-white  px-8 md:px-16 py-5 ">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/navbar/logo.png"
            alt="Logo Tuas Prakarsa"
            width={50}
            height={49.73}
            className="h-10 w-auto"
          />
          <p className={`${lora.className} font-extrabold text-black text-2xl`}>
            NusaLoka
          </p>
        </div>
        <div className="hidden md:flex items-center gap-12.5">
          {/* Desktop Buttons */}
          <a
            href="/home"
            className={`relative ${lato.className} font-medium text-black text-lg after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-lime-700 after:transition-all after:duration-300 hover:after:w-full`}
          >
            Home
          </a>
          <a
            href="/market"
            className={`relative ${lato.className} font-medium text-black text-lg after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-lime-700 after:transition-all after:duration-300 hover:after:w-full`}
          >
            NusaMarket
          </a>
          <a
            href="/xperience"
            className={`relative ${lato.className} font-medium text-black text-lg after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-lime-700 after:transition-all after:duration-300 hover:after:w-full`}
          >
            NusaExperience
          </a>

          <a
            href="/login"
            className={`px-6 py-1 hover:bg-lime-700 hover:scale-110 transition-all duration-300 rounded-[14px] flex items-center justify-center text-md border-1 border-lime-700 hover:border-white ${lato.className}`}
          >
            <p className="text-black font-medium ">Login</p>
          </a>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} aria-label="Open menu">
            <Menu color="#467750" size={28} />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-30 bg-[#F0F4F9] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          {/* Mobile Homepage*/}
          <Image
            src="/navbar/logo.png"
            alt="Logo Tuas Prakarsa"
            width={125}
            height={124.31}
            className="h-31.25 w-auto mt-30"
          />
          {/* Mobile Buttons */}
          <div className="flex flex-col items-center text center gap-7.5 mt-9.75 ">
            <a
              href="/home"
              className="h-[39px] w-3xs bg-white rounded-2xl flex items-center justify-center shadow-md"
            >
              <p className="font-body font-medium text-black text-lg">Home</p>
            </a>
            <a
              href="/market"
              className="h-[39px] w-3xs bg-white rounded-2xl flex items-center justify-center shadow-md"
            >
              <p className="font-body font-medium text-black text-lg">
                NusaMarket
              </p>
            </a>
            <a
              href="/xperience"
              className="h-[39px] w-3xs bg-white rounded-2xl flex items-center justify-center shadow-md"
            >
              <p className="font-body font-medium text-black text-lg">
                NusaExperience
              </p>
            </a>

            <a
              href="/login"
              className="mx-[25px] w-[256px] h-[39px] pr-6 pl-6 bg-lime-700 rounded-[14px] flex items-center justify-center text-3/4xl mt-26.75"
            >
              <p className="font-body text-white font-medium ">Login</p>
            </a>
          </div>

          <button
            onClick={toggleMenu}
            aria-label="Close menu"
            className="mt-9 cursor-pointer "
          >
            <CircleX size={70} strokeWidth={1} color="#467750" />
          </button>
        </div>
      </div>
    </nav>
  );
}
