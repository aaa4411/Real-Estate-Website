import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { EnhancedButtonGroup } from "@/components/ui/enhanced-button-group";
import {
  Bell,
  Globe,
  Lock,
  Eye,
  Moon,
  Sun,
  Smartphone,
  Laptop,
  Palette,
  BellOff,
  Mail,
  MessageSquare,
  Home,
  Building,
  DollarSign,
  X,
} from "lucide-react";

export interface AdvancedUserSettingsProps {
  onSave?: (settings: any) => void;
  defaultTab?: string;
  className?: string;
}

const AdvancedUserSettings = ({
  onSave,
  defaultTab = "account",
  className = "",
}: AdvancedUserSettingsProps) => {
  // Account settings
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("(555) 123-4567");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordLastChanged, setPasswordLastChanged] =
    useState("3 months ago");

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [notificationFrequency, setNotificationFrequency] = useState("daily");
  const [newListingAlerts, setNewListingAlerts] = useState(true);
  const [priceChangeAlerts, setPriceChangeAlerts] = useState(true);
  const [favoriteUpdates, setFavoriteUpdates] = useState(true);
  const [newsletterSubscription, setNewsletterSubscription] = useState(false);

  // Preferences settings
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("english");
  const [currency, setCurrency] = useState("usd");
  const [distanceUnit, setDistanceUnit] = useState("miles");
  const [defaultView, setDefaultView] = useState("grid");
  const [autoPlayVideos, setAutoPlayVideos] = useState(false);
  const [highQualityImages, setHighQualityImages] = useState(true);
  const [fontScale, setFontScale] = useState([100]);

  // Privacy settings
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [activityTracking, setActivityTracking] = useState(true);
  const [searchHistory, setSearchHistory] = useState(true);
  const [locationTracking, setLocationTracking] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState([
    "essential",
    "functional",
  ]);
  const [dataSharing, setDataSharing] = useState(false);

  // Property preferences
  const [preferredPropertyTypes, setPreferredPropertyTypes] = useState([
    "house",
    "condo",
  ]);
  const [minBedrooms, setMinBedrooms] = useState("2");
  const [minBathrooms, setMinBathrooms] = useState("1");
  const [priceRange, setPriceRange] = useState([200000, 800000]);
  const [preferredLocations, setPreferredLocations] = useState([
    "Miami, FL",
    "Austin, TX",
  ]);
  const [mustHaveAmenities, setMustHaveAmenities] = useState([
    "Air Conditioning",
    "Parking",
  ]);

  // Save all settings
  const handleSaveAll = () => {
    const allSettings = {
      account: {
        firstName,
        lastName,
        email,
        phone,
        twoFactorEnabled,
        passwordLastChanged,
      },
      notifications: {
        emailNotifications,
        marketingEmails,
        smsNotifications,
        pushNotifications,
        notificationFrequency,
        newListingAlerts,
        priceChangeAlerts,
        favoriteUpdates,
        newsletterSubscription,
      },
      preferences: {
        darkMode,
        language,
        currency,
        distanceUnit,
        defaultView,
        autoPlayVideos,
        highQualityImages,
        fontScale: fontScale[0],
      },
      privacy: {
        profileVisibility,
        activityTracking,
        searchHistory,
        locationTracking,
        cookiePreferences,
        dataSharing,
      },
      propertyPreferences: {
        preferredPropertyTypes,
        minBedrooms,
        minBathrooms,
        priceRange,
        preferredLocations,
        mustHaveAmenities,
      },
    };

    if (onSave) {
      onSave(allSettings);
    }

    console.log("Saved settings:", allSettings);
  };

  // Handle removing a preferred location
  const removeLocation = (location: string) => {
    setPreferredLocations(preferredLocations.filter((loc) => loc !== location));
  };

  // Handle adding a new preferred location
  const [newLocation, setNewLocation] = useState("");
  const addLocation = () => {
    if (newLocation && !preferredLocations.includes(newLocation)) {
      setPreferredLocations([...preferredLocations, newLocation]);
      setNewLocation("");
    }
  };

  // Cookie preference options
  const cookieOptions = [
    {
      id: "essential",
      label: "Essential",
      description: "Required for the website to function",
    },
    {
      id: "functional",
      label: "Functional",
      description: "Enables personalized features",
    },
    {
      id: "analytics",
      label: "Analytics",
      description: "Helps us improve our website",
    },
    {
      id: "advertising",
      label: "Advertising",
      description: "Allows personalized ads",
    },
  ];

  // Property type options
  const propertyTypeOptions = [
    { id: "house", label: "House" },
    { id: "condo", label: "Condo" },
    { id: "apartment", label: "Apartment" },
    { id: "townhouse", label: "Townhouse" },
    { id: "land", label: "Land" },
    { id: "commercial", label: "Commercial" },
  ];

  // Amenity options
  const amenityOptions = [
    { id: "air-conditioning", label: "Air Conditioning" },
    { id: "parking", label: "Parking" },
    { id: "pool", label: "Swimming Pool" },
    { id: "gym", label: "Gym" },
    { id: "balcony", label: "Balcony" },
    { id: "fireplace", label: "Fireplace" },
    { id: "garden", label: "Garden" },
    { id: "security", label: "Security System" },
    { id: "elevator", label: "Elevator" },
    { id: "waterfront", label: "Waterfront" },
  ];

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Advanced Settings
        </h1>
        <p className="text-gray-600">
          Customize your experience with detailed preferences and options
        </p>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="property" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Property</span>
          </TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Manage your personal information and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security Settings</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    id="twoFactor"
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <div>
                      <p className="text-sm font-medium">
                        Last changed: {passwordLastChanged}
                      </p>
                      <p className="text-xs text-gray-500">
                        Strong password protection
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Connected Accounts</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          G
                        </div>
                        <div>
                          <p className="text-sm font-medium">Google</p>
                          <p className="text-xs text-gray-500">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
                          f
                        </div>
                        <div>
                          <p className="text-sm font-medium">Facebook</p>
                          <p className="text-xs text-gray-500">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <EnhancedButton
                onClick={handleSaveAll}
                loadingText="Saving..."
                successText="Saved Successfully"
              >
                Save Changes
              </EnhancedButton>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Control how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive notifications via email
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-gray-500" />
                    <div className="space-y-0.5">
                      <Label htmlFor="smsNotifications">
                        SMS Notifications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive text messages for important updates
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-gray-500" />
                    <div className="space-y-0.5">
                      <Label htmlFor="pushNotifications">
                        Push Notifications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive notifications on your device
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div className="space-y-0.5">
                      <Label htmlFor="marketingEmails">Marketing Emails</Label>
                      <p className="text-sm text-gray-500">
                        Receive promotional emails and special offers
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={marketingEmails}
                    onCheckedChange={setMarketingEmails}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Types</h3>

                <div className="space-y-2">
                  <Label htmlFor="notificationFrequency">
                    Notification Frequency
                  </Label>
                  <Select
                    value={notificationFrequency}
                    onValueChange={setNotificationFrequency}
                  >
                    <SelectTrigger id="notificationFrequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newListingAlerts">New Listing Alerts</Label>
                    <p className="text-sm text-gray-500">
                      Get notified when new properties match your criteria
                    </p>
                  </div>
                  <Switch
                    id="newListingAlerts"
                    checked={newListingAlerts}
                    onCheckedChange={setNewListingAlerts}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="priceChangeAlerts">
                      Price Change Alerts
                    </Label>
                    <p className="text-sm text-gray-500">
                      Get notified when prices change on properties you're
                      watching
                    </p>
                  </div>
                  <Switch
                    id="priceChangeAlerts"
                    checked={priceChangeAlerts}
                    onCheckedChange={setPriceChangeAlerts}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="favoriteUpdates">
                      Favorite Property Updates
                    </Label>
                    <p className="text-sm text-gray-500">
                      Get notified about changes to your saved properties
                    </p>
                  </div>
                  <Switch
                    id="favoriteUpdates"
                    checked={favoriteUpdates}
                    onCheckedChange={setFavoriteUpdates}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newsletterSubscription">
                      Newsletter Subscription
                    </Label>
                    <p className="text-sm text-gray-500">
                      Receive our monthly newsletter with market insights
                    </p>
                  </div>
                  <Switch
                    id="newsletterSubscription"
                    checked={newsletterSubscription}
                    onCheckedChange={setNewsletterSubscription}
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <BellOff className="h-5 w-5 text-amber-500" />
                  <h4 className="font-medium">Quiet Hours</h4>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  Set times when you don't want to receive notifications
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quietStart">Start Time</Label>
                    <Select defaultValue="22:00">
                      <SelectTrigger id="quietStart">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                        <SelectItem value="21:00">9:00 PM</SelectItem>
                        <SelectItem value="22:00">10:00 PM</SelectItem>
                        <SelectItem value="23:00">11:00 PM</SelectItem>
                        <SelectItem value="00:00">12:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quietEnd">End Time</Label>
                    <Select defaultValue="07:00">
                      <SelectTrigger id="quietEnd">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="05:00">5:00 AM</SelectItem>
                        <SelectItem value="06:00">6:00 AM</SelectItem>
                        <SelectItem value="07:00">7:00 AM</SelectItem>
                        <SelectItem value="08:00">8:00 AM</SelectItem>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <EnhancedButton
                onClick={handleSaveAll}
                loadingText="Saving..."
                successText="Saved Successfully"
              >
                Save Changes
              </EnhancedButton>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Preferences Settings */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Display & Accessibility</CardTitle>
              <CardDescription>
                Customize your experience on our platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Appearance</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {darkMode ? (
                      <Moon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Sun className="h-5 w-5 text-amber-500" />
                    )}
                    <div className="space-y-0.5">
                      <Label htmlFor="darkMode">Dark Mode</Label>
                      <p className="text-sm text-gray-500">
                        Use dark theme for the website
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="darkMode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="fontScale">Font Size</Label>
                    <span className="text-sm text-gray-500">
                      {fontScale[0]}%
                    </span>
                  </div>
                  <Slider
                    id="fontScale"
                    min={75}
                    max={150}
                    step={5}
                    value={fontScale}
                    onValueChange={setFontScale}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Smaller</span>
                    <span>Default</span>
                    <span>Larger</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultView">Default View</Label>
                  <Select value={defaultView} onValueChange={setDefaultView}>
                    <SelectTrigger id="defaultView">
                      <SelectValue placeholder="Select view" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grid View</SelectItem>
                      <SelectItem value="list">List View</SelectItem>
                      <SelectItem value="map">Map View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Regional Settings</h3>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="cad">CAD (C$)</SelectItem>
                      <SelectItem value="aud">AUD (A$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="distanceUnit">Distance Unit</Label>
                  <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                    <SelectTrigger id="distanceUnit">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="miles">Miles</SelectItem>
                      <SelectItem value="kilometers">Kilometers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Performance & Data Usage
                </h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoPlayVideos">Auto-Play Videos</Label>
                    <p className="text-sm text-gray-500">
                      Automatically play property videos when browsing
                    </p>
                  </div>
                  <Switch
                    id="autoPlayVideos"
                    checked={autoPlayVideos}
                    onCheckedChange={setAutoPlayVideos}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="highQualityImages">
                      High-Quality Images
                    </Label>
                    <p className="text-sm text-gray-500">
                      Load high-resolution images (uses more data)
                    </p>
                  </div>
                  <Switch
                    id="highQualityImages"
                    checked={highQualityImages}
                    onCheckedChange={setHighQualityImages}
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="h-5 w-5 text-blue-500" />
                    <h4 className="font-medium">Mobile Data Usage</h4>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    Control how the app uses data on mobile networks
                  </p>

                  <div className="space-y-2">
                    <Select defaultValue="wifi-only">
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="always">
                          Always load high-quality content
                        </SelectItem>
                        <SelectItem value="wifi-only">
                          High-quality on Wi-Fi only
                        </SelectItem>
                        <SelectItem value="data-saver">
                          Data saver mode
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <EnhancedButton
                onClick={handleSaveAll}
                loadingText="Saving..."
                successText="Saved Successfully"
              >
                Save Changes
              </EnhancedButton>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Data</CardTitle>
              <CardDescription>
                Control your privacy settings and how your data is used
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Profile Visibility</h3>

                <div className="space-y-2">
                  <Label htmlFor="profileVisibility">
                    Who Can See Your Profile
                  </Label>
                  <Select
                    value={profileVisibility}
                    onValueChange={setProfileVisibility}
                  >
                    <SelectTrigger id="profileVisibility">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        Public - Anyone can see
                      </SelectItem>
                      <SelectItem value="registered">
                        Registered Users Only
                      </SelectItem>
                      <SelectItem value="private">
                        Private - Only you
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="activityTracking">Activity Tracking</Label>
                    <p className="text-sm text-gray-500">
                      Allow us to track your activity to improve recommendations
                    </p>
                  </div>
                  <Switch
                    id="activityTracking"
                    checked={activityTracking}
                    onCheckedChange={setActivityTracking}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="searchHistory">Save Search History</Label>
                    <p className="text-sm text-gray-500">
                      Store your search history for quick access
                    </p>
                  </div>
                  <Switch
                    id="searchHistory"
                    checked={searchHistory}
                    onCheckedChange={setSearchHistory}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="locationTracking">Location Tracking</Label>
                    <p className="text-sm text-gray-500">
                      Allow us to use your location for nearby properties
                    </p>
                  </div>
                  <Switch
                    id="locationTracking"
                    checked={locationTracking}
                    onCheckedChange={setLocationTracking}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Cookie Preferences</h3>
                <p className="text-sm text-gray-500">
                  Manage how we use cookies on our website
                </p>

                <div className="space-y-3">
                  {cookieOptions.map((option) => (
                    <div key={option.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={`cookie-${option.id}`}
                        checked={cookiePreferences.includes(option.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setCookiePreferences([
                              ...cookiePreferences,
                              option.id,
                            ]);
                          } else {
                            setCookiePreferences(
                              cookiePreferences.filter(
                                (id) => id !== option.id,
                              ),
                            );
                          }
                        }}
                        disabled={option.id === "essential"} // Essential cookies cannot be disabled
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor={`cookie-${option.id}`}
                          className="text-sm font-medium"
                        >
                          {option.label}{" "}
                          {option.id === "essential" && "(Required)"}
                        </Label>
                        <p className="text-xs text-gray-500">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Sharing</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dataSharing">
                      Share Data with Partners
                    </Label>
                    <p className="text-sm text-gray-500">
                      Allow us to share your data with trusted partners
                    </p>
                  </div>
                  <Switch
                    id="dataSharing"
                    checked={dataSharing}
                    onCheckedChange={setDataSharing}
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Your Data Rights</h4>
                  <p className="text-sm text-gray-500 mb-3">
                    You have the right to access, correct, or delete your
                    personal data
                  </p>

                  <div className="space-y-2">
                    <EnhancedButtonGroup
                      direction="vertical"
                      size="sm"
                      actions={[
                        {
                          label: "Download My Data",
                          onClick: () => console.log("Download data requested"),
                          variant: "outline",
                        },
                        {
                          label: "Delete My Account",
                          onClick: () =>
                            console.log("Delete account requested"),
                          variant: "destructive",
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <EnhancedButton
                onClick={handleSaveAll}
                loadingText="Saving..."
                successText="Saved Successfully"
              >
                Save Changes
              </EnhancedButton>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Property Preferences */}
        <TabsContent value="property">
          <Card>
            <CardHeader>
              <CardTitle>Property Preferences</CardTitle>
              <CardDescription>
                Set your preferences for property searches and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Property Types</h3>
                <p className="text-sm text-gray-500">
                  Select the types of properties you're interested in
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {propertyTypeOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`property-${option.id}`}
                        checked={preferredPropertyTypes.includes(option.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setPreferredPropertyTypes([
                              ...preferredPropertyTypes,
                              option.id,
                            ]);
                          } else {
                            setPreferredPropertyTypes(
                              preferredPropertyTypes.filter(
                                (id) => id !== option.id,
                              ),
                            );
                          }
                        }}
                      />
                      <Label
                        htmlFor={`property-${option.id}`}
                        className="text-sm font-medium"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Property Features</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minBedrooms">Minimum Bedrooms</Label>
                    <Select value={minBedrooms} onValueChange={setMinBedrooms}>
                      <SelectTrigger id="minBedrooms">
                        <SelectValue placeholder="Select minimum" />
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

                  <div className="space-y-2">
                    <Label htmlFor="minBathrooms">Minimum Bathrooms</Label>
                    <Select
                      value={minBathrooms}
                      onValueChange={setMinBathrooms}
                    >
                      <SelectTrigger id="minBathrooms">
                        <SelectValue placeholder="Select minimum" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="1.5">1.5+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="2.5">2.5+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Price Range</Label>
                    <span className="text-sm text-gray-500">
                      ${priceRange[0].toLocaleString()} - $
                      {priceRange[1].toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    min={50000}
                    max={2000000}
                    step={10000}
                    value={priceRange}
                    onValueChange={(value) =>
                      setPriceRange(value as [number, number])
                    }
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$50k</span>
                    <span>$1M</span>
                    <span>$2M+</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Must-Have Amenities</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {amenityOptions.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`amenity-${option.id}`}
                          checked={mustHaveAmenities.includes(option.label)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setMustHaveAmenities([
                                ...mustHaveAmenities,
                                option.label,
                              ]);
                            } else {
                              setMustHaveAmenities(
                                mustHaveAmenities.filter(
                                  (amenity) => amenity !== option.label,
                                ),
                              );
                            }
                          }}
                        />
                        <Label
                          htmlFor={`amenity-${option.id}`}
                          className="text-sm font-medium"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Preferred Locations</h3>

                <div className="space-y-2">
                  <Label>Saved Locations</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {preferredLocations.length > 0 ? (
                      preferredLocations.map((location) => (
                        <Badge
                          key={location}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {location}
                          <button
                            onClick={() => removeLocation(location)}
                            className="ml-1 hover:text-gray-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        No preferred locations added yet
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a location (city, state)"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={addLocation} disabled={!newLocation}>
                      Add
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="h-5 w-5 text-blue-500" />
                    <h4 className="font-medium">Neighborhood Preferences</h4>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    Select factors that are important to you
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pref-schools" />
                      <Label htmlFor="pref-schools" className="text-sm">
                        Good Schools
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pref-transit" />
                      <Label htmlFor="pref-transit" className="text-sm">
                        Public Transit
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pref-shopping" />
                      <Label htmlFor="pref-shopping" className="text-sm">
                        Shopping
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pref-parks" />
                      <Label htmlFor="pref-parks" className="text-sm">
                        Parks & Recreation
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pref-restaurants" />
                      <Label htmlFor="pref-restaurants" className="text-sm">
                        Restaurants
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pref-quiet" />
                      <Label htmlFor="pref-quiet" className="text-sm">
                        Quiet Area
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <EnhancedButton
                onClick={handleSaveAll}
                loadingText="Saving..."
                successText="Saved Successfully"
              >
                Save Changes
              </EnhancedButton>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedUserSettings;
