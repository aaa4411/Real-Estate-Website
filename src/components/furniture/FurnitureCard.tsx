import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Eye, ShoppingCart, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

export interface Furniture {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice?: number;
  imageUrl: string;
  category: string;
  brand: string;
  inStock: boolean;
  rating: number;
  tags: string[];
}

interface FurnitureCardProps {
  furniture: Furniture;
  onAddToCart?: (furnitureId: string) => void;
  showViewButton?: boolean;
  direction?: "rtl" | "ltr";
}

export default function FurnitureCard({
  furniture = {
    id: "1",
    title: "Modern Sofa Set",
    description: "Elegant 3-seater sofa with premium fabric",
    price: 12000,
    discountedPrice: 9999,
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    category: "Living Room",
    brand: "Home Comfort",
    inStock: true,
    rating: 4.5,
    tags: ["sofa", "modern", "fabric"],
  },
  onAddToCart,
  showViewButton = true,
  direction = "ltr",
}: FurnitureCardProps) {
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast({
        title:
          direction === "rtl" ? "يجب تسجيل الدخول" : "Authentication required",
        description:
          direction === "rtl"
            ? "يرجى تسجيل الدخول لحفظ المنتجات"
            : "Please sign in to save products",
        variant: "destructive",
      });
      return;
    }

    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite
        ? direction === "rtl"
          ? "تمت إزالة المنتج"
          : "Product removed"
        : direction === "rtl"
          ? "تم حفظ المنتج"
          : "Product saved",
      description: isFavorite
        ? direction === "rtl"
          ? "تمت إزالة المنتج من المفضلة"
          : "Product removed from your favorites"
        : direction === "rtl"
          ? "تمت إضافة المنتج إلى المفضلة"
          : "Product added to your favorites",
    });
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(furniture.id);
    }

    toast({
      title: direction === "rtl" ? "تمت الإضافة إلى السلة" : "Added to cart",
      description:
        direction === "rtl"
          ? "تمت إضافة المنتج إلى سلة التسوق"
          : "Product added to your shopping cart",
    });
  };

  const discountPercentage = furniture.discountedPrice
    ? Math.round(
        ((furniture.price - furniture.discountedPrice) / furniture.price) * 100,
      )
    : 0;

  return (
    <Card
      className="overflow-hidden h-full transition-all hover:shadow-lg bg-white"
      dir={direction}
    >
      <div className="relative">
        <Link to={`/furniture/${furniture.id}`}>
          <img
            src={furniture.imageUrl}
            alt={furniture.title}
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
            className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`}
          />
        </Button>
        {furniture.discountedPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
            <Tag className="h-3 w-3 mr-1" />
            {discountPercentage}% {direction === "rtl" ? "خصم" : "OFF"}
          </div>
        )}
        {!furniture.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge
              variant="outline"
              className="bg-white text-black font-semibold"
            >
              {direction === "rtl" ? "غير متوفر" : "Out of Stock"}
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="mb-1">
          <Badge variant="secondary" className="text-xs">
            {direction === "rtl" ? furniture.category : furniture.category}
          </Badge>
        </div>
        <Link to={`/furniture/${furniture.id}`} className="no-underline">
          <h3 className="font-semibold text-lg text-gray-900 mb-1 hover:text-primary transition-colors">
            {furniture.title}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">
          {furniture.description}
        </p>
        <div className="flex items-center gap-2">
          {furniture.discountedPrice ? (
            <>
              <p className="text-primary font-bold text-xl">
                {direction === "rtl"
                  ? `${furniture.discountedPrice.toLocaleString()} ج.م`
                  : `EGP ${furniture.discountedPrice.toLocaleString()}`}
              </p>
              <p className="text-gray-400 text-sm line-through">
                {direction === "rtl"
                  ? `${furniture.price.toLocaleString()} ج.م`
                  : `EGP ${furniture.price.toLocaleString()}`}
              </p>
            </>
          ) : (
            <p className="text-primary font-bold text-xl">
              {direction === "rtl"
                ? `${furniture.price.toLocaleString()} ج.م`
                : `EGP ${furniture.price.toLocaleString()}`}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t border-gray-100 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 mr-2"
          onClick={handleAddToCart}
          disabled={!furniture.inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          <span>{direction === "rtl" ? "أضف للسلة" : "Add to Cart"}</span>
        </Button>
        {showViewButton && (
          <Button variant="ghost" size="sm" className="flex-1" asChild>
            <Link to={`/furniture/${furniture.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              <span>{direction === "rtl" ? "عرض" : "View"}</span>
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
