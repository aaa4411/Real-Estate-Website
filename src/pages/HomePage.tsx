import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/home/HeroSection";
import PropertyGrid from "@/components/properties/PropertyGrid";
import PropertyMap from "@/components/properties/PropertyMap";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Building,
  Home,
  MapPin,
  TrendingUp,
  Map,
} from "lucide-react";
import { featuredProperties, recentProperties } from "@/data/properties";

interface SearchFilters {
  location: string;
  priceRange: string;
  propertyType: string;
}

export default function HomePage() {
  const [searchFilters, setSearchFilters] = useState<SearchFilters | null>(
    null,
  );

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
    // In a real app, this would trigger a search and update the property listings
    console.log("Search filters applied:", filters);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection onSearch={handleSearch} />

      {/* Featured Properties Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Properties
              </h2>
              <p className="mt-2 text-gray-600">
                Explore our handpicked selection of premium properties
              </p>
            </div>
            <Link to="/properties">
              <Button
                variant="outline"
                className="mt-4 md:mt-0 flex items-center gap-2"
              >
                View All Properties
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="sale">For Sale</TabsTrigger>
              <TabsTrigger value="rent">For Rent</TabsTrigger>
              <TabsTrigger value="new">New Listings</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <PropertyGrid
                properties={featuredProperties}
                showFilters={false}
              />
            </TabsContent>
            <TabsContent value="sale" className="mt-6">
              <PropertyGrid
                properties={featuredProperties.slice(0, 3)}
                showFilters={false}
              />
            </TabsContent>
            <TabsContent value="rent" className="mt-6">
              <PropertyGrid
                properties={featuredProperties.slice(3, 6)}
                showFilters={false}
              />
            </TabsContent>
            <TabsContent value="new" className="mt-6">
              <PropertyGrid properties={recentProperties} showFilters={false} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Property Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Property Locations
              </h2>
              <p className="mt-2 text-gray-600">
                Find properties in your desired location
              </p>
            </div>
            <Link to="/map">
              <Button
                variant="outline"
                className="mt-4 md:mt-0 flex items-center gap-2"
              >
                View Full Map
                <Map className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <PropertyMap />
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
            <p className="mt-2 text-gray-600 max-w-3xl mx-auto">
              We're committed to helping you find the perfect property with our
              expert guidance and comprehensive services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Wide Range of Properties
              </h3>
              <p className="text-gray-600">
                Browse through thousands of listings to find the perfect
                property that meets all your requirements
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Prime Locations</h3>
              <p className="text-gray-600">
                Discover properties in the most desirable neighborhoods and
                locations across the country
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Market Insights</h3>
              <p className="text-gray-600">
                Get expert advice and market analysis to make informed decisions
                about your real estate investments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Start your search today and let us help you find the perfect
            property that fits your lifestyle and budget
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Browse Properties
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10"
            >
              Contact an Agent
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Real Estate Insights
              </h2>
              <p className="mt-2 text-gray-600">
                Latest news and tips from our real estate experts
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Articles
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
              >
                <img
                  src={`https://images.unsplash.com/photo-158${1600000 + item * 10000}?w=800&q=80`}
                  alt={`Blog post ${item}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-primary font-medium mb-2">
                    Market Trends
                  </p>
                  <h3 className="text-xl font-semibold mb-3 hover:text-primary transition-colors">
                    {item === 1
                      ? "Top 10 Neighborhoods to Invest In"
                      : item === 2
                        ? "How to Prepare Your Home for Sale"
                        : "Understanding Mortgage Rates in 2023"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {item === 1
                      ? "Discover the most promising neighborhoods for real estate investment with high ROI potential."
                      : item === 2
                        ? "Learn the essential steps to prepare your property for a quick and profitable sale."
                        : "Get insights into current mortgage trends and how they might affect your home buying decision."}
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto font-medium text-primary"
                  >
                    Read More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Stay Updated
                </h2>
                <p className="text-gray-600 mb-6">
                  Subscribe to our newsletter to receive the latest property
                  listings, market insights, and real estate tips directly in
                  your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button className="sm:w-auto">Subscribe</Button>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  By subscribing, you agree to our Privacy Policy and consent to
                  receive updates from our company.
                </p>
              </div>
              <div className="hidden md:block">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                  alt="Newsletter"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
