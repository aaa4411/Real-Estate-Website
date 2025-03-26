import AdminDashboard from "@/components/admin/AdminDashboard";
import { Helmet } from "react-helmet";

export default function AdminDashboardPage() {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard | DreamHome</title>
      </Helmet>
      <AdminDashboard />
    </>
  );
}
