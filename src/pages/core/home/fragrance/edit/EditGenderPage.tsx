import { StyleSheet, View } from 'react-native'
import React from 'react'
import MiddleSlider from '@/src/components/stats/MidSlider'
import { GenderIcon } from '@/src/constants/Icons'

const EditGenderPage = () => {
  const value = 50
  const feminineVotes = 31090
  const masculineVotes = 29999

  return (
    <View>
      <MiddleSlider
        value={value}
        min={0}
        max={100}
        focusPoints={[25, 50, 75]}
        leftHalfData={feminineVotes}
        rightHalfData={masculineVotes}
        leftHalfLabel='feminine'
        rightHalfLabel='masculine'
        Icon={<GenderIcon />}
      />
    </View>
  )
}

export default EditGenderPage

const styles = StyleSheet.create({})
