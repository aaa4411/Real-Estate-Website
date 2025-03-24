import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, TrendingDown, BarChart } from "lucide-react";

interface PricePredictionWidgetProps {
  direction?: "rtl" | "ltr";
}

export default function PricePredictionWidget({
  direction = "ltr"
}: PricePredictionWidgetProps) {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [area, setArea] = useState<number[]>([100]);
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [marketTrend, setMarketTrend] = useState<"up" | "down" | "stable" | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    if (!location || !propertyType || !bedrooms || !bathrooms) {
      return;
    }

    setIsCalculating(true);

    // Simulate API call delay
    setTimeout(() => {
      // Generate a realistic price based on inputs
      const basePrice = location === "التجمع الخامس" || location === "new-cairo" ? 1500000 : 
                       location === "مدينة نصر" || location === "nasr-city" ? 1200000 : 
                       location === "المعادي" || location === "maadi" ? 1350000 : 
                       location === "6 أكتوبر" || location === "6th-october" ? 950000 : 
                       location === "الشيخ زايد" || location === "sheikh-zayed" ? 1400000 : 1000000;
      
      const typeMultiplier = propertyType === "apartment" ? 1 : 
                            propertyType === "villa" ? 1.8 : 
                            propertyType === "duplex" ? 1.5 : 1.2;
      
      const bedroomsMultiplier = parseInt(bedrooms) * 0.15 + 1;
      const bathroomsMultiplier = parseInt(bathrooms) * 0.1 + 1;
      const areaMultiplier = area[0] / 100;
      
      const calculatedPrice = Math.round(basePrice * typeMultiplier * bedroomsMultiplier * bathroomsMultiplier * areaMultiplier);
      
      // Add some randomness
      const randomFactor = 0.9 + Math.random() * 0.2; // Between 0.9 and 1.1
      const finalPrice = Math.round(calculatedPrice * randomFactor);
      
      // Set price range (±10%)
      const lowerBound = Math.round(finalPrice * 0.9);
      const upperBound = Math.round(finalPrice * 1.1);
      
      // Random market trend
      const trends: Array<"up" | "down" | "stable"> = ["up", "down", "stable"];
      const randomTrend = trends[Math.floor(Math.random() * trends.length)];
      
      setPredictedPrice(finalPrice);
      setPriceRange([lowerBound, upperBound]);
      setMarketTrend(randomTrend);
      setIsCalculating(false);
    }, 1500);
  };

  const formatPrice = (price: number) => {
    if (direction === "rtl") {
      return `${price.toLocaleString()} ج.م`;
    }
    return `EGP ${price.toLocaleString()}`;
  };

  return (
    <Card className="w-full" dir={direction}>
      <CardHeader>
        <CardTitle className={direction === "rtl" ? "text-right" : "text-left"}>
          {direction === "rtl" ? "تقدير سعر العقار" : "Property Price Prediction"}
        </CardTitle>
        <CardDescription className={direction === "rtl" ? "text-right" : "text-left"}>
          {direction === "rtl" 
            ? "أدخل تفاصيل العقار للحصول على تقدير سعر دقيق مدعوم بالذكاء الاصطناعي" 
            : "Enter property details to get an AI-powered price estimate"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location" className={direction === "rtl" ? "text-right block" : "text-left block"}>
              {direction === "rtl" ? "الموقع" : "Location"}
            </Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location">
                <SelectValue placeholder={direction === "rtl" ? "اختر الموقع" : "Select location"} />
              </SelectTrigger>
              <SelectContent>
                {direction === "rtl" ? (
                  <>
                    <SelectItem value="التجمع الخامس">التجمع الخامس</SelectItem>
                    <SelectItem value="مدينة نصر">مدينة نصر</SelectItem>
                    <SelectItem value="المعادي">المعادي</SelectItem>
                    <SelectItem value="6 أكتوبر">6 أكتوبر</SelectItem>
                    <SelectItem value="الشيخ زايد">الشيخ زايد</SelectItem>
                    <SelectItem value="المهندسين">المهندسين</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="new-cairo">New Cairo</SelectItem>
                    <SelectItem value="nasr-city">Nasr City</SelectItem>
                    <SelectItem value="maadi">Maadi</SelectItem>
                    <SelectItem value="6th-october">6th of October</SelectItem>
                    <SelectItem value="sheikh-zayed">Sheikh Zayed</SelectItem>
                    <SelectItem value="mohandessin">Mohandessin</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="property-type" className={direction === "rtl" ? "text-right block" : "text-left block"}>
              {direction === "rtl" ? "نوع العقار" : "Property Type"}
            </Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger id="property-type">
                <SelectValue placeholder={direction === "rtl" ? "اختر النوع" : "Select type"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">{direction === "rtl" ? "شقة" : "Apartment"}</SelectItem>
                <SelectItem value="villa">{direction === "rtl" ? "فيلا" : "Villa"}</SelectItem>
                <SelectItem value="duplex">{direction === "rtl" ? "دوبلكس" : "Duplex"}</SelectItem>
                <SelectItem value="studio">{direction === "rtl" ? "استوديو" : "Studio"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="area" className={direction === "rtl" ? "text-right block" : "text-left block"}>
              {direction === "rtl" ? "المساحة (متر مربع)" : "Area (sqm)"}
            </Label>
            <span className="text-sm text-gray-500">{area[0]} {direction === "rtl" ? "م²" : "sqm"}</span>
          </div>
          <Slider
            id="area"
            min={50}
            max={500}
            step={10}
            value={area}
            onValueChange={setArea}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>50 {direction === "rtl" ? "م²" : "sqm"}</span>
            <span>500 {direction === "rtl" ? "م²" : "sqm"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bedrooms" className={direction === "rtl" ? "text-right block" : "text-left block"}>
              {direction === "rtl" ? "غرف النوم" : "Bedrooms"}
            </Label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger id="bedrooms">
                <SelectValue placeholder={direction === "rtl" ? "اختر العدد" : "Select number"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bathrooms" className={direction === "rtl" ? "text-right block" : "text-left block"}>
              {direction === "rtl" ? "الحمامات" : "Bathrooms"}
            </Label>
            <Select value={bathrooms} onValueChange={setBathrooms}>
              <SelectTrigger id="bathrooms">
                <SelectValue placeholder={direction === "rtl" ? "اختر العدد" : "Select number"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {predictedPrice !== null && (
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">
                {direction === "rtl" ? "السعر المتوقع" : "Predicted Price"}
              </h3>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                {direction === "rtl" ? "تحليل الذكاء الاصطناعي" : "AI Analysis"}
              </Badge>
            </div>
            
            <div className="text-center mb-4">
              <p className="text-3xl font-bold text-primary">
                {formatPrice(predictedPrice)}
              </p>
              {priceRange && (
                <p className="text-sm text-gray-500 mt-1">
                  {direction === "rtl" 
                    ? `النطاق: ${formatPrice(priceRange[0])} - ${formatPrice(priceRange[1])}` 
                    : `Range: ${formatPrice(priceRange[0])} - ${formatPrice(priceRange[1])}`}
                </p>
              )}
            </div>
            
            {marketTrend && (
              <div className="flex items-center justify-center gap-2 mt-2">
                {marketTrend === "up" && (
                  <>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600">
                      {direction === "rtl" ? "الأسعار في هذه المنطقة في ارتفاع" : "Prices in this area are trending up"}
                    </span>
                  </>
                )}
                {marketTrend === "down" && (
                  <>
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-600">
                      {direction === "rtl" ? "الأسعار في هذه المنطقة في انخفاض" : "Prices in this area are trending down"}
                    </span>
                  </>
                )}
                {marketTrend === "stable" && (
                  <>
                    <BarChart className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-blue-600">
                      {direction === "rtl" ? "الأسعار في هذه المنطقة مستقرة" : "Prices in this area are stable"}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
