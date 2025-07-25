"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SearchBox from "@/components/SearchBox";
import ExperienceCard, { Experience } from "@/components/xperienceCard";

const dummyExperiences: Experience[] = [
  {
    id: 1,
    title: "Hand-drawn Batik Workshop in Yogyakarta",
    location: "Yogyakarta, Indonesia",
    price: 250000,
    rating: 4.9,
    imageUrl: "/xperience/1.png",
    isWishlisted: false,
  },
  {
    id: 2,
    title: "Balinese Culinary Cooking Class",
    location: "Ubud, Bali",
    price: 350000,
    rating: 4.8,
    imageUrl: "/xperience/2.png",
    isWishlisted: true,
  },
  {
    id: 3,
    title: "Gayo Coffee Plantation Tour",
    location: "Central Aceh, Aceh",
    price: 200000,
    rating: 4.9,
    imageUrl: "/xperience/3.png",
    isWishlisted: false,
  },
  {
    id: 4,
    title: "Jepara Wood Carving Workshop",
    location: "Jepara, Central Java",
    price: 300000,
    rating: 4.7,
    imageUrl: "/xperience/4.png",
    isWishlisted: false,
  },
  {
    id: 5,
    title: "Diving at Bunaken Marine Park",
    location: "Manado, North Sulawesi",
    price: 750000,
    rating: 5.0,
    imageUrl: "/xperience/5.png",
    isWishlisted: true,
  },
  {
    id: 6,
    title: "Learn Saman Dance in Gayo Village",
    location: "Gayo Lues, Aceh",
    price: 150000,
    rating: 4.8,
    imageUrl: "/xperience/6.png",
    isWishlisted: false,
  },
];

export default function Page() {
  const imageList = [
    "/images/home1.jpg",
    "/images/home2.jpg",
    "/images/home3.jpg",
    "/images/home4.jpg",
    "/images/home5.jpg",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imageList.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative h-[70vh]">
        {imageList.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`background-${i}`}
            fill
            className={`object-cover transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            priority={i === 0}
          />
        ))}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold mx-4 drop-shadow-lg">
            Welcome to NusaExperience
          </h1>
        </div>
      </section>

      <SearchBox />

      <section className="mt-[10vh] grid grid-cols-1 md:grid-cols-2 gap-8 p-8 items-center max-w-7xl mx-auto">
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">
            Nusantara Cultural Experiences
          </h2>
          <p className="text-lg text-gray-700">
            Explore authentic local charm – from culture and traditions to the
            warmth of the people. NusaExperience connects you with unforgettable
            experiences.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/asset1ne2.svg"
            alt="Ilustrasi Budaya"
            width={400}
            height={400}
            className="w-full h-auto max-w-xs md:max-w-md"
          />
        </div>
      </section>

      <section className="py-16 px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
          Popular Experiences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyExperiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </section>
    </main>
  );
}
