import ClubProfile from "@/components/ClubProfile";

export default async function ClubProfilePage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="font-bold text-3xl mb-6">Club Profile</h1>
      <div className="flex flex-col justify-center items-center">
        <ClubProfile />
      </div>
    </div>
  );
}
