"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DiabetesForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigree: "",
    age: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would process this data and calculate the risk
    // For demo purposes, we'll just navigate to the results page with a random risk
    const isAtRisk = Math.random() > 0.5
    const confidence = Math.floor(Math.random() * 30) + 70 // Random confidence between 70-99%
    router.push(`/prediction-result?risk=${isAtRisk ? "yes" : "no"}&confidence=${confidence}`)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1">
          <Link
            href="/disease-selection"
            className="flex items-center text-sm text-muted-foreground hover:text-teal-500"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to selection
          </Link>
          <CardTitle className="text-2xl text-teal-500">Diabetes Risk Assessment</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pregnancies">Pregnancies</Label>
                <Input
                  id="pregnancies"
                  type="number"
                  placeholder="Number"
                  required
                  value={formData.pregnancies}
                  onChange={(e) => handleChange("pregnancies", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="glucose">Glucose</Label>
                <Input
                  id="glucose"
                  type="number"
                  placeholder="mg/dl"
                  required
                  value={formData.glucose}
                  onChange={(e) => handleChange("glucose", e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="bloodPressure">Blood Pressure</Label>
                <Input
                  id="bloodPressure"
                  type="number"
                  placeholder="mm Hg"
                  required
                  value={formData.bloodPressure}
                  onChange={(e) => handleChange("bloodPressure", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skinThickness">Skin Thickness</Label>
                <Input
                  id="skinThickness"
                  type="number"
                  placeholder="mm"
                  required
                  value={formData.skinThickness}
                  onChange={(e) => handleChange("skinThickness", e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="insulin">Insulin</Label>
                <Input
                  id="insulin"
                  type="number"
                  placeholder="mu U/ml"
                  required
                  value={formData.insulin}
                  onChange={(e) => handleChange("insulin", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bmi">BMI</Label>
                <Input
                  id="bmi"
                  type="number"
                  step="0.1"
                  placeholder="kg/m²"
                  required
                  value={formData.bmi}
                  onChange={(e) => handleChange("bmi", e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="diabetesPedigree">Diabetes Pedigree Function</Label>
                <Input
                  id="diabetesPedigree"
                  type="number"
                  step="0.001"
                  placeholder="Value"
                  required
                  value={formData.diabetesPedigree}
                  onChange={(e) => handleChange("diabetesPedigree", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Years"
                  required
                  value={formData.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
