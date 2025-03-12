import { useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { getDefaultHeaderHeight } from '@react-navigation/elements'
import { Dimensions } from 'react-native'
import Constants from 'expo-constants'

const layout = Dimensions.get('window')
const defaultHeaderHeight = getDefaultHeaderHeight(layout, false, Constants.statusBarHeight)

export interface UseHeaderReturn {
  headerTitle: string
  headerHeight: number
  setHeaderTitle: (title: string) => void
  setHeaderHeight: (height: number) => void
}

const useHeader = (): UseHeaderReturn => {
  const nav = useNavigation()

  const [headerTitle, setHeaderTitle] = useState('')
  const [headerHeight, setHeaderHeight] = useState(defaultHeaderHeight)

  useEffect(() => {
    nav.setOptions({ headerTitle })
  }, [nav, headerTitle])

  return {
    headerTitle,
    setHeaderTitle,
    headerHeight,
    setHeaderHeight
  }
}

export default useHeader
