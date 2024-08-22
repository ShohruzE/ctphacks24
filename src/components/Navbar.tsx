import Link from "next/link";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Navbar() {
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
                  href="/create"
                >
                  Create
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-slate-400 font-bold"
                  href="/profile"
                >
                  View Profile
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
