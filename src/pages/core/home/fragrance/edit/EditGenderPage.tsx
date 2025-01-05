import { StyleSheet, View } from 'react-native'
import React from 'react'
import { GenderIcon } from '@/src/constants/Icons'
import EditFragranceSlider from '@/src/components/fragrance/EditFragranceSlider'
import { useLocalSearchParams, useRouter } from 'expo-router'

const EditGenderPage = () => {
  const router = useRouter()
  const genderData = Number(useLocalSearchParams().genderData as string)

  const submitGender = (value: number) => {
    router.dismiss()
  }

  return (
    <View>
      <EditFragranceSlider
        storedValue={genderData || 50}
        icon={<GenderIcon />}
        leftLabel='feminine'
        rightLabel='masculine'
        style={{ padding: 20 }}
        onSubmit={submitGender}
      />
    </View>
  )
}

export default EditGenderPage

const styles = StyleSheet.create({})
