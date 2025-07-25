import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";

// You should have this interface defined, perhaps in a central types file or your data file
export interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
  rating: number;
  sizes: string;
  isWishlisted: boolean;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col group transition-shadow duration-200 hover:shadow-lg">
      <div className="relative w-full aspect-square bg-gray-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {product.category}
          </span>
          <button
            className={`p-1 transition-colors ${
              product.isWishlisted
                ? "text-red-500 fill-current"
                : "text-gray-400 hover:text-gray-900"
            }`}
            aria-label="Add to wishlist"
          >
            <Heart size={18} />
          </button>
        </div>

        {/* Use a Link to make the name clickable */}
        <Link href={`/products/${product.id}`}>
          <span className="text-base font-semibold text-gray-900 hover:text-lime-700 transition-colors cursor-pointer">
            {product.name}
          </span>
        </Link>

        <div className="mt-1 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < Math.round(product.rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }
            />
          ))}
        </div>

        <div className="mt-auto pt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-gray-600">{product.sizes}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
