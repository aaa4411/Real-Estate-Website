import { useParams } from "react-router-dom";
import PropertyDetail from "@/components/properties/PropertyDetail";
import { allProperties } from "@/data/properties";
import { Helmet } from "react-helmet";

export default function PropertyDetailPageEnhanced() {
  const { id } = useParams<{ id: string }>();
  const property = allProperties.find((p) => p.id === id);

  return (
    <div>
      <Helmet>
        <title>{property?.title || "Property Details"} | DreamHome</title>
        <meta
          name="description"
          content={
            property?.description?.substring(0, 160) ||
            "View detailed information about this property including photos, amenities, and location."
          }
        />
      </Helmet>
      <PropertyDetail property={property} />
    </div>
  );
}
