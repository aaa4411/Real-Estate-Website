import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Button } from "../ui/button";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  onSearch?: (filters: {
    location: string;
    priceRange: string;
    propertyType: string;
  }) => void;
}

const HeroSection = ({
  title = "Find Your Dream Home",
  subtitle = "Discover the perfect property that fits your lifestyle and budget",
  backgroundImage = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
  onSearch,
}: HeroSectionProps) => {
  const navigate = useNavigate();

  const handleSearch = (filters: {
    location: string;
    priceRange: string;
    propertyType: string;
  }) => {
    if (onSearch) {
      onSearch(filters);
    }

    // Navigate to properties page with search params
    const searchParams = new URLSearchParams();
    if (filters.location) searchParams.append("location", filters.location);
    if (filters.priceRange)
      searchParams.append("priceRange", filters.priceRange);
    if (filters.propertyType)
      searchParams.append("propertyType", filters.propertyType);

    navigate(`/properties?${searchParams.toString()}`);
  };

  return (
    <div
      className="relative w-full h-[500px] md:h-[600px] bg-gray-100 flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-2 md:mb-4">
          {title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white text-center mb-4 md:mb-8 max-w-3xl px-2">
          {subtitle}
        </p>

        <SearchBar onSearch={handleSearch} className="w-full max-w-4xl" />

        <div className="mt-4 md:mt-8 flex flex-wrap gap-2 md:gap-4 justify-center">
          <Button
            variant="outline"
            className="bg-white hover:bg-gray-100 text-gray-900 border-none text-sm md:text-base"
            onClick={() => navigate("/properties")}
          >
            Explore Popular Areas
          </Button>
          <Button
            variant="outline"
            className="bg-transparent hover:bg-white/10 text-white border-white text-sm md:text-base"
            onClick={() => navigate("/about")}
          >
            How It Works
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
