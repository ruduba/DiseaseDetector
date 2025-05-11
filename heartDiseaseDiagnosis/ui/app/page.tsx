import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-card p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-teal-500">Health Risk Predictor</h1>
          <p className="text-muted-foreground">Predict your health risks with our advanced AI-powered analysis tools</p>
        </div>
        <div className="flex justify-center pt-6">
          <Link href="/general-info">
            <Button size="lg" className="w-full bg-teal-600 text-white hover:bg-teal-700">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
