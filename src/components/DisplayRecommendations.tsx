"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useParams } from "next/navigation";

const DisplayRecommendations = () => {
  const { userId } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-full">
      <div className="flex flex-col items-center w-full max-w-4xl">
        <h1 className="text-3xl font-bold">Club Recommendations</h1>
        <p className="mb-8">
          Based on your answers, we think these clubs would be a perfect fit for
          you!
        </p>
        <Carousel className="w-full">
          <CarouselPrevious />
          <CarouselContent className="flex justify-center">
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="flex justify-center min-w-full"
              >
                <div className="p-4">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-2xl font-semibold">
                        Club Name {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex flex-col items-center w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center">
          Did you find a club you like?
          <br />
          Make your own!
        </h1>

        <p className="mb-8 font-bold">
          Here are some resources you can use to start your own club!
        </p>
        <Carousel className="w-full">
          <CarouselPrevious />
          <CarouselContent className="flex justify-center">
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="flex justify-center min-w-full"
              >
                <div className="p-4">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-2xl font-semibold">
                        Club Name {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default DisplayRecommendations;
