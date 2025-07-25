// You can place this code in `app/shop/page.tsx`

import type { NextPage } from "next";
import Image from "next/image";
import { Filter, Search, ChevronDown, Star, Heart } from "lucide-react";

// --- MOCK DATA (Replace with your actual data from an API) ---
const products = [
  {
    id: 1,
    name: "Batik Shirt",
    category: "MEN",
    price: 100000,
    sizes: "XS - XL",
    rating: 4,
    imageUrl: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Woven Skirt",
    category: "WOMEN",
    price: 150000,
    sizes: "S - L",
    rating: 5,
    imageUrl: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Handmade Necklace",
    category: "ACCESSORIES",
    price: 80000,
    sizes: "One Size",
    rating: 5,
    imageUrl: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Classic Blangkon",
    category: "MEN",
    price: 95000,
    sizes: "M - XL",
    rating: 4,
    imageUrl: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Songket Shawl",
    category: "WOMEN",
    price: 250000,
    sizes: "One Size",
    rating: 5,
    imageUrl: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Leather Wayang Puppet",
    category: "SOUVENIR",
    price: 120000,
    sizes: "N/A",
    rating: 5,
    imageUrl: "/placeholder.svg",
  },
];

const filterOptions = {
  gender: ["Male", "Female"],
  price: ["0 - 100,000", "100,000 - 500,000", "> 500,000"],
  size: ["XS", "S", "M", "L", "XL"],
  origin: ["Java", "Sumatra", "Kalimantan", "Sulawesi", "Papua"],
};

// --- TYPE DEFINITIONS ---
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  sizes: string;
  rating: number;
  imageUrl: string;
}

// --- COMPONENTS ---

// 1. Product Card Component
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="border rounded-lg overflow-hidden group">
      <div className="relative bg-gray-200 aspect-square">
        {/* Replace with <Image /> component once you have image URLs */}
        {/* <Image src={product.imageUrl} alt={product.name} layout="fill" objectFit="cover" /> */}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-gray-500">{product.category}</p>
            <h3 className="font-semibold">{product.name}</h3>
          </div>
          <Heart
            className="text-gray-400 hover:text-red-500 hover:fill-current cursor-pointer"
            size={20}
          />
        </div>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < product.rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }
            />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <p className="font-bold">Rp{product.price.toLocaleString("id-ID")}</p>
          <p className="text-xs text-gray-500">{product.sizes}</p>
        </div>
      </div>
    </div>
  );
};

// 2. Filter Group Component
const FilterGroup = ({
  title,
  options,
}: {
  title: string;
  options: string[];
}) => (
  <div className="py-4 border-b">
    <h3 className="font-semibold mb-2">{title}</h3>
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <span className="text-sm text-gray-600">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

// --- MAIN PAGE ---

const ShopPage: NextPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* You can add your Header/Navbar component here */}

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner Section */}
        <div className="my-8 h-64 rounded-lg  text-white flex flex-col justify-center items-center p-8 relative overflow-hidden">
          <Image
            src="/market/banner.png"
            alt="Banner"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 z-0 "
          />

          {/* Add your wayang and batik motif images here with absolute positioning if needed */}
        </div>

        {/* Main Content: Filters + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
          {/* Left Column: Filters */}
          <aside className="hidden lg:block">
            <div className="flex items-center space-x-2 mb-4">
              <Filter size={20} />
              <h2 className="text-xl font-bold text-black">Filter</h2>
            </div>
            <FilterGroup title="Gender" options={filterOptions.gender} />
            <FilterGroup title="Price" options={filterOptions.price} />
            <FilterGroup title="Size" options={filterOptions.size} />
            <FilterGroup title="Origin" options={filterOptions.origin} />
          </aside>

          {/* Right Column: Search + Grid */}
          <div className="lg:col-span-3">
            {/* Search and Sort Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full sm:w-2/3">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button className="hover:shadow-2xl flex items-center space-x-2 text-sm font-medium text-gray-700">
                <span>Sort By</span>
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Product Grid */}
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
