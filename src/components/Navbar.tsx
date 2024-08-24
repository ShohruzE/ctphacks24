import Link from "next/link";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { currentUser, auth } from "@clerk/nextjs/server";

export default async function Navbar() {
  const { userId }: { userId: string | null } = auth();

  return (
    <header className="bg-black text-white py-8">
      <div className="px-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-extrabold text-2xl hover:text-slate-400">
              <Link href="/">ClubFinder</Link>
            </h1>
          </div>
          <div className="flex flex-row items-center gap-8">
            <ul className="flex items-center gap-8">
              <li>
                <Link
                  className="hover:text-slate-400 font-bold"
                  href="/clubDirectory"
                >
                  View Clubs
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-slate-400 font-bold"
                  href={`/profile/${userId}`}
                >
                  View Profile
                </Link>
              </li>
              <li>
                <Link
                  className="font-bold bg-purple-800 rounded-md py-2 px-3 hover:bg-purple-600"
                  href="/create"
                >
                  Create
                </Link>
              </li>
              {/* <li>
                <Link
                  className="hover:text-slate-400 font-bold"
                  href="/explore"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-slate-400 font-bold"
                  href="/library"
                >
                  My Library
                </Link>
              </li>
              <li>
                <Link className="hover:text-slate-400 font-bold" href="/create">
                  Create
                </Link>
              </li> */}
              <li className="flex justify-center items-center gap-2">
                <SignedOut>
                  <Button variant="secondary">
                    <SignInButton />
                  </Button>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
