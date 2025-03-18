import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import PropertyCard, { Property } from "@/components/properties/PropertyCard";
import PropertyMap from "@/components/properties/PropertyMap";
import { allProperties } from "@/data/properties";
import SearchBar, { SearchFilters } from "@/components/home/SearchBar";

export default function PropertyListingPage() {
  const [searchParams] = useSearchParams();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [bedroomsMin, setBedroomsMin] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  // Parse search params from URL (if coming from hero search)
  useEffect(() => {
    const locationParam = searchParams.get("location");
    const priceRangeParam = searchParams.get("priceRange");
    const propertyTypeParam = searchParams.get("propertyType");

    if (locationParam) setLocation(locationParam);
    if (propertyTypeParam) setPropertyType(propertyTypeParam);
    if (priceRangeParam) {
      // Handle price range conversion from string format to array
      if (priceRangeParam === "any") {
        setPriceRange([0, 2000000]);
      } else if (priceRangeParam === "1000000+") {
        setPriceRange([1000000, 2000000]);
      } else {
        const [min, max] = priceRangeParam.split("-").map(Number);
        if (!isNaN(min) && !isNaN(max)) {
          setPriceRange([min, max]);
        }
      }
    }
  }, [searchParams]);

  // Filter properties based on criteria
  const filteredProperties = allProperties.filter((property) => {
    if (
      location &&
      !property.address.toLowerCase().includes(location.toLowerCase())
    ) {
      return false;
    }
    if (property.price < priceRange[0] || property.price > priceRange[1]) {
      return false;
    }
    if (bedroomsMin && property.bedrooms < parseInt(bedroomsMin)) {
      return false;
    }
    return true;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "beds") return b.bedrooms - a.bedrooms;
    // Default: newest
    return parseInt(b.id) - parseInt(a.id);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Property Listings
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <Input
              placeholder="Enter city, zip or address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Type
            </label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Bedrooms
            </label>
            <Select value={bedroomsMin} onValueChange={setBedroomsMin}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Newest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                <SelectItem value="beds">Most Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range: ${priceRange[0].toLocaleString()} - $
            {priceRange[1].toLocaleString()}
          </label>
          <Slider
            defaultValue={[0, 2000000]}
            max={2000000}
            step={50000}
            onValueChange={(value) => setPriceRange(value as number[])}
            className="mt-2"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          {sortedProperties.length} properties found
        </p>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
            size="sm"
          >
            Grid View
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            onClick={() => setViewMode("map")}
            size="sm"
          >
            Map View
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <PropertyMap properties={sortedProperties} />
      )}
    </div>
  );
}
