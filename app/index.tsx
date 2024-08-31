import Welcome from "@/components/OnBoarding/Welcome"
import { Redirect } from "expo-router"
import { useEffect, useState } from "react"

export default function Index() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [setIsLoading])

  if (isLoading) {
    return <Welcome />
  }

  return (
    <Redirect href='/home' />
  )
}