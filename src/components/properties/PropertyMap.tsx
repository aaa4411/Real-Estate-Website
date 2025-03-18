import React, { useState } from "react";
import { MapPin, Home, Search } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

// Define Property interface locally since it's not exported from PropertyCard
interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  imageUrl: string;
}

interface PropertyMapProps {
  properties?: Property[];
  onPropertySelect?: (property: Property) => void;
}

export default function PropertyMap({
  properties = [
    {
      id: "1",
      title: "Modern Downtown Apartment",
      price: 450000,
      address: "123 Main St, Downtown",
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1200,
      imageUrl:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    },
    {
      id: "2",
      title: "Suburban Family Home",
      price: 750000,
      address: "456 Oak Ave, Suburbia",
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2400,
      imageUrl:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    },
    {
      id: "3",
      title: "Luxury Beachfront Villa",
      price: 1250000,
      address: "789 Ocean Blvd, Seaside",
      bedrooms: 5,
      bathrooms: 4,
      squareFeet: 3500,
      imageUrl:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    },
    {
      id: "4",
      title: "Cozy Mountain Cabin",
      price: 350000,
      address: "101 Pine Trail, Mountain View",
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1800,
      imageUrl:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
    },
    {
      id: "5",
      title: "Urban Loft Space",
      price: 525000,
      address: "202 Loft Lane, Arts District",
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 950,
      imageUrl:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    },
  ],
  onPropertySelect = () => {},
}: PropertyMapProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [showPropertyDialog, setShowPropertyDialog] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);

  // Mock property locations for the map
  const propertyLocations = properties.map((property, index) => ({
    ...property,
    x: 100 + (index % 5) * 150, // Distribute pins horizontally
    y: 100 + Math.floor(index / 5) * 120, // Distribute pins vertically
  }));

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setShowPropertyDialog(true);
    if (onPropertySelect) {
      onPropertySelect(property);
    }
  };

  const handleZoomIn = () => {
    setMapZoom((prev) => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setMapZoom((prev) => Math.max(prev - 0.2, 0.6));
  };

  return (
    <div className="bg-white py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
            Property Locations
          </h2>
          <p className="mt-1 sm:mt-2 text-base sm:text-lg text-gray-600">
            Find properties in your desired location
          </p>
        </div>

        {/* Map container */}
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-md">
          {/* Mock map background */}
          <div
            className="absolute inset-0 bg-[#e8f4f8]"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1577086664693-894d8405334a?w=1200&q=80')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `scale(${mapZoom})`,
              transition: "transform 0.3s ease",
            }}
          />

          {/* Property pins */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="relative w-full h-full"
              style={{
                transform: `scale(${mapZoom})`,
                transition: "transform 0.3s ease",
              }}
            >
              {propertyLocations.map((property) => (
                <TooltipProvider key={property.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110"
                        style={{ left: property.x, top: property.y }}
                        onClick={() => handlePropertyClick(property)}
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
                            <Home
                              size={16}
                              className="sm:h-[18px] sm:w-[18px]"
                            />
                          </div>
                          <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
                        </div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-medium text-sm sm:text-base">
                        {property.title}
                      </p>
                      <p className="text-xs sm:text-sm">
                        ${property.price.toLocaleString()}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>

          {/* Map controls */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex flex-col gap-1 sm:gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={handleZoomIn}
              className="h-7 w-7 sm:h-8 sm:w-8"
            >
              <span className="text-base sm:text-lg font-bold">+</span>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleZoomOut}
              className="h-7 w-7 sm:h-8 sm:w-8"
            >
              <span className="text-base sm:text-lg font-bold">-</span>
            </Button>
          </div>

          {/* Search overlay */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 max-w-xs w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-8 sm:pl-10 pr-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Search locations..."
              />
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-white p-2 sm:p-3 rounded-md shadow-md text-xs sm:text-sm">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full"></div>
              <span>Available Properties ({properties.length})</span>
            </div>
          </div>
        </div>

        {/* Property count */}
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 text-center">
          {properties.length} properties available on the map
        </p>
      </div>

      {/* Property dialog */}
      <Dialog open={showPropertyDialog} onOpenChange={setShowPropertyDialog}>
        <DialogContent className="sm:max-w-md max-w-[90vw] p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">
              {selectedProperty?.title}
            </DialogTitle>
            <DialogDescription className="text-sm">
              {selectedProperty?.address}
            </DialogDescription>
          </DialogHeader>

          {selectedProperty && (
            <div className="mt-3 sm:mt-4">
              <div className="aspect-video overflow-hidden rounded-md mb-3 sm:mb-4">
                <img
                  src={selectedProperty.imageUrl}
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-4">
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-gray-500">Bedrooms</p>
                  <p className="font-medium text-sm sm:text-base">
                    {selectedProperty.bedrooms}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-gray-500">Bathrooms</p>
                  <p className="font-medium text-sm sm:text-base">
                    {selectedProperty.bathrooms}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-gray-500">Area</p>
                  <p className="font-medium text-sm sm:text-base">
                    {selectedProperty.squareFeet} sq ft
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <p className="text-lg sm:text-xl font-bold">
                  ${selectedProperty.price.toLocaleString()}
                </p>
                <Button
                  onClick={() =>
                    (window.location.href = `/property/${selectedProperty.id}`)
                  }
                  className="w-full sm:w-auto"
                >
                  View Details
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
