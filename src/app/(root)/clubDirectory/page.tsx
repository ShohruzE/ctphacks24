import GenerateCLubs from "@/components/GenerateClubs";

export default async function clubDirectory() {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center py-16 px-20">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center space-y-2">
          <h1 className="font-bold text-3xl">Club Directory</h1>
          <p className="text-lg font-medium">
            Find more clubs through our directory of{" "}
            <span className="text-purple-800 text-xl font-bold">
              100+ active clubs
            </span>{" "}
            at Hunter College!
          </p>
        </div>
        <GenerateCLubs />
      </div>
    </div>
  );
}
