import GenerateClubsForm from "@/components/GenerateClubsForm";

export default async function CreatePage() {
  return (
    <div className="flex flex-col min-h-screen justify-center space-y-8">
      <h1 className="font-bold text-3xl text-center">Create</h1>
      <div className="flex justify-center items-center">
        <GenerateClubsForm />
      </div>
    </div>
  );
}
