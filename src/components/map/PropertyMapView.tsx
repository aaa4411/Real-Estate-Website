import { useState } from "react";
import { MapPin, Home, Search, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Property } from "@/components/properties/PropertyCard";
import { useNavigate } from "react-router-dom";

interface PropertyMapViewProps {
  properties?: Property[];
  onPropertySelect?: (property: Property) => void;
  className?: string;
  title?: string;
  description?: string;
}

export default function PropertyMapView({
  properties = [],
  onPropertySelect,
  className = "",
  title = "Property Locations",
  description = "Find properties in your desired location",
}: PropertyMapViewProps) {
  const navigate = useNavigate();
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

  const handleViewDetails = () => {
    if (selectedProperty) {
      navigate(`/property/${selectedProperty.id}`);
    }
    setShowPropertyDialog(false);
  };

  return (
    <div className={`bg-white py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-lg text-gray-600">{description}</p>
        </div>

        {/* Map container */}
        <div className="relative h-[500px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-md">
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
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
                            <Home size={18} />
                          </div>
                          <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
                        </div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-medium">{property.title}</p>
                      <p className="text-sm">
                        ${property.price.toLocaleString()}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>

          {/* Map controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={handleZoomIn}
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleZoomOut}
              className="h-8 w-8"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>

          {/* Search overlay */}
          <div className="absolute top-4 left-4 max-w-xs w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Search locations..."
              />
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <span>Available Properties ({properties.length})</span>
            </div>
          </div>
        </div>

        {/* Property count */}
        <p className="mt-4 text-sm text-gray-500 text-center">
          {properties.length} properties available on the map
        </p>
      </div>

      {/* Property dialog */}
      <Dialog open={showPropertyDialog} onOpenChange={setShowPropertyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedProperty?.title}</DialogTitle>
            <DialogDescription>{selectedProperty?.address}</DialogDescription>
          </DialogHeader>

          {selectedProperty && (
            <div className="mt-4">
              <div className="aspect-video overflow-hidden rounded-md mb-4">
                <img
                  src={selectedProperty.imageUrl}
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Bedrooms</p>
                  <p className="font-medium">{selectedProperty.bedrooms}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Bathrooms</p>
                  <p className="font-medium">{selectedProperty.bathrooms}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Area</p>
                  <p className="font-medium">
                    {selectedProperty.squareFeet} sq ft
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-xl font-bold">
                  ${selectedProperty.price.toLocaleString()}
                </p>
                <Button onClick={handleViewDetails}>View Details</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
