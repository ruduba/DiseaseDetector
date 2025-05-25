"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function HeartDiseaseForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    chestPainType: "",
    restingBP: "",
    cholesterol: "",
    fastingBS: "",
    maxHR: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      age: Number(formData.age),
      sex: formData.sex === "male" ? 1 : 0,
      cp: {
        typical: 0,
        atypical: 1,
        nonanginal: 2,
        asymptomatic: 3
      }[formData.chestPainType],
      trestbps: Number(formData.restingBP),
      chol: Number(formData.cholesterol),
      fbs: formData.fastingBS === "yes" ? 1 : 0,
      restecg: 1,
      thalach: Number(formData.maxHR),
      exang: 0,
      oldpeak: 1.0,
      slope: 2,
      ca: 0,
      thal: 2
    }

    try {
      const response = await fetch("https://diseasedetector-3l6k.onrender.com/predict-heart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      router.push(`/prediction-result?risk=${result.result}&confidence=${result.confidence}`)
    } catch (err) {
      console.error("Prediction failed:", err)
      alert("Prediction failed. Please try again.")
    }
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
          <CardTitle className="text-2xl text-teal-500">Heart Disease Risk Assessment</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
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

              <div className="space-y-2">
                <Label htmlFor="sex">Sex</Label>
                <Select value={formData.sex} onValueChange={(value) => handleChange("sex", value)} required>
                  <SelectTrigger id="sex">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="chestPainType">Chest Pain Type</Label>
              <Select
                value={formData.chestPainType}
                onValueChange={(value) => handleChange("chestPainType", value)}
                required
              >
                <SelectTrigger id="chestPainType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="typical">Typical Angina</SelectItem>
                  <SelectItem value="atypical">Atypical Angina</SelectItem>
                  <SelectItem value="nonanginal">Non-Anginal Pain</SelectItem>
                  <SelectItem value="asymptomatic">Asymptomatic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="restingBP">Resting Blood Pressure</Label>
                <Input
                  id="restingBP"
                  type="number"
                  placeholder="mm Hg"
                  required
                  value={formData.restingBP}
                  onChange={(e) => handleChange("restingBP", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cholesterol">Cholesterol</Label>
                <Input
                  id="cholesterol"
                  type="number"
                  placeholder="mg/dl"
                  required
                  value={formData.cholesterol}
                  onChange={(e) => handleChange("cholesterol", e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fastingBS">Fasting Blood Sugar &gt; 120 mg/dl</Label>
                <Select value={formData.fastingBS} onValueChange={(value) => handleChange("fastingBS", value)} required>
                  <SelectTrigger id="fastingBS">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxHR">Max Heart Rate Achieved</Label>
                <Input
                  id="maxHR"
                  type="number"
                  placeholder="BPM"
                  required
                  value={formData.maxHR}
                  onChange={(e) => handleChange("maxHR", e.target.value)}
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
