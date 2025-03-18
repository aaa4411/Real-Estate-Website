import ProfileForm from "@/components/auth/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
      <div className="bg-white rounded-lg shadow">
        <ProfileForm />
      </div>
    </div>
  );
}
