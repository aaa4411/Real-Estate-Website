import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropertyMapView from "@/components/map/PropertyMapView";
import { allProperties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Property } from "@/components/properties/PropertyCard";

export default function MapPage() {
  const [searchParams] = useSearchParams();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState<[string, string]>(["0", "any"]);

  // Filter properties based on search criteria
  const filteredProperties = allProperties.filter((property) => {
    // Filter by location
    if (
      location &&
      !property.address.toLowerCase().includes(location.toLowerCase())
    ) {
      return false;
    }

    // Filter by price range
    if (priceRange[1] !== "any") {
      const minPrice = parseInt(priceRange[0]);
      const maxPrice = parseInt(priceRange[1]);
      if (
        property.price < minPrice ||
        (maxPrice > 0 && property.price > maxPrice)
      ) {
        return false;
      }
    }

    // Filter by property type (would be implemented with real data)
    if (propertyType && propertyType !== "any") {
      // This is a placeholder - in a real app, properties would have a 'type' field
      // return property.type === propertyType;
    }

    return true;
  });

  const handlePropertySelect = (property: Property) => {
    console.log("Selected property:", property);
    // Additional handling if needed
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Property Map</h1>

      {/* Filter controls */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range
            </label>
            <Select
              value={`${priceRange[0]}-${priceRange[1]}`}
              onValueChange={(value) => {
                const [min, max] = value.split("-");
                setPriceRange([min, max]);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-any">Any price</SelectItem>
                <SelectItem value="0-250000">Under $250,000</SelectItem>
                <SelectItem value="250000-500000">
                  $250,000 - $500,000
                </SelectItem>
                <SelectItem value="500000-750000">
                  $500,000 - $750,000
                </SelectItem>
                <SelectItem value="750000-1000000">
                  $750,000 - $1,000,000
                </SelectItem>
                <SelectItem value="1000000-any">$1,000,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Map component */}
      <PropertyMapView
        properties={filteredProperties}
        onPropertySelect={handlePropertySelect}
        title="Interactive Property Map"
        description="Explore properties across different locations"
      />
    </div>
  );
}
