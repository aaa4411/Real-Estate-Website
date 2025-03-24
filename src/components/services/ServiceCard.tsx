import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Star, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  priceUnit: string; // "per hour", "per visit", "per sqm"
  imageUrl: string;
  category: string; // "cleaning", "maintenance", "moving", etc.
  provider: {
    id: string;
    name: string;
    rating: number;
    verified: boolean;
  };
  estimatedTime?: string;
  location?: string;
  availability?: string[];
  tags: string[];
}

interface ServiceCardProps {
  service: Service;
  onBook?: (serviceId: string) => void;
  direction?: "rtl" | "ltr";
}

export default function ServiceCard({
  service = {
    id: "1",
    title: "Professional Home Cleaning",
    description:
      "Complete home cleaning service with professional equipment and eco-friendly products",
    price: 250,
    priceUnit: "per hour",
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    category: "cleaning",
    provider: {
      id: "p1",
      name: "CleanPro Services",
      rating: 4.8,
      verified: true,
    },
    estimatedTime: "3-4 hours",
    location: "Cairo",
    availability: ["Mon-Fri: 9am-5pm", "Sat: 10am-2pm"],
    tags: ["cleaning", "home", "professional"],
  },
  onBook,
  direction = "ltr",
}: ServiceCardProps) {
  const { isAuthenticated } = useAuth();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBook = () => {
    if (!isAuthenticated) {
      toast({
        title:
          direction === "rtl" ? "يجب تسجيل الدخول" : "Authentication required",
        description:
          direction === "rtl"
            ? "يرجى تسجيل الدخول لحجز الخدمات"
            : "Please sign in to book services",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, this would open a booking modal
    // For now, we'll just call the onBook callback if provided
    if (onBook) {
      onBook(service.id);
    }

    toast({
      title: direction === "rtl" ? "تم بدء الحجز" : "Booking initiated",
      description:
        direction === "rtl"
          ? "تم بدء عملية حجز الخدمة"
          : "Service booking process initiated",
    });
  };

  const formatPrice = (price: number, unit: string) => {
    if (direction === "rtl") {
      const unitTranslation =
        {
          "per hour": "في الساعة",
          "per visit": "للزيارة",
          "per sqm": "للمتر المربع",
        }[unit] || unit;

      return `${price.toLocaleString()} ج.م ${unitTranslation}`;
    }

    return `EGP ${price.toLocaleString()} ${unit}`;
  };

  const getCategoryLabel = (category: string) => {
    if (direction === "rtl") {
      const categoryTranslation =
        {
          cleaning: "تنظيف",
          maintenance: "صيانة",
          moving: "نقل أثاث",
          painting: "دهان",
          plumbing: "سباكة",
          electrical: "كهرباء",
        }[category] || category;

      return categoryTranslation;
    }

    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <Card
      className="overflow-hidden h-full transition-all hover:shadow-lg bg-white"
      dir={direction}
    >
      <div className="relative">
        <Link to={`/services/${service.id}`}>
          <img
            src={service.imageUrl}
            alt={service.title}
            className="h-48 w-full object-cover"
          />
        </Link>
        <div className="absolute top-2 left-2">
          <Badge className="bg-primary text-white">
            {getCategoryLabel(service.category)}
          </Badge>
        </div>
        {service.provider.verified && (
          <div className="absolute top-2 right-2">
            <Badge
              variant="outline"
              className="bg-white text-primary border-primary"
            >
              {direction === "rtl" ? "مزود معتمد" : "Verified Provider"}
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <Link to={`/services/${service.id}`} className="no-underline">
          <h3 className="font-semibold text-lg text-gray-900 mb-1 hover:text-primary transition-colors">
            {service.title}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {service.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">
              {service.provider.rating}
            </span>
          </div>
          <p className="text-primary font-bold text-lg">
            {formatPrice(service.price, service.priceUnit)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
          {service.estimatedTime && (
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{service.estimatedTime}</span>
            </div>
          )}
          {service.location && (
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{service.location}</span>
            </div>
          )}
          {service.availability && service.availability.length > 0 && (
            <div className="flex items-center col-span-2 mt-1">
              <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">{service.availability[0]}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t border-gray-100">
        <Button className="w-full" onClick={handleBook}>
          {direction === "rtl" ? "احجز الآن" : "Book Now"}
        </Button>
      </CardFooter>
    </Card>
  );
}
