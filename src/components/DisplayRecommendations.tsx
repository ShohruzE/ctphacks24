import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const DisplayRecommendations = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-full gap-6">
      <div className="flex flex-col items-center w-full max-w-4xl gap-2">
        <h1 className="text-3xl font-bold mt-5">Club Recommendations</h1>
        <p className="mb-4 text-sm font-bold">Based on your answers, we think these clubs would be a perfect fit for you!</p>
        <Carousel className="max-w-md">
          <CarouselPrevious />
          <CarouselContent className="flex justify-around">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="flex justify-center min-w-full">
                <div className="p-4">
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6 gap-6">
                      <span className="text-2xl font-semibold text-center">Club Ndadadawawdawdadwawdawdad dawddame {index + 1}</span>
                      <Button type="submit" className="mt-auto">
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
      <div className='flex flex-col'>

        <div className="flex flex-col items-center w-full max-w-4xl gap-2 mt-5">
          <h1 className="text-2xl font-bold text-center">Didn't find a club you like?<br />Make your own!</h1>
          <p className="mb-8 font-bold">Here are some resources you can use to start your own club!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mb-4">
          <Card className='flex '>
            <CardContent className="flex flex-col  items-start justify-start p-6 gap-2">
              <h2 className="text-2xl font-semibold">Club Registration</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui laudantium doloremque porro consectetur tempora, nulla itaque, repellendus dolore nisi exercitationem alias facilis fugiat voluptatum? Sit, fugiat? Inventore impedit excepturi expedita!</p>
              <Button type="submit">Learn More</Button>
            </CardContent>
          </Card>
          <Card className='flex '>
            <CardContent className="flex flex-col items-start justify-start p-6 gap-2">
              <h2 className="text-2xl font-semibold">Club Fundraising</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui laudantium doloremque porro consectetur tempora, nulla itaque, repellendus dolore nisi exercitationem alias facilis fugiat voluptatum? Sit, fugiat? Inventore impedit excepturi expedita!</p>
              <Button type="submit">Learn More</Button>
            </CardContent>
          </Card>
          <Card className='flex '>
            <CardContent className="flex flex-col items-start justify-start p-6 gap-2">
              <h2 className="text-2xl font-semibold">Check Club Status</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui laudantium doloremque porro consectetur tempora, nulla itaque, repellendus dolore nisi exercitationem alias facilis fugiat voluptatum? Sit, fugiat? Inventore impedit excepturi expedita!</p>
              <Button type="submit" >Learn More</Button>
            </CardContent>
          </Card>
          <Card className='flex '>
            <CardContent className="flex flex-col items-start justify-start p-6 gap-2">
              <h2 className="text-2xl font-semibold">Test a budjet</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui laudantium doloremque porro consectetur tempora, nulla itaque, repellendus dolore nisi exercitationem alias facilis fugiat voluptatum? Sit, fugiat? Inventore impedit excepturi expedita!</p>
              <Button type="submit" className='align-self-end'>Learn More</Button>
            </CardContent>
          </Card>
          <Card className='flex '>
            <CardContent className="flex flex-col items-start justify-start p-6 gap-2">
              <h2 className="text-2xl font-semibold">Promote a Club</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui laudantium doloremque porro consectetur tempora, nulla itaque, repellendus dolore nisi exercitationem alias facilis fugiat voluptatum? Sit, fugiat? Inventore impedit excepturi expedita!</p>
              <Button type="submit">Learn More</Button>
            </CardContent>
          </Card>
          <Card className='flex '>
            <CardContent className="flex flex-col items-start justify-start p-6 gap-2">
              <h2 className="text-2xl font-semibold">Plan an Event or Trip</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui laudantium doloremque porro consectetur tempora, nulla itaque, repellendus dolore nisi exercitationem alias facilis fugiat voluptatum? Sit, fugiat? Inventore impedit excepturi expedita!</p>
              <Button type="submit">Learn More</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div >
  );
}

export default DisplayRecommendations;