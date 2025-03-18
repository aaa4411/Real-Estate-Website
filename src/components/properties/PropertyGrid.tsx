import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { allProperties } from "@/data/properties";

// Define the Property interface here instead of importing it
interface Property {
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

interface PropertyGridProps {
  properties?: Property[];
  title?: string;
  showFilters?: boolean;
}

export default function PropertyGrid({
  properties = allProperties,
  title = "Featured Properties",
  showFilters = true,
}: PropertyGridProps) {
  const [filteredProperties, setFilteredProperties] =
    useState<Property[]>(properties);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [propertyType, setPropertyType] = useState<string>("all");
  const [bedrooms, setBedrooms] = useState<string>("any");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const propertiesPerPage = 6;
  const maxPrice = 3000000;

  // Filter properties based on search and filters
  useEffect(() => {
    let result = [...properties];

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (property) =>
          property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.address.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Price range filter
    result = result.filter(
      (property) =>
        property.price >= priceRange[0] && property.price <= priceRange[1],
    );

    // Property type filter (would be implemented with real data)
    if (propertyType !== "all") {
      // This is a placeholder - in a real app, properties would have a 'type' field
      // result = result.filter(property => property.type === propertyType);
    }

    // Bedrooms filter
    if (bedrooms !== "any") {
      const bedroomCount = parseInt(bedrooms);
      if (bedrooms === "4+") {
        result = result.filter((property) => property.bedrooms >= 4);
      } else {
        result = result.filter(
          (property) => property.bedrooms === bedroomCount,
        );
      }
    }

    setFilteredProperties(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [properties, searchTerm, priceRange, propertyType, bedrooms]);

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty,
  );
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="w-full bg-gray-50 py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {title}
            </h2>
            <p className="text-gray-600 mt-1 sm:mt-2">
              Showing {filteredProperties.length} properties
            </p>
          </div>

          {showFilters && (
            <div className="mt-3 md:mt-0 flex items-center space-x-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className="relative flex-shrink-0"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {showFilterPanel && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full"></span>
                )}
              </Button>
              <div className="hidden md:flex space-x-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="flex-shrink-0"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="flex-shrink-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {showFilters && showFilterPanel && (
          <Card className="mb-6 sm:mb-8">
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Price Range</h3>
                  <Slider
                    defaultValue={[0, maxPrice]}
                    min={0}
                    max={maxPrice}
                    step={50000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-4 sm:my-6"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Property Type</h3>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Bedrooms</h3>
                  <Select value={bedrooms} onValueChange={setBedrooms}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4+">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Sort By</h3>
                  <Select defaultValue="newest">
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-asc">
                        Price (Low to High)
                      </SelectItem>
                      <SelectItem value="price-desc">
                        Price (High to Low)
                      </SelectItem>
                      <SelectItem value="size-asc">
                        Size (Small to Large)
                      </SelectItem>
                      <SelectItem value="size-desc">
                        Size (Large to Small)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="all" className="mb-6 sm:mb-8 overflow-x-auto">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="all" className="text-xs sm:text-sm">
              All Properties
            </TabsTrigger>
            <TabsTrigger value="sale" className="text-xs sm:text-sm">
              For Sale
            </TabsTrigger>
            <TabsTrigger value="rent" className="text-xs sm:text-sm">
              For Rent
            </TabsTrigger>
            <TabsTrigger value="new" className="text-xs sm:text-sm">
              New Listings
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {currentProperties.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <h3 className="text-lg font-medium text-gray-900">
              No properties found
            </h3>
            <p className="mt-2 text-gray-600">
              Try adjusting your search filters
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {currentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {currentProperties.map((property) => (
              <div
                key={property.id}
                className="flex flex-col md:flex-row bg-white rounded-lg shadow overflow-hidden"
              >
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 sm:p-6 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">
                      {property.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">
                      {property.address}
                    </p>
                    <p className="text-primary font-bold text-lg sm:text-xl mb-2 sm:mb-4">
                      ${property.price.toLocaleString()}
                    </p>
                    <div className="flex flex-wrap items-center text-gray-500 text-xs sm:text-sm gap-2 sm:gap-4">
                      <span>{property.bedrooms} Beds</span>
                      <span>{property.bathrooms} Baths</span>
                      <span>{property.squareFeet} sq ft</span>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination className="mt-6 sm:mt-8 overflow-x-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) paginate(currentPage - 1);
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => {
                  // Show first page, last page, and pages around current page
                  if (
                    number === 1 ||
                    number === totalPages ||
                    (number >= currentPage - 1 && number <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={number}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            paginate(number);
                          }}
                          isActive={currentPage === number}
                        >
                          {number}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  // Show ellipsis
                  if (number === 2 && currentPage > 3) {
                    return (
                      <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  if (
                    number === totalPages - 1 &&
                    currentPage < totalPages - 2
                  ) {
                    return (
                      <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                },
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) paginate(currentPage + 1);
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}

// Export the Property interface for use in other components
export type { Property };
