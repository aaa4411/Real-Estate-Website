import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Home,
  Calendar,
  Share2,
  Heart,
} from "lucide-react";
import { Property } from "./PropertyCard";

interface PropertyDetailProps {
  property?: Property;
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock property data if none is provided
  const propertyData = property || {
    id: "1",
    title: "Luxury Waterfront Villa",
    address: "123 Oceanview Drive, Miami, FL 33101",
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 2800,
    imageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    description:
      "This stunning waterfront villa offers breathtaking views and luxurious living spaces. The property features an open floor plan, gourmet kitchen, and resort-style pool.\n\nThe main level includes a grand foyer, formal living and dining rooms, a chef's kitchen with top-of-the-line appliances, and a family room with panoramic water views. The primary suite is a true retreat with a spa-like bathroom, walk-in closet, and private balcony.\n\nOutdoor amenities include a resort-style pool, summer kitchen, and private dock. Additional features include a three-car garage, smart home technology, and a security system.",
    amenities: [
      "Swimming Pool",
      "Home Office",
      "Garage",
      "Garden",
      "Air Conditioning",
      "Balcony",
      "Security System",
      "High Ceilings",
      "Fireplace",
      "Hardwood Floors",
      "Stainless Steel Appliances",
      "Walk-in Closet",
    ],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090733a21e0?w=800&q=80",
    ],
    yearBuilt: 2018,
    lotSize: "0.5 acres",
    parkingSpaces: 3,
    propertyType: "Single Family",
    status: "For Sale",
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 bg-background">
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div>
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm"
              >
                {propertyData.status || "For Sale"}
              </Badge>
              <Badge
                variant="outline"
                className="bg-gray-100 text-gray-800 border-gray-200 text-xs sm:text-sm"
              >
                Listed 2 weeks ago
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {propertyData.title}
            </h1>
            <p className="text-gray-600 flex items-center mt-1 text-sm sm:text-base">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              {propertyData.address}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-xs sm:text-sm h-8 sm:h-9"
            >
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Schedule Tour</span>
              <span className="xs:hidden">Tour</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9"
            >
              <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleFavorite}
              className="h-8 w-8 sm:h-9 sm:w-9"
            >
              <Heart
                className={`h-3 w-3 sm:h-4 sm:w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
              />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-3 sm:mt-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-primary" />
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Bedrooms</p>
              <p className="font-semibold text-sm sm:text-base">
                {propertyData.bedrooms}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-primary" />
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Bathrooms</p>
              <p className="font-semibold text-sm sm:text-base">
                {propertyData.bathrooms}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-primary" />
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Square Feet</p>
              <p className="font-semibold text-sm sm:text-base">
                {propertyData.squareFeet}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Home className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-primary" />
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Property Type</p>
              <p className="font-semibold text-sm sm:text-base">
                {propertyData.propertyType || "Single Family"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          {/* Property Gallery */}
          <div className="space-y-2 sm:space-y-4">
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src={propertyData.images?.[0] || propertyData.imageUrl}
                alt={propertyData.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-1 sm:gap-2">
              {(propertyData.images || [propertyData.imageUrl])
                .slice(0, 4)
                .map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Property thumbnail ${index + 1}`}
                    className="h-14 sm:h-20 w-full object-cover rounded-md"
                  />
                ))}
            </div>
          </div>

          {/* Property Details */}
          <div className="mt-4 sm:mt-6 md:mt-8">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 mb-4 sm:mb-6 md:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Overview
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Price</p>
                  <p className="font-semibold text-base sm:text-lg">
                    ${propertyData.price.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Year Built</p>
                  <p className="font-semibold text-sm sm:text-base">
                    {propertyData.yearBuilt || 2018}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Lot Size</p>
                  <p className="font-semibold text-sm sm:text-base">
                    {propertyData.lotSize || "0.5 acres"}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Parking</p>
                  <p className="font-semibold text-sm sm:text-base">
                    {propertyData.parkingSpaces || 3} spaces
                  </p>
                </div>
              </div>
              <Separator className="my-4 sm:my-6" />
              <div className="prose max-w-none">
                <p className="text-sm sm:text-base text-gray-700 whitespace-pre-line leading-relaxed">
                  {propertyData.description || "No description available."}
                </p>
              </div>
            </div>

            <Tabs defaultValue="amenities" className="mb-4 sm:mb-6 md:mb-8">
              <TabsList className="grid w-full grid-cols-3 overflow-x-auto">
                <TabsTrigger value="amenities" className="text-xs sm:text-sm">
                  Amenities
                </TabsTrigger>
                <TabsTrigger value="location" className="text-xs sm:text-sm">
                  Location
                </TabsTrigger>
                <TabsTrigger value="details" className="text-xs sm:text-sm">
                  Property Details
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="amenities"
                className="mt-4 sm:mt-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                  Property Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {(propertyData.amenities || []).map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-primary flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-sm sm:text-base">{amenity}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent
                value="location"
                className="mt-4 sm:mt-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                  Property Location
                </h3>
                <div className="flex items-start mb-3 sm:mb-4">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 sm:mt-1 mr-1 sm:mr-2" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">
                      {propertyData.address}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Neighborhood: Central District
                    </p>
                  </div>
                </div>
                <div className="h-[200px] sm:h-[250px] md:h-[300px] bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* This would be replaced with an actual map component in a real implementation */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1577086664693-894d8405334a?w=1200&q=80')`,
                      filter: "brightness(0.9)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-2 sm:p-3 rounded-full shadow-lg">
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                    <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                      Nearby Amenities
                    </h4>
                    <ul className="text-xs sm:text-sm space-y-0.5 sm:space-y-1">
                      <li>Schools: 0.5 miles</li>
                      <li>Shopping: 0.8 miles</li>
                      <li>Parks: 1.2 miles</li>
                      <li>Restaurants: 0.3 miles</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                    <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                      Transportation
                    </h4>
                    <ul className="text-xs sm:text-sm space-y-0.5 sm:space-y-1">
                      <li>Bus Stop: 0.2 miles</li>
                      <li>Train Station: 1.5 miles</li>
                      <li>Airport: 12 miles</li>
                      <li>Highway Access: 2 miles</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent
                value="details"
                className="mt-4 sm:mt-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                  Property Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                      Interior Features
                    </h4>
                    <ul className="text-xs sm:text-sm space-y-1 sm:space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Bedrooms: {propertyData.bedrooms}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Bathrooms: {propertyData.bathrooms}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Square Feet: {propertyData.squareFeet}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Flooring: Hardwood, Tile</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Heating: Central</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Cooling: Central Air</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                      Exterior Features
                    </h4>
                    <ul className="text-xs sm:text-sm space-y-1 sm:space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Lot Size: {propertyData.lotSize}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Year Built: {propertyData.yearBuilt}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>
                          Parking: {propertyData.parkingSpaces} spaces
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Property Type: {propertyData.propertyType}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Roof: Tile</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Construction: Concrete</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div>
          {/* Contact Form Section */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 sticky top-4">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              Contact Agent
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=agent123"
                  alt="Agent"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-sm sm:text-base">
                  Sarah Johnson
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Luxury Property Specialist
                </p>
              </div>
            </div>
            <form className="space-y-3 sm:space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs sm:text-sm font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs sm:text-sm font-medium mb-1"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs sm:text-sm font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="I'm interested in this property..."
                  defaultValue={`I'm interested in ${propertyData.title} at ${propertyData.address}. Please contact me with more information.`}
                />
              </div>
              <Button className="w-full">Send Message</Button>
              <p className="text-xs text-gray-500 text-center">
                By submitting, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
