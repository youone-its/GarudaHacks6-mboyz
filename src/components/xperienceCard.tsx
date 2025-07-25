import Image from "next/image";
import { Heart, MapPin, Star } from "lucide-react";

// You can create a new type for your experiences
export interface Experience {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  imageUrl: string;
  isWishlisted: boolean;
}

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden group transition-shadow duration-300 hover:shadow-xl border">
      <div className="relative w-full aspect-[4/3] bg-gray-100">
        <Image
          src={experience.imageUrl}
          alt={experience.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-3 right-3 bg-white/70 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:text-red-500 transition-colors">
          <Heart size={20} />
        </button>
      </div>
      <div className="p-4 flex flex-col">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-gray-900 leading-tight">
            {experience.title}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={16} className="text-amber-400 fill-current" />
            <span className="font-semibold text-sm">{experience.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-gray-500 mt-1">
          <MapPin size={14} />
          <p className="text-sm">{experience.location}</p>
        </div>
        <p className="mt-4 text-base">
          <span className="font-bold text-gray-900">
            Rp{experience.price.toLocaleString("id-ID")}
          </span>
          <span className="text-gray-600"> / person</span>
        </p>
      </div>
    </div>
  );
};

export default ExperienceCard;
