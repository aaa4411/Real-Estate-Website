import { useParams } from "react-router-dom";
import PropertyDetail from "@/components/properties/PropertyDetail";
import { allProperties } from "@/data/properties";

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const property = allProperties.find((p) => p.id === id);

  return (
    <div className="bg-gray-50">
      <PropertyDetail property={property} />
    </div>
  );
}
