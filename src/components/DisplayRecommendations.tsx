"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useParams } from "next/navigation";
import { db } from "@/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface Club {
  id: string;
  name: string;
  recommendation: string;
}

const DisplayRecommendations = () => {
  const [clubs, setClubs] = useState<
    { name: string; recommendation: string }[]
  >([]);
  const { userId }: { userId: string } = useParams();
  const router = useRouter();

  const getClubs = async () => {
    try {
      const docRef = doc(db, "users", userId);
      console.log("Document Reference:", docRef);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const clubsData = docSnap.data().clubs;
        setClubs(clubsData);
        console.log("Clubs Data:", clubsData);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  // Log clubs whenever it updates
  useEffect(() => {
    console.log("Updated Clubs State:", clubs);
  }, [clubs]);

  // Call getClubs inside useEffect
  useEffect(() => {
    if (userId) {
      getClubs();
    }
  }, [userId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-full gap-6">
      <div className="flex flex-col items-center w-full max-w-4xl gap-2">
        <h1 className="text-3xl font-bold mt-12">Club Recommendations</h1>
        <p className="mb-4 text-sm font-bold">
          Based on your answers, we think these clubs would be a perfect fit for
          you!
        </p>
        <Carousel className="max-w-xl">
          <CarouselPrevious />
          <CarouselContent className="flex justify-around">
            {clubs.map((club, index) => (
              <CarouselItem
                key={index}
                className="flex justify-center min-w-full"
              >
                <div className="p-4">
                  <Card className="h-full overflow-scroll scrollbar-hide">
                    <CardContent className="flex flex-col items-center justify-center p-6 gap-6 h-full">
                      <span className="text-2xl font-semibold text-center">
                        {club.name}
                      </span>
                      <div className="">
                        <p className="text-center line-clamp-5">
                          {club.recommendation}
                        </p>
                      </div>
                      <Button
                        onClick={() => router.push(`/clubDirectory`)}
                        className="mt-auto"
                      >
                        Click here for more information
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col items-center w-full max-w-4xl gap-2 mt-5">
          <h1 className="text-2xl font-bold text-center">
            Didn't find a club you like?
            <br />
            Make your own!
          </h1>
          <p className="mb-8 font-bold">
            Here are some resources you can use to start your own club!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mb-4 ">
          <Card className="flex ">
            <CardContent className="flex flex-col  items-start justify-start p-6 gap-6">
              <h2 className="text-2xl font-semibold">Club Registration</h2>
              <p>
                The Office of Student Activities and Leadership Development is
                responsible for registering over 100 student clubs,
                organizations and publications each year. All student groups
                must register before they are chartered by their governing body.
              </p>
              <div className="mt-auto w-full">
                <a
                  href="https://hunter.cuny.edu/students/campus-life/student-clubs/club-registration/"
                  target="_blank"
                >
                  <Button type="submit">Learn More</Button>
                </a>
              </div>
            </CardContent>
          </Card>
          <Card className="flex">
            <CardContent className="flex flex-col items-start justify-start p-6 gap-6">
              <h2 className="text-2xl font-semibold">Club Fundraising</h2>
              <p>
                Student organizations are no longer allowed to collect funds,
                but they may solicit funds on behalf of a non-profit
                organizations.
              </p>
              <div className="mt-auto w-full">
                <a
                  href="https://hunter.cuny.edu/students/campus-life/student-clubs/club-status/"
                  target="_blank"
                >
                  <Button type="submit">Learn More</Button>
                </a>
              </div>
            </CardContent>
          </Card>
          <Card className="flex ">
            <CardContent className="flex flex-col items-start justify-start p-6 gap-6">
              <h2 className="text-2xl font-semibold">Check Club Status</h2>
              <p>
                If your club has not completed registration, be sure to follow
                the Club Registration Instructions. The Club Eligibility List is
                updated weekly. If your club is not on the list, your club
                missed the deadline and will be placed on the following weeks
                list.
              </p>
              <div className="mt-auto w-full">
                <a
                  href="https://hunter.cuny.edu/students/campus-life/student-clubs/club-status/"
                  target="_blank"
                >
                  <Button type="submit">Learn More</Button>
                </a>
              </div>
            </CardContent>
          </Card>
          <Card className="flex ">
            <CardContent className="flex flex-col items-start justify-start p-6 gap-6">
              <h2 className="text-2xl font-semibold">Request a budget</h2>
              <p>
                If you have a budget question contact College Association at
                hcca214@hunter.cuny.edu If you have other questions contact
                Student Activities at student.activities@hunter.cuny.edu
              </p>
              <div className="mt-auto w-full">
                <a
                  href="https://hunter.cuny.edu/students/campus-life/student-clubs/request-budget/"
                  target="_blank"
                >
                  <Button type="submit">Learn More</Button>
                </a>
              </div>
            </CardContent>
          </Card>
          <Card className="flex ">
            <CardContent className="flex flex-col items-start justify-start p-6 gap-6">
              <h2 className="text-2xl font-semibold">Promote a Club</h2>
              <p>
                Chartered clubs, organizations or publications can arrange for
                tables in the North and West Building 3rd Floor Lobbies for
                informational sessions, event promotion, fundraising and
                advertising events on the Sony Signage monitors throughout the
                College.
              </p>

              <div className="mt-auto w-full">
                <a
                  href="https://hunter.cuny.edu/students/campus-life/student-clubs/promote/"
                  target="_blank"
                >
                  <Button type="submit">Learn More</Button>
                </a>
              </div>
            </CardContent>
          </Card>
          <Card className="flex ">
            <CardContent className="flex flex-col items-start justify-start p-6 gap-6">
              <h2 className="text-2xl font-semibold">Plan an Event or Trip</h2>
              <p>
                The Office of Student Activities now has an electronic event
                form for virtual events. Clubs must fill out the complete form
                and attach all required documents to the electronic event form.
                Club events will not be approved without proper documentation.
                The Student Event Information Form is to be used for all virtual
                and in-person events, programs, workshops, etc.
              </p>

              <div className="mt-auto w-full">
                <a
                  href="https://hunter.cuny.edu/students/campus-life/student-clubs/plan-event/"
                  target="_blank"
                >
                  <Button type="submit">Learn More</Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DisplayRecommendations;
