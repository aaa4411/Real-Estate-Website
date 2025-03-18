import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Bed, Bath, Square } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "@/components/ui/use-toast";

export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  imageUrl: string;
  isFeatured?: boolean;
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({
  property = {
    id: "1",
    title: "Modern Luxury Villa",
    address: "123 Palm Avenue, Miami, FL",
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 2800,
    imageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    isFeatured: true,
  },
}: PropertyCardProps) {
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const favorite = isFavorite(property.id);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save properties",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }

    const success = await toggleFavorite(property.id);

    if (success) {
      toast({
        title: favorite ? "Property removed" : "Property saved",
        description: favorite
          ? "Property removed from your favorites"
          : "Property added to your favorites",
      });
    }
  };

  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-lg bg-white">
      <div className="relative">
        <Link to={`/property/${property.id}`}>
          <img
            src={property.imageUrl}
            alt={property.title}
            className="h-48 w-full object-cover"
          />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
          onClick={handleToggleFavorite}
        >
          <Heart
            className={`h-5 w-5 ${favorite ? "fill-red-500 text-red-500" : "text-gray-500"}`}
          />
        </Button>
        {property.isFeatured && (
          <div className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <Link to={`/property/${property.id}`} className="no-underline">
          <h3 className="font-semibold text-lg text-gray-900 mb-1 hover:text-primary transition-colors">
            {property.title}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-2">{property.address}</p>
        <p className="text-primary font-bold text-xl">
          ${property.price.toLocaleString()}
        </p>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t border-gray-100 flex justify-between">
        <div className="flex items-center text-gray-500 text-sm">
          <Bed className="h-4 w-4 mr-1" />
          <span className="mr-3">{property.bedrooms}</span>
          <Bath className="h-4 w-4 mr-1" />
          <span className="mr-3">{property.bathrooms}</span>
          <Square className="h-4 w-4 mr-1" />
          <span>{property.squareFeet} sq ft</span>
        </div>
      </CardFooter>
    </Card>
  );
}
