import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Maximize, Minimize, RotateCcw, Camera, Info, X } from "lucide-react";

interface VirtualTourViewerProps {
  propertyId: string;
  images: string[];
  hotspots?: {
    id: string;
    position: { x: number; y: number };
    roomName: string;
    description?: string;
  }[];
  direction?: "rtl" | "ltr";
}

export default function VirtualTourViewer({
  propertyId = "1",
  images = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  ],
  hotspots = [
    {
      id: "1",
      position: { x: 25, y: 45 },
      roomName: "Living Room",
      description: "Spacious living area with natural light",
    },
    {
      id: "2",
      position: { x: 65, y: 35 },
      roomName: "Kitchen",
      description: "Modern kitchen with premium appliances",
    },
    {
      id: "3",
      position: { x: 45, y: 75 },
      roomName: "Bedroom",
      description: "Master bedroom with en-suite bathroom",
    },
  ],
  direction = "ltr",
}: VirtualTourViewerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [isInfoVisible, setIsInfoVisible] = useState(true);
  const viewerRef = useRef<HTMLDivElement>(null);

  // Translated hotspots for RTL
  const translatedHotspots = hotspots.map((hotspot) => ({
    ...hotspot,
    roomName:
      direction === "rtl"
        ? translateRoomName(hotspot.roomName)
        : hotspot.roomName,
    description:
      direction === "rtl" && hotspot.description
        ? translateDescription(hotspot.description)
        : hotspot.description,
  }));

  function translateRoomName(name: string): string {
    const translations: Record<string, string> = {
      "Living Room": "غرفة المعيشة",
      Kitchen: "المطبخ",
      Bedroom: "غرفة النوم",
      Bathroom: "الحمام",
      "Dining Room": "غرفة الطعام",
      Office: "المكتب",
      Balcony: "الشرفة",
    };
    return translations[name] || name;
  }

  function translateDescription(desc: string): string {
    // This would be more sophisticated in a real app
    const translations: Record<string, string> = {
      "Spacious living area with natural light":
        "غرفة معيشة واسعة مع إضاءة طبيعية",
      "Modern kitchen with premium appliances": "مطبخ حديث مع أجهزة متطورة",
      "Master bedroom with en-suite bathroom": "غرفة نوم رئيسية مع حمام داخلي",
    };
    return translations[desc] || desc;
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleRotate = (direction: "left" | "right") => {
    setRotation((prev) => (direction === "left" ? prev - 90 : prev + 90));
  };

  const handleZoom = (value: number[]) => {
    setZoom(value[0]);
  };

  const handleHotspotClick = (hotspotId: string) => {
    setSelectedHotspot((prevId) => (prevId === hotspotId ? null : hotspotId));
  };

  const navigateToImage = (index: number) => {
    setCurrentImageIndex(index);
    setRotation(0);
    setZoom(100);
    setSelectedHotspot(null);
  };

  const resetView = () => {
    setRotation(0);
    setZoom(100);
  };

  return (
    <div
      className="relative w-full bg-black rounded-lg overflow-hidden"
      ref={viewerRef}
      dir={direction}
    >
      {/* Main viewer */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <div
          className="w-full h-full transition-transform duration-300 ease-in-out"
          style={{
            transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
            backgroundImage: `url(${images[currentImageIndex]}`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Hotspots */}
          {translatedHotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              className={`absolute cursor-pointer transition-all duration-300 ${selectedHotspot === hotspot.id ? "z-20" : "z-10"}`}
              style={{
                left: `${hotspot.position.x}%`,
                top: `${hotspot.position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => handleHotspotClick(hotspot.id)}
            >
              <div
                className={`
                h-6 w-6 rounded-full flex items-center justify-center
                ${selectedHotspot === hotspot.id ? "bg-primary text-white" : "bg-white text-primary"}
                shadow-lg border-2 border-white
                animate-pulse
              `}
              >
                <span className="text-xs font-bold">{Number(hotspot.id)}</span>
              </div>

              {selectedHotspot === hotspot.id && hotspot.description && (
                <Card className="absolute top-8 left-1/2 -translate-x-1/2 w-48 z-30 shadow-xl">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-sm">
                        {hotspot.roomName}
                      </h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 -mt-1 -mr-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedHotspot(null);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-600">
                      {hotspot.description}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div
        className={`
        absolute bottom-0 left-0 right-0 p-4 
        bg-gradient-to-t from-black/80 to-transparent
        flex flex-col gap-2
        ${isInfoVisible ? "opacity-100" : "opacity-0 hover:opacity-100"}
        transition-opacity duration-300
      `}
      >
        <div className="flex justify-between items-center">
          <div>
            <Badge
              variant="outline"
              className="bg-black/50 text-white border-none"
            >
              {direction === "rtl" ? "جولة افتراضية" : "Virtual Tour"}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={() => handleRotate("left")}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={resetView}
            >
              <Camera className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={() => setIsInfoVisible(!isInfoVisible)}
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="flex-1">
            <Slider
              value={[zoom]}
              min={50}
              max={150}
              step={5}
              onValueChange={handleZoom}
              className="w-full"
            />
          </div>
          <div className="text-white text-xs">{zoom}%</div>
        </div>

        <Tabs defaultValue="rooms" className="w-full">
          <TabsList className="bg-black/30 w-full">
            <TabsTrigger
              value="rooms"
              className="text-white data-[state=active]:bg-white/20"
            >
              {direction === "rtl" ? "الغرف" : "Rooms"}
            </TabsTrigger>
            <TabsTrigger
              value="tour"
              className="text-white data-[state=active]:bg-white/20"
            >
              {direction === "rtl" ? "الجولة" : "Tour"}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="rooms" className="mt-2">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {translatedHotspots.map((hotspot) => (
                <Button
                  key={hotspot.id}
                  variant={
                    selectedHotspot === hotspot.id ? "default" : "outline"
                  }
                  size="sm"
                  className="whitespace-nowrap bg-black/30 text-white border-white/30 hover:bg-white/20"
                  onClick={() => handleHotspotClick(hotspot.id)}
                >
                  {hotspot.roomName}
                </Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="tour" className="mt-2">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`
                    w-16 h-12 rounded-md overflow-hidden cursor-pointer
                    ${currentImageIndex === index ? "ring-2 ring-primary" : "opacity-70"}
                  `}
                  onClick={() => navigateToImage(index)}
                >
                  <img
                    src={images[index]}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
