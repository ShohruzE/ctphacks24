import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-5 pb-5">
      <div className="container mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-extrabold text-2xl hover:text-slate-400">
              ClubScout
            </h1>
          </div>
          <div className="">
            <ul className="">
              {/* <li>
                <Link
                  className="hover:text-[#FFA000] font-bold"
                  href="/pricing"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#FFA000] font-bold"
                  href="/explore"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#FFA000] font-bold"
                  href="/library"
                >
                  My Library
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FFA000] font-bold" href="/create">
                  Create
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="text-center">
          <p>Created by the Hawkers</p>
        </div>
      </div>
    </footer>
  );
}
