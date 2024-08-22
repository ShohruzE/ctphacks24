import GenerateClubsForm from "@/components/GenerateClubsForm";

export default async function CreatePage() {
  return (
    <div className="min-h-screen">
      <h1>Create</h1>
      <div>
        <GenerateClubsForm />
      </div>
    </div>
  );
}
