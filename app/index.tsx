import React, { useEffect, useState } from 'react'
import Welcome from '@/components/OnBoarding/Welcome'
import { Href, Redirect } from 'expo-router'

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  if (isLoading) {
    return <Welcome />
  }

  const homeHref: Href = './home' // Relative path

  return <Redirect href={homeHref} />
}

export default Index
