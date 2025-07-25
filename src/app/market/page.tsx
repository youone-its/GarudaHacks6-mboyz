"use client";

import { useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import {
  SlidersHorizontal,
  Search,
  ChevronDown,
  Star,
  Heart,
  X,
} from "lucide-react";

const products = [
  {
    id: 1,
    category: "MEN",
    name: "Batik Parang Kemeja",
    price: 185000,
    rating: 4.5,
    sizes: "S - XXL",
    isWishlisted: false,
    imageUrl: "/market/1.png", // local source
  },
  {
    id: 2,
    category: "WOMEN",
    name: "Modern Encim Kebaya",
    price: 450000,
    rating: 5,
    sizes: "S - L",
    isWishlisted: true,
    imageUrl: "/market/2.png",
  },
  {
    id: 3,
    category: "WOMEN",
    name: "Tenun Ikat Sumba Skirt",
    price: 320000,
    rating: 4.5,
    sizes: "All Size",
    isWishlisted: false,
    imageUrl: "/market/3.png",
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
    id: 5,
    category: "BAGS",
    name: "Anjat Rattan Bag",
    price: 210000,
    rating: 5,
    sizes: "One Size",
    isWishlisted: false,
    imageUrl: "/market/5.png",
  },
  {
    id: 6,
    category: "DECOR",
    name: "Cirebon Wooden Mask",
    price: 275000,
    rating: 4.5,
    sizes: "Display",
    isWishlisted: false,
    imageUrl: "/market/6.png",
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
  {
    id: 8,
    category: "CRAFTS",
    name: "Wayang Kulit Arjuna",
    price: 350000,
    rating: 5,
    sizes: "45cm",
    isWishlisted: false,
    imageUrl: "/market/8.png",
  },
  {
    id: 9,
    category: "MEN",
    name: "Blangkon Solo",
    price: 85000,
    rating: 4,
    sizes: "55-60cm",
    isWishlisted: false,
    imageUrl: "/market/9.png",
  },
];
const filterOptions = {
  gender: ["Male", "Female"],
  price: ["0 - 100,000", "100,000 - 500,000", "> 500,000"],
  size: ["XS", "S", "M", "L", "XL"],
  origin: ["Java", "Sumatra", "Kalimantan", "Sulawesi", "Papua"],
};
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low"];
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  sizes: string;
  rating: number;
  imageUrl: string;
  isWishlisted: boolean;
}

const ProductCard = ({ product }: { product: Product }) => (
  // --- FIX IS HERE: Added "flex flex-col" ---
  <div className="border rounded-lg overflow-hidden group transition-shadow hover:shadow-lg flex flex-col">
    <div className="relative bg-gray-200 aspect-square">
      {/* --- BEST PRACTICE UPDATE for <Image> --- */}
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill // Replaces layout="fill"
        className="object-cover group-hover:scale-105 transition-transform duration-300" // Replaces objectFit="cover"
      />
    </div>

    {/* This "flex-grow" helps ensure the footer aligns correctly if cards have different text lengths */}
    <div className="p-4 space-y-2 flex flex-col flex-grow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-black">{product.category}</p>
          <h3 className="font-semibold text-black">{product.name}</h3>
        </div>
        <Heart
          size={20}
          className={`cursor-pointer transition-colors ${
            product.isWishlisted
              ? "text-red-500 fill-current" // Filled red if wishlisted
              : "text-black hover:text-red-500" // Outline otherwise
          }`}
        />
      </div>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < Math.round(product.rating) // Use Math.round for half-stars
                ? "text-yellow-400 fill-current"
                : "text-gray-300" // Lighter color for empty stars
            }
          />
        ))}
      </div>
      {/* This "mt-auto" pushes the footer to the bottom of the card */}
      <div className="flex justify-between items-center mt-auto pt-2">
        <p className="font-bold text-black">
          Rp{product.price.toLocaleString("id-ID")}
        </p>
        <p className="text-xs text-black">{product.sizes}</p>
      </div>
    </div>
  </div>
);
const FilterGroup = ({
  title,
  options,
}: {
  title: string;
  options: string[];
}) => (
  <div className="py-4 border-b border-gray-200">
    <h3 className="font-semibold text-black mb-2">{title}</h3>
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-green-700 focus:ring-green-600"
          />
          <span className="text-sm text-black">{option}</span>
        </label>
      ))}
    </div>
  </div>
);
const MobileFilterPanel = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => (
  <div
    className={`fixed inset-0 z-50 transition-opacity duration-300 ${
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <div
      className="absolute inset-0 bg-black bg-opacity-50"
      onClick={onClose}
    ></div>
    <div
      className={`relative bg-white h-full w-80 max-w-full shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-black">Filter</h2>
          <button onClick={onClose} className="p-1">
            <X size={24} className="text-black" />
          </button>
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          <FilterGroup title="Gender" options={filterOptions.gender} />
          <FilterGroup title="Price" options={filterOptions.price} />
          <FilterGroup title="Size" options={filterOptions.size} />
          <FilterGroup title="Origin" options={filterOptions.origin} />
        </div>
        <div className="p-4 border-t">
          <button
            className="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-800"
            onClick={onClose}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ShopPage: NextPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortRef]);

  return (
    <div className="bg-white min-h-screen">
      <MobileFilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="my-8 h-64 rounded-lg text-black flex flex-col justify-center items-center p-8 relative overflow-hidden">
          <Image
            src="/market/banner.png"
            alt="Banner"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 z-0"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
          <aside className="hidden lg:block">
            <h2 className="text-sm font-bold text-black mb-4 flex items-center gap-2">
              <SlidersHorizontal size={20} color="#467750" />
              Filter
            </h2>
            <FilterGroup title="Gender" options={filterOptions.gender} />
            <FilterGroup title="Price" options={filterOptions.price} />
            <FilterGroup title="Size" options={filterOptions.size} />
            <FilterGroup title="Origin" options={filterOptions.origin} />
            <div className="mt-6">
              <button className="w-full bg-green-700 text-white font-bold py-2.5 rounded-lg hover:bg-green-800 transition-colors">
                Apply Filters
              </button>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <form className="w-full sm:w-2/3 flex">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 border border-r-0 border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                />
                <button
                  type="submit"
                  className="bg-green-700 text-white px-4 py-2 rounded-r-lg hover:bg-green-800 flex items-center justify-center"
                >
                  <Search size={20} />
                </button>
              </form>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center space-x-2 text-sm font-bold text-black p-2 border rounded-lg"
                >
                  <SlidersHorizontal size={20} color="#467750" />
                  <span>Filter</span>
                </button>

                <div className="relative" ref={sortRef}>
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center space-x-2 text-sm font-bold text-black whitespace-nowrap"
                  >
                    <span>Sort By</span>
                    <ChevronDown
                      size={16}
                      color="#467750"
                      className={`transition-transform duration-200 ${
                        isSortOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isSortOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-20">
                      <ul className="py-1">
                        {sortOptions.map((option) => (
                          <li
                            key={option}
                            onClick={() => setIsSortOpen(false)}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShopPage;
