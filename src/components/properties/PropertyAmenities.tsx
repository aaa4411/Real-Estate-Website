import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropertyAmenitiesProps {
  amenities?: string[];
}

export default function PropertyAmenities({
  amenities = [
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
}: PropertyAmenitiesProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Property Amenities</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center">
            <Check className="h-5 w-5 mr-2 text-primary" />
            <span>{amenity}</span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-medium mb-3">Property Tags</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Family Friendly</Badge>
          <Badge variant="outline">Near Schools</Badge>
          <Badge variant="outline">Quiet Neighborhood</Badge>
          <Badge variant="outline">Recently Renovated</Badge>
          <Badge variant="outline">Energy Efficient</Badge>
          <Badge variant="outline">Smart Home</Badge>
        </div>
      </div>
    </div>
  );
}
