import { MapPin } from "lucide-react";
import { Property } from "./PropertyCard";

interface PropertyLocationProps {
  property: Property;
}

export default function PropertyLocation({ property }: PropertyLocationProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Property Location</h3>

      <div className="flex items-start mb-4">
        <MapPin className="h-5 w-5 text-primary mt-1 mr-2" />
        <div>
          <p className="font-medium">{property.address}</p>
          <p className="text-sm text-gray-500">
            Neighborhood: Central District
          </p>
        </div>
      </div>

      <div className="h-[300px] bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
        {/* This would be replaced with an actual map component in a real implementation */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1577086664693-894d8405334a?w=1200&q=80')`,
            filter: "brightness(0.9)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-3 rounded-full shadow-lg">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-medium mb-2">Nearby Amenities</h4>
          <ul className="text-sm space-y-1">
            <li>Schools: 0.5 miles</li>
            <li>Shopping: 0.8 miles</li>
            <li>Parks: 0.3 miles</li>
            <li>Restaurants: 0.7 miles</li>
          </ul>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-medium mb-2">Transportation</h4>
          <ul className="text-sm space-y-1">
            <li>Bus Stop: 0.2 miles</li>
            <li>Train Station: 1.2 miles</li>
            <li>Airport: 12 miles</li>
            <li>Highway Access: 1.5 miles</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
