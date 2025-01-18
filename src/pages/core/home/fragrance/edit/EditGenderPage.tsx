import { StyleSheet, View } from 'react-native'
import React from 'react'
import { GenderIcon } from '@/src/constants/Icons'
import EditFragranceSlider from '@/src/components/fragrance/EditFragranceSlider'
import { useLocalSearchParams, useRouter } from 'expo-router'

const EditGenderPage = () => {
  const router = useRouter()

  const genderData = Number(useLocalSearchParams().genderData as string)

  return (
    <View>
      <EditFragranceSlider
        storedValue={genderData}
        icon={<GenderIcon />}
        leftLabel='feminine'
        rightLabel='masculine'
        style={{ padding: 10 }}
      />
    </View>
  )
}

export default EditGenderPage
