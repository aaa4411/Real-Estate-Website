import React, { useState, useEffect } from "react";
import { Search, Mic, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface ArabicSearchBarProps {
  onSearch?: (filters: ArabicSearchFilters) => void;
  className?: string;
  initialValues?: Partial<ArabicSearchFilters>;
  direction?: "rtl" | "ltr";
}

export interface ArabicSearchFilters {
  query: string;
  location: string;
  priceRange: string;
  propertyType: string;
  naturalLanguageQuery?: string;
}

const ArabicSearchBar = ({
  onSearch,
  className = "",
  initialValues = {},
  direction = "rtl",
}: ArabicSearchBarProps) => {
  const [query, setQuery] = useState(initialValues.query || "");
  const [location, setLocation] = useState(initialValues.location || "");
  const [priceRange, setPriceRange] = useState(
    initialValues.priceRange || "any",
  );
  const [propertyType, setPropertyType] = useState(
    initialValues.propertyType || "any",
  );
  const [isRecording, setIsRecording] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [naturalLanguageQuery, setNaturalLanguageQuery] = useState(
    initialValues.naturalLanguageQuery || "",
  );

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const handleSearch = () => {
    if (onSearch) {
      const filters: ArabicSearchFilters = {
        query,
        location,
        priceRange,
        propertyType,
        naturalLanguageQuery: naturalLanguageQuery || undefined,
      };

      onSearch(filters);

      // Save search to recent searches
      if (query) {
        const updatedSearches = [
          query,
          ...recentSearches.filter((s) => s !== query).slice(0, 4),
        ];
        setRecentSearches(updatedSearches);
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      }
    }
  };

  const handleVoiceSearch = () => {
    // In a real implementation, this would use the Web Speech API
    setIsRecording(!isRecording);

    if (isRecording) {
      // Simulate end of recording with a sample Arabic query
      setTimeout(() => {
        const sampleArabicQuery =
          "عايز شقة ٢ غرف في التجمع الخامس بميزانية ٥٠٠٠ جنيه";
        setNaturalLanguageQuery(sampleArabicQuery);
        setQuery(sampleArabicQuery);
        setIsRecording(false);

        // In a real app, this would trigger NLP processing
        // For demo, we'll simulate extracting structured data
        setLocation("التجمع الخامس");
        setPriceRange("0-5000");
        setPropertyType("apartment");
      }, 2000);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setNaturalLanguageQuery("");
  };

  const selectRecentSearch = (search: string) => {
    setQuery(search);
    setShowRecentSearches(false);
  };

  return (
    <div
      className={`w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 ${className}`}
      dir={direction}
    >
      <div className="mb-4">
        <div className="relative">
          <Input
            placeholder={
              direction === "rtl"
                ? "ابحث عن عقارات..."
                : "Search for properties..."
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowRecentSearches(true)}
            className={`w-full ${direction === "rtl" ? "text-right pr-4 pl-12" : "text-left pl-4 pr-12"}`}
          />
          <div
            className={`absolute ${direction === "rtl" ? "left-2" : "right-2"} top-1/2 -translate-y-1/2 flex items-center gap-1`}
          >
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${isRecording ? "text-red-500" : ""}`}
              onClick={handleVoiceSearch}
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>

          {showRecentSearches && recentSearches.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
              <div className="p-2">
                <h3
                  className={`text-sm font-medium mb-1 ${direction === "rtl" ? "text-right" : "text-left"}`}
                >
                  {direction === "rtl"
                    ? "عمليات البحث الأخيرة"
                    : "Recent Searches"}
                </h3>
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className={`p-2 hover:bg-gray-100 cursor-pointer rounded-md ${direction === "rtl" ? "text-right" : "text-left"}`}
                    onClick={() => selectRecentSearch(search)}
                  >
                    <span className="text-sm">{search}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {naturalLanguageQuery && (
          <div className="mt-2">
            <Badge
              variant="outline"
              className="text-primary border-primary/30 bg-primary/10"
            >
              {direction === "rtl" ? "استعلام ذكي" : "AI Query"}:{" "}
              {naturalLanguageQuery}
            </Badge>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="sm:col-span-1">
          <label
            htmlFor="location"
            className={`block text-sm font-medium text-gray-700 mb-1 ${direction === "rtl" ? "text-right" : "text-left"}`}
          >
            {direction === "rtl" ? "الموقع" : "Location"}
          </label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger id="location" className="w-full">
              <SelectValue
                placeholder={direction === "rtl" ? "أي موقع" : "Any location"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">
                {direction === "rtl" ? "أي موقع" : "Any location"}
              </SelectItem>
              <SelectItem value="التجمع الخامس">التجمع الخامس</SelectItem>
              <SelectItem value="مدينة نصر">مدينة نصر</SelectItem>
              <SelectItem value="المعادي">المعادي</SelectItem>
              <SelectItem value="6 أكتوبر">6 أكتوبر</SelectItem>
              <SelectItem value="الشيخ زايد">الشيخ زايد</SelectItem>
              <SelectItem value="المهندسين">المهندسين</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="price-range"
            className={`block text-sm font-medium text-gray-700 mb-1 ${direction === "rtl" ? "text-right" : "text-left"}`}
          >
            {direction === "rtl" ? "نطاق السعر" : "Price Range"}
          </label>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger id="price-range" className="w-full">
              <SelectValue
                placeholder={direction === "rtl" ? "أي سعر" : "Any price"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">
                {direction === "rtl" ? "أي سعر" : "Any price"}
              </SelectItem>
              <SelectItem value="0-5000">
                {direction === "rtl" ? "٠ - ٥٠٠٠ جنيه" : "0 - 5,000 EGP"}
              </SelectItem>
              <SelectItem value="5000-10000">
                {direction === "rtl"
                  ? "٥٠٠٠ - ١٠٠٠٠ جنيه"
                  : "5,000 - 10,000 EGP"}
              </SelectItem>
              <SelectItem value="10000-15000">
                {direction === "rtl"
                  ? "١٠٠٠٠ - ١٥٠٠٠ جنيه"
                  : "10,000 - 15,000 EGP"}
              </SelectItem>
              <SelectItem value="15000-20000">
                {direction === "rtl"
                  ? "١٥٠٠٠ - ٢٠٠٠٠ جنيه"
                  : "15,000 - 20,000 EGP"}
              </SelectItem>
              <SelectItem value="20000+">
                {direction === "rtl" ? "أكثر من ٢٠٠٠٠ جنيه" : "20,000+ EGP"}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="property-type"
            className={`block text-sm font-medium text-gray-700 mb-1 ${direction === "rtl" ? "text-right" : "text-left"}`}
          >
            {direction === "rtl" ? "نوع العقار" : "Property Type"}
          </label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger id="property-type" className="w-full">
              <SelectValue
                placeholder={direction === "rtl" ? "أي نوع" : "Any type"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">
                {direction === "rtl" ? "أي نوع" : "Any type"}
              </SelectItem>
              <SelectItem value="apartment">
                {direction === "rtl" ? "شقة" : "Apartment"}
              </SelectItem>
              <SelectItem value="house">
                {direction === "rtl" ? "منزل" : "House"}
              </SelectItem>
              <SelectItem value="villa">
                {direction === "rtl" ? "فيلا" : "Villa"}
              </SelectItem>
              <SelectItem value="office">
                {direction === "rtl" ? "مكتب" : "Office"}
              </SelectItem>
              <SelectItem value="land">
                {direction === "rtl" ? "أرض" : "Land"}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="sm:col-span-1 flex items-end">
          <Button
            onClick={handleSearch}
            className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 h-10"
          >
            <Search className="h-4 w-4" />
            <span>{direction === "rtl" ? "بحث" : "Search"}</span>
          </Button>
        </div>
      </div>

      {isRecording && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center justify-between">
          <div className="flex items-center">
            <div className="animate-pulse h-3 w-3 bg-red-500 rounded-full mr-2"></div>
            <p className="text-sm text-red-700">
              {direction === "rtl"
                ? "جاري التسجيل... تحدث الآن"
                : "Recording... Speak now"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsRecording(false)}
          >
            {direction === "rtl" ? "إلغاء" : "Cancel"}
          </Button>
        </div>
      )}

      <div className="mt-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              {direction === "rtl" ? "نصائح البحث الذكي" : "AI Search Tips"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <h4 className="font-medium mb-2">
              {direction === "rtl"
                ? "كيفية استخدام البحث الذكي"
                : "How to use AI Search"}
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              {direction === "rtl"
                ? "يمكنك البحث باللغة العربية الطبيعية مثل:"
                : "You can search using natural Arabic language like:"}
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• عايز شقة ٢ غرف في التجمع الخامس بميزانية ٥٠٠٠ جنيه</li>
              <li>• فيلا للبيع في الشيخ زايد قريبة من المدارس</li>
              <li>• شقة مفروشة للإيجار في مدينة نصر</li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ArabicSearchBar;
