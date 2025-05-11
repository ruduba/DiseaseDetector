import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartPulse, Droplet } from "lucide-react"

export default function DiseaseSelection() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-teal-500">Choose a Test</h1>
          <p className="mt-2 text-muted-foreground">Select the health risk assessment you would like to take</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/heart-disease-form" className="block">
            <Card className="h-full cursor-pointer transition-all hover:border-teal-500 hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl text-teal-500">
                  <HeartPulse className="h-6 w-6" />
                  Heart Disease Prediction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Assess your risk of heart disease based on various health factors including blood pressure,
                  cholesterol levels, and more.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/diabetes-form" className="block">
            <Card className="h-full cursor-pointer transition-all hover:border-teal-500 hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl text-teal-500">
                  <Droplet className="h-6 w-6" />
                  Diabetes Prediction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Evaluate your risk of diabetes based on factors such as glucose levels, BMI, insulin, and family
                  history.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
