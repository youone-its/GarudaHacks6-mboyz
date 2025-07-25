"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  ImageIcon,
  ShoppingCart,
  Sparkles,
  Tent,
} from "lucide-react";

// Import your components
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/footer";
import ProductCard, { Product } from "@/components/productCard"; // Make sure this exists and the type is exported
import ExperienceCard, { Experience } from "@/components/xperienceCard"; // Make sure this exists and the type is exported

// Data can be fetched or imported. For this self-contained example, we define it here.
const featuredProducts: Product[] = [
  {
    id: 1,
    category: "MEN",
    name: "Batik Parang Kemeja",
    price: 185000,
    rating: 4.5,
    sizes: "S - XXL",
    isWishlisted: false,
    imageUrl: "/market/1.png",
  },
  {
    id: 4,
    category: "ACCESSORIES",
    name: "Dayak Beaded Necklace",
    price: 95000,
    rating: 4,
    sizes: "One Size",
    isWishlisted: true,
    imageUrl: "/market/4.png",
  },
  {
    id: 7,
    category: "JEWELRY",
    name: "Celuk Silver Bracelet",
    price: 550000,
    rating: 5,
    sizes: "Adjustable",
    isWishlisted: true,
    imageUrl: "/market/7.png",
  },
];
const featuredExperiences: Experience[] = [
  {
    id: 2,
    title: "Bali Culinary Cooking Class",
    location: "Ubud, Bali",
    price: 350000,
    rating: 4.8,
    imageUrl: "/xperience/2.png",
    isWishlisted: true,
  },
  {
    id: 3,
    title: "Gayo Coffee Plantation Tour",
    location: "Aceh Tengah, Aceh",
    price: 200000,
    rating: 4.9,
    imageUrl: "/xperience/3.png",
    isWishlisted: false,
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

const heroImageList = [
  "/images/home1.jpg",
  "/images/home2.jpg",
  "/images/home3.jpg",
  "/images/home4.jpg",
  "/images/home5.jpg",
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  // This useEffect handles the slideshow timing. It doesn't use Framer Motion.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImageList.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants for Framer Motion on text elements
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const textCharVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main className="overflow-x-hidden flex flex-col bg-white">
      {/* =======================================================================
       * SECTION 1: HERO (with Sliding Image Effect)
       * ======================================================================= */}
      <section className="w-full h-screen relative text-white">
        {/* The overflow-hidden container acts as the "window" */}
        <div className="w-full h-full overflow-hidden">
          {/* This inner div is the "film strip" that slides */}
          <div
            className="flex w-full h-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            {/* Each image is a slide */}
            {heroImageList.map((src) => (
              <div key={src} className="relative w-full h-full flex-shrink-0">
                <Image
                  src={src}
                  alt="Nusantara Culture background"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ))}
          </div>
        </div>

        {/* The dark overlay and text content go on top */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-4">
          <motion.h1
            className="font-bold text-4xl sm:text-6xl md:text-7xl"
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {"Connecting Cultures".split("").map((char, index) => (
              <motion.span key={index} variants={textCharVariants}>
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className="mt-4 text-lg md:text-xl max-w-2xl text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            Your gateway to the authentic heart of Indonesia. Discover, learn,
            and own a piece of its legacy.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <Link
              href="/market"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 font-semibold text-lg text-black bg-white rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300"
            >
              <ShoppingCart size={20} />
              Explore NusaMarket
            </Link>
            <Link
              href="/xperience"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 font-semibold text-lg text-white bg-transparent border-2 border-white rounded-full hover:bg-white/20 transition-all duration-300"
            >
              <Tent size={20} />
              Discover NusaExperience
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =======================================================================
       * SECTION 2: Featured Products
       * ======================================================================= */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              From Our NusaMarket
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Handpicked cultural artifacts, crafted with passion by local
              artisans.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/market"
              className="text-lg font-semibold text-lime-700 hover:text-lime-600"
            >
              View All Products{" "}
              <ArrowRight className="inline-block" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* =======================================================================
       * SECTION 3: Featured Experiences
       * ======================================================================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Popular Experiences
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Live the culture, don't just see it. Unforgettable journeys await.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/xperience"
              className="text-lg font-semibold text-lime-700 hover:text-lime-600"
            >
              View All Experiences{" "}
              <ArrowRight className="inline-block" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* <section className="bg-[#467750] py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Powered by Culture-Conscious AI
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-3xl mx-auto">
              Our unique AI tools help you explore, create, and connect with
              Indonesian culture in new and exciting ways.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
              <Sparkles className="mx-auto h-12 w-12 text-white" />
              <h3 className="mt-6 text-xl font-bold">NusaOutfit</h3>
              <p className="mt-2 text-white/80">
                Try on traditional Indonesian attire virtually using our AR
                technology.
              </p>
            </div>
            <div className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
              <Bot className="mx-auto h-12 w-12 text-white" />
              <h3 className="mt-6 text-xl font-bold">NusaChat</h3>
              <p className="mt-2 text-white/80">
                Ask anything about Indonesian culture and get instant answers
                from our smart AI.
              </p>
            </div>
            <div className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
              <ImageIcon className="mx-auto h-12 w-12 text-white" />
              <h3 className="mt-6 text-xl font-bold">NusaImage</h3>
              <p className="mt-2 text-white/80">
                Turn your imagination into beautiful, culturally-inspired
                images.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      <FAQSection />
      <Footer />
    </main>
  );
}
