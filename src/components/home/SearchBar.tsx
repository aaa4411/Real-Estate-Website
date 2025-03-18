import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
  className?: string;
  initialValues?: Partial<SearchFilters>;
}

export interface SearchFilters {
  location: string;
  priceRange: string;
  propertyType: string;
}

const SearchBar = ({
  onSearch,
  className = "",
  initialValues = {},
}: SearchBarProps) => {
  const [location, setLocation] = useState(initialValues.location || "");
  const [priceRange, setPriceRange] = useState(
    initialValues.priceRange || "any",
  );
  const [propertyType, setPropertyType] = useState(
    initialValues.propertyType || "any",
  );

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        location,
        priceRange,
        propertyType,
      });
    }
  };

  return (
    <div
      className={`w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 ${className}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="sm:col-span-1">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Location
          </label>
          <Input
            id="location"
            placeholder="City, neighborhood, or ZIP"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="price-range"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price Range
          </label>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger id="price-range" className="w-full">
              <SelectValue placeholder="Any price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any price</SelectItem>
              <SelectItem value="0-100000">$0 - $100,000</SelectItem>
              <SelectItem value="100000-250000">$100,000 - $250,000</SelectItem>
              <SelectItem value="250000-500000">$250,000 - $500,000</SelectItem>
              <SelectItem value="500000-750000">$500,000 - $750,000</SelectItem>
              <SelectItem value="750000-1000000">
                $750,000 - $1,000,000
              </SelectItem>
              <SelectItem value="1000000+">$1,000,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="property-type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Property Type
          </label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger id="property-type" className="w-full">
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any type</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="land">Land</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="sm:col-span-1 flex items-end">
          <Button
            onClick={handleSearch}
            className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 h-10"
          >
            <Search className="h-4 w-4" />
            <span className="sm:inline">Search</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
