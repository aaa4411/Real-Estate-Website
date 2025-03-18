import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import PropertyCard from "@/components/properties/PropertyCard";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";

interface FavoriteProperty {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
  property: {
    id: string;
    title: string;
    address: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    imageUrl: string;
  };
}

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      try {
        setLoading(true);
        // In a real app, this would fetch from a favorites table with a join to properties
        // For this demo, we'll simulate with local data

        // This is a placeholder for the actual Supabase query
        // const { data, error } = await supabase
        //   .from('favorites')
        //   .select('*, property:properties(*)')
        //   .eq('user_id', user.id);

        // if (error) throw error;

        // Simulate data from the properties we already have
        // In a real app, this would come from the database
        const mockFavorites = [
          {
            id: "fav1",
            user_id: user.id,
            property_id: "1",
            created_at: new Date().toISOString(),
            property: {
              id: "1",
              title: "Modern Luxury Villa",
              address: "123 Palm Avenue, Miami, FL",
              price: 1250000,
              bedrooms: 4,
              bathrooms: 3.5,
              squareFeet: 2800,
              imageUrl:
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            },
          },
          {
            id: "fav2",
            user_id: user.id,
            property_id: "2",
            created_at: new Date().toISOString(),
            property: {
              id: "2",
              title: "Downtown Penthouse",
              address: "456 Skyline Blvd, New York, NY",
              price: 2100000,
              bedrooms: 3,
              bathrooms: 2,
              squareFeet: 1950,
              imageUrl:
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
            },
          },
        ];

        setFavorites(mockFavorites);
      } catch (err: any) {
        console.error("Error fetching favorites:", err);
        setError(err.message || "Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const removeFavorite = async (favoriteId: string) => {
    try {
      // In a real app, this would delete from the favorites table
      // await supabase.from('favorites').delete().eq('id', favoriteId);

      // For this demo, we'll just update the UI
      setFavorites(favorites.filter((fav) => fav.id !== favoriteId));
    } catch (err: any) {
      console.error("Error removing favorite:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Saved Properties</h1>
          <p className="text-gray-600 mt-2">
            {favorites.length}{" "}
            {favorites.length === 1 ? "property" : "properties"} saved
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {favorites.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No saved properties yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start browsing and save properties you're interested in
          </p>
          <Button onClick={() => (window.location.href = "/properties")}>
            Browse Properties
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="relative">
              <PropertyCard property={favorite.property} />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-4 right-4 bg-white hover:bg-red-50 border-gray-200 hover:border-red-200 text-red-500 hover:text-red-600 z-10"
                onClick={() => removeFavorite(favorite.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
