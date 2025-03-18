import { Helmet } from "react-helmet";
import PropertyGrid from "../components/properties/PropertyGrid";
import { properties } from "../data/properties";

const RentPage = () => {
  // Filter properties that are for rent
  const propertiesForRent = properties.filter(
    (property) => property.listingType === "rent",
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Rent Properties | Real Estate</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Rental Properties
          </h1>
          <p className="text-gray-600">
            Find the perfect rental property from our curated selection
          </p>
        </div>

        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filter Rentals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Rent
              </label>
              <select className="w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2">
                <option>Any Price</option>
                <option>$500 - $1,000</option>
                <option>$1,000 - $1,500</option>
                <option>$1,500 - $2,000</option>
                <option>$2,000 - $3,000</option>
                <option>$3,000+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms
              </label>
              <select className="w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2">
                <option>Any</option>
                <option>Studio</option>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
                <option>4+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lease Length
              </label>
              <select className="w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2">
                <option>Any</option>
                <option>Short-term</option>
                <option>6 Months</option>
                <option>1 Year</option>
                <option>2+ Years</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <button className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Apply Filters
            </button>
          </div>
        </div>

        <PropertyGrid properties={propertiesForRent} />
      </div>
    </div>
  );
};

export default RentPage;
