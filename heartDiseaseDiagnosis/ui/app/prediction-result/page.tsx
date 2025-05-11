"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, Home } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export default function PredictionResult() {
  const searchParams = useSearchParams()
  const risk = searchParams.get("risk") || "no"
  const confidence = Number.parseInt(searchParams.get("confidence") || "85")
  const isAtRisk = risk === "yes"

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-teal-500">Prediction Result</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            {isAtRisk ? (
              <AlertTriangle className="h-24 w-24 text-red-500" />
            ) : (
              <CheckCircle className="h-24 w-24 text-green-500" />
            )}
            <h2 className={`text-2xl font-bold ${isAtRisk ? "text-red-500" : "text-green-500"}`}>
              {isAtRisk ? "You are at risk" : "You are not at risk"}
            </h2>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Confidence Score</span>
              <span className="font-bold">{confidence}%</span>
            </div>
            <Progress value={confidence} className={isAtRisk ? "bg-red-200" : "bg-green-200"} />
          </div>

          <div className="rounded-lg bg-card p-4 text-left text-sm">
            <p className="mb-2 font-medium">What does this mean?</p>
            <p className="text-muted-foreground">
              {isAtRisk
                ? "Based on the information provided, our model predicts you may have an elevated risk. This is not a diagnosis. Please consult with a healthcare professional for proper evaluation."
                : "Based on the information provided, our model predicts you have a lower risk. Continue maintaining a healthy lifestyle and regular check-ups with your healthcare provider."}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
          <Link href="/">
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
