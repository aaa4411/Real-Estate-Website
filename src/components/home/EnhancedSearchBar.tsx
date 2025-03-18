import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  X,
  ChevronDown,
  ChevronUp,
  Save,
  History,
  Filter,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { cn } from "@/lib/utils";

export interface EnhancedSearchFilters {
  location: string;
  priceRange: [number, number];
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  squareFootage: [number, number];
  amenities: string[];
  yearBuilt: [number, number];
  sortBy: string;
}

interface EnhancedSearchBarProps {
  onSearch?: (filters: EnhancedSearchFilters) => void;
  className?: string;
  initialValues?: Partial<EnhancedSearchFilters>;
  showSavedSearches?: boolean;
  showRecentSearches?: boolean;
  locationSuggestions?: string[];
}

const defaultPriceRange: [number, number] = [0, 2000000];
const defaultSquareFootage: [number, number] = [0, 5000];
const defaultYearBuilt: [number, number] = [1900, new Date().getFullYear()];

const amenitiesOptions = [
  "Swimming Pool",
  "Garage",
  "Garden",
  "Balcony",
  "Air Conditioning",
  "Fireplace",
  "Gym",
  "Elevator",
  "Security System",
  "Waterfront",
];

const EnhancedSearchBar = ({
  onSearch,
  className = "",
  initialValues = {},
  showSavedSearches = true,
  showRecentSearches = true,
  locationSuggestions = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Miami, FL",
    "San Francisco, CA",
    "Seattle, WA",
    "Boston, MA",
    "Austin, TX",
    "Denver, CO",
  ],
}: EnhancedSearchBarProps) => {
  // State for search filters
  const [location, setLocation] = useState(initialValues.location || "");
  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialValues.priceRange || defaultPriceRange,
  );
  const [propertyType, setPropertyType] = useState(
    initialValues.propertyType || "any",
  );
  const [bedrooms, setBedrooms] = useState(initialValues.bedrooms || "any");
  const [bathrooms, setBathrooms] = useState(initialValues.bathrooms || "any");
  const [squareFootage, setSquareFootage] = useState<[number, number]>(
    initialValues.squareFootage || defaultSquareFootage,
  );
  const [amenities, setAmenities] = useState<string[]>(
    initialValues.amenities || [],
  );
  const [yearBuilt, setYearBuilt] = useState<[number, number]>(
    initialValues.yearBuilt || defaultYearBuilt,
  );
  const [sortBy, setSortBy] = useState(initialValues.sortBy || "newest");

  // UI state
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [savedSearches, setSavedSearches] = useState<
    { name: string; filters: EnhancedSearchFilters }[]
  >([]);
  const [recentSearches, setRecentSearches] = useState<EnhancedSearchFilters[]>(
    [],
  );
  const [searchName, setSearchName] = useState("");
  const [isSavePopoverOpen, setIsSavePopoverOpen] = useState(false);

  const locationInputRef = useRef<HTMLInputElement>(null);

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (location) count++;
    if (
      priceRange[0] > defaultPriceRange[0] ||
      priceRange[1] < defaultPriceRange[1]
    )
      count++;
    if (propertyType !== "any") count++;
    if (bedrooms !== "any") count++;
    if (bathrooms !== "any") count++;
    if (
      squareFootage[0] > defaultSquareFootage[0] ||
      squareFootage[1] < defaultSquareFootage[1]
    )
      count++;
    if (amenities.length > 0) count++;
    if (
      yearBuilt[0] > defaultYearBuilt[0] ||
      yearBuilt[1] < defaultYearBuilt[1]
    )
      count++;
    if (sortBy !== "newest") count++;

    setActiveFiltersCount(count);
  }, [
    location,
    priceRange,
    propertyType,
    bedrooms,
    bathrooms,
    squareFootage,
    amenities,
    yearBuilt,
    sortBy,
  ]);

  // Filter location suggestions based on input
  useEffect(() => {
    if (location.trim() === "") {
      setFilteredSuggestions([]);
      return;
    }

    const filtered = locationSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(location.toLowerCase()),
    );
    setFilteredSuggestions(filtered);
  }, [location, locationSuggestions]);

  // Load saved searches from localStorage on component mount
  useEffect(() => {
    const savedSearchesFromStorage = localStorage.getItem("savedSearches");
    if (savedSearchesFromStorage) {
      try {
        setSavedSearches(JSON.parse(savedSearchesFromStorage));
      } catch (e) {
        console.error("Error parsing saved searches", e);
      }
    }

    const recentSearchesFromStorage = localStorage.getItem("recentSearches");
    if (recentSearchesFromStorage) {
      try {
        setRecentSearches(JSON.parse(recentSearchesFromStorage));
      } catch (e) {
        console.error("Error parsing recent searches", e);
      }
    }
  }, []);

  // Handle search submission
  const handleSearch = () => {
    const filters: EnhancedSearchFilters = {
      location,
      priceRange,
      propertyType,
      bedrooms,
      bathrooms,
      squareFootage,
      amenities,
      yearBuilt,
      sortBy,
    };

    // Add to recent searches
    const updatedRecentSearches = [filters, ...recentSearches.slice(0, 4)];
    setRecentSearches(updatedRecentSearches);
    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updatedRecentSearches),
    );

    if (onSearch) {
      onSearch(filters);
    }
  };

  // Save current search
  const saveSearch = () => {
    if (!searchName.trim()) return;

    const newSearch = {
      name: searchName,
      filters: {
        location,
        priceRange,
        propertyType,
        bedrooms,
        bathrooms,
        squareFootage,
        amenities,
        yearBuilt,
        sortBy,
      },
    };

    const updatedSavedSearches = [newSearch, ...savedSearches];
    setSavedSearches(updatedSavedSearches);
    localStorage.setItem("savedSearches", JSON.stringify(updatedSavedSearches));

    setSearchName("");
    setIsSavePopoverOpen(false);
  };

  // Apply a saved search
  const applySavedSearch = (filters: EnhancedSearchFilters) => {
    setLocation(filters.location);
    setPriceRange(filters.priceRange);
    setPropertyType(filters.propertyType);
    setBedrooms(filters.bedrooms);
    setBathrooms(filters.bathrooms);
    setSquareFootage(filters.squareFootage);
    setAmenities(filters.amenities);
    setYearBuilt(filters.yearBuilt);
    setSortBy(filters.sortBy);

    if (onSearch) {
      onSearch(filters);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setLocation("");
    setPriceRange(defaultPriceRange);
    setPropertyType("any");
    setBedrooms("any");
    setBathrooms("any");
    setSquareFootage(defaultSquareFootage);
    setAmenities([]);
    setYearBuilt(defaultYearBuilt);
    setSortBy("newest");
  };

  // Format price for display
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  return (
    <div
      className={cn(
        "w-full bg-white rounded-lg shadow-lg p-4 sm:p-6",
        className,
      )}
    >
      {/* Basic Search Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Location Input with Suggestions */}
        <div className="sm:col-span-1 lg:col-span-2">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Location
          </label>
          <div className="relative">
            <Input
              id="location"
              ref={locationInputRef}
              placeholder="City, neighborhood, or ZIP"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setShowLocationSuggestions(true);
              }}
              onFocus={() => setShowLocationSuggestions(true)}
              onBlur={() => {
                // Delay hiding suggestions to allow for clicks
                setTimeout(() => setShowLocationSuggestions(false), 200);
              }}
              className="w-full pr-8"
            />
            {location && (
              <button
                type="button"
                onClick={() => setLocation("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            {showLocationSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onMouseDown={() => {
                      setLocation(suggestion);
                      setShowLocationSuggestions(false);
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Price Range */}
        <div className="sm:col-span-1">
          <label
            htmlFor="price-range"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price Range
          </label>
          <Select
            value={`${priceRange[0]}-${priceRange[1]}`}
            onValueChange={(value) => {
              const [min, max] = value.split("-").map(Number);
              setPriceRange([min, max]);
            }}
          >
            <SelectTrigger id="price-range" className="w-full">
              <SelectValue placeholder="Any price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value={`${defaultPriceRange[0]}-${defaultPriceRange[1]}`}
              >
                Any price
              </SelectItem>
              <SelectItem value="0-250000">Under $250,000</SelectItem>
              <SelectItem value="250000-500000">$250,000 - $500,000</SelectItem>
              <SelectItem value="500000-750000">$500,000 - $750,000</SelectItem>
              <SelectItem value="750000-1000000">
                $750,000 - $1,000,000
              </SelectItem>
              <SelectItem value="1000000-2000000">
                $1,000,000 - $2,000,000
              </SelectItem>
              <SelectItem value="2000000-5000000">$2,000,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Type */}
        <div className="sm:col-span-1">
          <label
            htmlFor="property-type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Property Type
          </label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger id="property-type" className="w-full">
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any type</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="land">Land</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className="sm:col-span-1 flex items-end">
          <Button
            onClick={handleSearch}
            className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 h-10"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </Button>
        </div>
      </div>

      {/* Advanced Search Toggle */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <CollapsibleTrigger
            onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
            className="flex items-center text-sm text-primary hover:text-primary/80 font-medium"
          >
            {isAdvancedSearch ? (
              <ChevronUp className="h-4 w-4 mr-1" />
            ) : (
              <ChevronDown className="h-4 w-4 mr-1" />
            )}
            {isAdvancedSearch ? "Hide" : "Show"} Advanced Filters
          </CollapsibleTrigger>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}{" "}
              {activeFiltersCount === 1 ? "filter" : "filters"} active
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Save Search Button */}
          {showSavedSearches && (
            <Popover
              open={isSavePopoverOpen}
              onOpenChange={setIsSavePopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <Save className="h-3.5 w-3.5 mr-1" />
                  Save
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <h3 className="font-medium mb-2">Save this search</h3>
                <div className="space-y-2">
                  <Input
                    placeholder="Name your search"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsSavePopoverOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button size="sm" onClick={saveSearch}>
                      Save Search
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Recent Searches */}
          {showRecentSearches && recentSearches.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <History className="h-3.5 w-3.5 mr-1" />
                  Recent
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-2">
                  <h3 className="font-medium px-2 py-1">Recent Searches</h3>
                  <div className="max-h-60 overflow-auto">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded-md text-sm flex items-start"
                        onClick={() => applySavedSearch(search)}
                      >
                        <div>
                          <div className="font-medium">
                            {search.location || "Any location"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {search.propertyType !== "any"
                              ? search.propertyType.charAt(0).toUpperCase() +
                                search.propertyType.slice(1)
                              : "Any type"}{" "}
                            •{" "}
                            {search.bedrooms !== "any"
                              ? `${search.bedrooms} bed`
                              : "Any bed"}{" "}
                            • {formatPrice(search.priceRange[0])} -{" "}
                            {formatPrice(search.priceRange[1])}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Saved Searches */}
          {showSavedSearches && savedSearches.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <Filter className="h-3.5 w-3.5 mr-1" />
                  Saved
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-2">
                  <h3 className="font-medium px-2 py-1">Saved Searches</h3>
                  <div className="max-h-60 overflow-auto">
                    {savedSearches.map((search, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded-md text-sm flex items-start justify-between"
                        onClick={() => applySavedSearch(search.filters)}
                      >
                        <div>
                          <div className="font-medium">{search.name}</div>
                          <div className="text-xs text-gray-500">
                            {search.filters.location || "Any location"} •{" "}
                            {search.filters.propertyType !== "any"
                              ? search.filters.propertyType
                                  .charAt(0)
                                  .toUpperCase() +
                                search.filters.propertyType.slice(1)
                              : "Any type"}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Reset Filters */}
          {activeFiltersCount > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="h-8 px-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear all filters</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      {/* Advanced Search Options */}
      <Collapsible open={isAdvancedSearch} className="mt-4">
        <CollapsibleContent>
          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bedrooms
                </label>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bathrooms
                </label>
                <Select value={bathrooms} onValueChange={setBathrooms}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Newest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">
                      Price (Low to High)
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Price (High to Low)
                    </SelectItem>
                    <SelectItem value="sqft-asc">
                      Square Feet (Low to High)
                    </SelectItem>
                    <SelectItem value="sqft-desc">
                      Square Feet (High to Low)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Year Built */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year Built
                </label>
                <Select
                  value={`${yearBuilt[0]}-${yearBuilt[1]}`}
                  onValueChange={(value) => {
                    const [min, max] = value.split("-").map(Number);
                    setYearBuilt([min, max]);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value={`${defaultYearBuilt[0]}-${defaultYearBuilt[1]}`}
                    >
                      Any
                    </SelectItem>
                    <SelectItem
                      value={`${new Date().getFullYear() - 1}-${new Date().getFullYear()}`}
                    >
                      Last Year
                    </SelectItem>
                    <SelectItem
                      value={`${new Date().getFullYear() - 5}-${new Date().getFullYear()}`}
                    >
                      Last 5 Years
                    </SelectItem>
                    <SelectItem
                      value={`${new Date().getFullYear() - 10}-${new Date().getFullYear()}`}
                    >
                      Last 10 Years
                    </SelectItem>
                    <SelectItem
                      value={`${new Date().getFullYear() - 20}-${new Date().getFullYear()}`}
                    >
                      Last 20 Years
                    </SelectItem>
                    <SelectItem value={`1900-1950`}>Before 1950</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Square Footage Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Square Footage
                </label>
                <span className="text-sm text-gray-500">
                  {squareFootage[0]} - {squareFootage[1]} sq ft
                </span>
              </div>
              <Slider
                defaultValue={squareFootage}
                min={0}
                max={5000}
                step={100}
                value={squareFootage}
                onValueChange={(value) =>
                  setSquareFootage(value as [number, number])
                }
                className="my-4"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0 sq ft</span>
                <span>5,000+ sq ft</span>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {amenitiesOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${option}`}
                      checked={amenities.includes(option)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setAmenities([...amenities, option]);
                        } else {
                          setAmenities(amenities.filter((a) => a !== option));
                        }
                      }}
                    />
                    <Label
                      htmlFor={`amenity-${option}`}
                      className="text-sm cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {location && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Location: {location}
              <button
                onClick={() => setLocation("")}
                className="ml-1 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {(priceRange[0] > defaultPriceRange[0] ||
            priceRange[1] < defaultPriceRange[1]) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              <button
                onClick={() => setPriceRange(defaultPriceRange)}
                className="ml-1 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {propertyType !== "any" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Type:{" "}
              {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}
              <button
                onClick={() => setPropertyType("any")}
                className="ml-1 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {bedrooms !== "any" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Bedrooms: {bedrooms}+
              <button
                onClick={() => setBedrooms("any")}
                className="ml-1 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {bathrooms !== "any" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Bathrooms: {bathrooms}+
              <button
                onClick={() => setBathrooms("any")}
                className="ml-1 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {(squareFootage[0] > defaultSquareFootage[0] ||
            squareFootage[1] < defaultSquareFootage[1]) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Size: {squareFootage[0]} - {squareFootage[1]} sq ft
              <button
                onClick={() => setSquareFootage(defaultSquareFootage)}
                className="ml-1 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {amenities.length > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Amenities: {amenities.length}
              <button
                onClick={() => setAmenities([])}
                className="ml-1 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {(yearBuilt[0] > defaultYearBuilt[0] ||
            yearBuilt[1] < defaultYearBuilt[1]) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Year: {yearBuilt[0]} - {yearBuilt[1]}
              <button
                onClick={() => setYearBuilt(defaultYearBuilt)}
                className="ml-1 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {sortBy !== "newest" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Sort: {sortBy.includes("price") ? "Price" : "Size"} (
              {sortBy.includes("asc") ? "Low to High" : "High to Low"})
              <button
                onClick={() => setSortBy("newest")}
                className="ml-1 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchBar;
