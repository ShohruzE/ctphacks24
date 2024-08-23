"use client"
import DisplayRecommendations from "../../../../components/DisplayRecommendations"
import { useSearchParams } from 'next/navigation';


export default function Recommendation() {
  const formInfo = useSearchParams()
  return (
    <div className="min-h-screen flex-col justify-center w-screen">
      <DisplayRecommendations />
    </div>


  )
}
