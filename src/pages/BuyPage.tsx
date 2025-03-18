import { Helmet } from "react-helmet";
import PropertyGrid from "../components/properties/PropertyGrid";
import { properties } from "../data/properties";

const BuyPage = () => {
  // Filter properties that are for sale
  const propertiesForSale = properties.filter(
    (property) => property.listingType === "sale",
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Buy Properties | Real Estate</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Buy Properties
          </h1>
          <p className="text-gray-600">
            Find your dream home from our extensive collection of properties for
            sale
          </p>
        </div>

        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filter Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <select className="w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2">
                <option>Any Price</option>
                <option>$100,000 - $200,000</option>
                <option>$200,000 - $300,000</option>
                <option>$300,000 - $500,000</option>
                <option>$500,000 - $750,000</option>
                <option>$750,000+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms
              </label>
              <select className="w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2">
                <option>Any</option>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
                <option>4+</option>
                <option>5+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select className="w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2">
                <option>Any Type</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Condo</option>
                <option>Townhouse</option>
                <option>Land</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <button className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Apply Filters
            </button>
          </div>
        </div>

        <PropertyGrid properties={propertiesForSale} />
      </div>
    </div>
  );
};

export default BuyPage;
