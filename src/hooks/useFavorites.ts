import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

interface Favorite {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
}

// Local storage key for favorites
const FAVORITES_STORAGE_KEY = "dreamhome_favorites";

const isUsingMock = () => {
  return (
    import.meta.env.VITE_SUPABASE_URL ===
      "https://your-project-url.supabase.co" ||
    import.meta.env.VITE_SUPABASE_URL ===
      "https://placeholder-project.supabase.co"
  );
};

export function useFavorites() {
  const { user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        setLoading(true);

        // If using mock data or localStorage is available, use that
        if (isUsingMock()) {
          // Try to get favorites from localStorage first
          const storedFavorites = localStorage.getItem(
            `${FAVORITES_STORAGE_KEY}_${user.id}`,
          );
          if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
            return;
          }

          // Fallback to demo data
          const demoFavorites = ["1", "2"];
          setFavorites(demoFavorites);
          localStorage.setItem(
            `${FAVORITES_STORAGE_KEY}_${user.id}`,
            JSON.stringify(demoFavorites),
          );
          return;
        }

        // If we're here, we're using real Supabase
        const { data, error } = await supabase
          .from("favorites")
          .select("property_id")
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching favorites from Supabase:", error);
          toast({
            title: "Error loading favorites",
            description: error.message,
            variant: "destructive",
          });
          return;
        }

        if (data) {
          const propertyIds = data.map((item) => item.property_id);
          setFavorites(propertyIds);

          // Also update localStorage as a cache
          localStorage.setItem(
            `${FAVORITES_STORAGE_KEY}_${user.id}`,
            JSON.stringify(propertyIds),
          );
        }
      } catch (err) {
        console.error("Error fetching favorites:", err);
        toast({
          title: "Error loading favorites",
          description:
            (err as Error).message || "Failed to load your saved properties",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user, isAuthenticated]);

  const addFavorite = async (propertyId: string) => {
    if (!isAuthenticated || !user) return false;

    try {
      setLoading(true);
      const newFavorites = [...favorites, propertyId];

      // Update localStorage
      localStorage.setItem(
        `${FAVORITES_STORAGE_KEY}_${user.id}`,
        JSON.stringify(newFavorites),
      );

      // If using real Supabase, update the database
      if (!isUsingMock()) {
        const { error } = await supabase.from("favorites").insert({
          user_id: user.id,
          property_id: propertyId,
        });

        if (error) {
          console.error("Error adding favorite to Supabase:", error);
          toast({
            title: "Error saving property",
            description: error.message,
            variant: "destructive",
          });
          return false;
        }
      }

      // Update state
      setFavorites(newFavorites);
      return true;
    } catch (err) {
      console.error("Error adding favorite:", err);
      toast({
        title: "Error saving property",
        description: (err as Error).message || "Failed to save property",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (propertyId: string) => {
    if (!isAuthenticated || !user) return false;

    try {
      setLoading(true);
      const newFavorites = favorites.filter((id) => id !== propertyId);

      // Update localStorage
      localStorage.setItem(
        `${FAVORITES_STORAGE_KEY}_${user.id}`,
        JSON.stringify(newFavorites),
      );

      // If using real Supabase, update the database
      if (!isUsingMock()) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("property_id", propertyId);

        if (error) {
          console.error("Error removing favorite from Supabase:", error);
          toast({
            title: "Error removing property",
            description: error.message,
            variant: "destructive",
          });
          return false;
        }
      }

      // Update state
      setFavorites(newFavorites);
      return true;
    } catch (err) {
      console.error("Error removing favorite:", err);
      toast({
        title: "Error removing property",
        description: (err as Error).message || "Failed to remove property",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (propertyId: string) => {
    if (isFavorite(propertyId)) {
      return await removeFavorite(propertyId);
    } else {
      return await addFavorite(propertyId);
    }
  };

  const isFavorite = (propertyId: string) => {
    return favorites.includes(propertyId);
  };

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
}
