"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div
      className="flex min-h-screen flex-col justify-center items-center"
      style={{
        backgroundImage: `url("/images/Hunter.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-gray-400 flex flex-col justify-center items-center gap-12 p-24 rounded-xl opacity-80">
        <div className="w-full">
          <Button
            onClick={() => router.push("/create")}
            className="bg-purple-800 text-white text-2xl py-8 px-8"
          >
            {" "}
            Take the Quiz!{" "}
          </Button>
        </div>
        <div className="w-full">
          <Button
            onClick={() => router.push("/clubDirectory")}
            className="bg-purple-400 text-white text-2xl py-8 px-8 w-full"
          >
            {" "}
            Find a Club!{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}
