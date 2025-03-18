import { useState } from "react";
import { Property } from "./PropertyCard";

interface PropertyGalleryProps {
  property: Property;
}

export default function PropertyGallery({ property }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Use property.images if available, otherwise create an array with the single imageUrl
  const images = property.images || [property.imageUrl];

  return (
    <div className="space-y-4">
      <div className="aspect-video overflow-hidden rounded-lg">
        <img
          src={selectedImage || images[0]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.slice(0, 4).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Property thumbnail ${index + 1}`}
            className={`h-20 w-full object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity ${selectedImage === image ? "ring-2 ring-primary" : ""}`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
}
