import { Property } from "@/components/properties/PropertyCard";

export const featuredProperties: Property[] = [
  {
    id: "1",
    title: "Modern Luxury Villa",
    address: "123 Palm Avenue, Miami, FL",
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 2800,
    imageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    isFeatured: true,
    listingType: "sale",
  },
  {
    id: "2",
    title: "Downtown Penthouse",
    address: "456 Skyline Blvd, New York, NY",
    price: 2100000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1950,
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    isFeatured: true,
    listingType: "sale",
  },
  {
    id: "3",
    title: "Cozy Suburban Home",
    address: "789 Maple Street, Austin, TX",
    price: 550000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1800,
    imageUrl:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    isFeatured: true,
    listingType: "sale",
  },
  {
    id: "4",
    title: "Waterfront Cottage",
    address: "321 Lakeside Dr, Seattle, WA",
    price: 875000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1500,
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    isFeatured: false,
    listingType: "sale",
  },
  {
    id: "5",
    title: "Mountain View Cabin",
    address: "555 Highland Road, Denver, CO",
    price: 495000,
    bedrooms: 3,
    bathrooms: 1,
    squareFeet: 1200,
    imageUrl:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    isFeatured: false,
    listingType: "sale",
  },
  {
    id: "6",
    title: "Urban Loft Apartment",
    address: "888 City Center, Chicago, IL",
    price: 420000,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 950,
    imageUrl:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    isFeatured: false,
    listingType: "sale",
  },
];

export const recentProperties: Property[] = [
  {
    id: "7",
    title: "Beachfront Condo",
    address: "101 Ocean Drive, San Diego, CA",
    price: 750000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1100,
    imageUrl:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
    listingType: "sale",
  },
  {
    id: "8",
    title: "Historic Brownstone",
    address: "202 Heritage Lane, Boston, MA",
    price: 1850000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3200,
    imageUrl:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
    listingType: "sale",
  },
  {
    id: "9",
    title: "Ranch Style Home",
    address: "303 Prairie Road, Dallas, TX",
    price: 385000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1600,
    imageUrl:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    listingType: "sale",
  },
];

// Rental properties
export const rentalProperties: Property[] = [
  {
    id: "10",
    title: "Modern Downtown Apartment",
    address: "123 City Center, New York, NY",
    price: 3500,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1100,
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    listingType: "rent",
  },
  {
    id: "11",
    title: "Luxury Condo with Views",
    address: "456 Skyline Ave, San Francisco, CA",
    price: 4200,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1300,
    imageUrl:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    listingType: "rent",
  },
  {
    id: "12",
    title: "Spacious Family Home",
    address: "789 Suburban St, Austin, TX",
    price: 2800,
    bedrooms: 4,
    bathrooms: 2.5,
    squareFeet: 2200,
    imageUrl:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    listingType: "rent",
  },
  {
    id: "13",
    title: "Cozy Studio Apartment",
    address: "101 Downtown Blvd, Chicago, IL",
    price: 1800,
    bedrooms: 0,
    bathrooms: 1,
    squareFeet: 650,
    imageUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    listingType: "rent",
  },
  {
    id: "14",
    title: "Waterfront Townhouse",
    address: "222 Harbor Dr, Seattle, WA",
    price: 3200,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 1800,
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    listingType: "rent",
  },
];

// Combine all properties for use throughout the app
export const allProperties: Property[] = [
  ...featuredProperties,
  ...recentProperties,
];

// Export all properties including rentals
export const properties = [...allProperties, ...rentalProperties];
