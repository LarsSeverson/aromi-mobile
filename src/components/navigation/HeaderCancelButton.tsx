import { StyleSheet } from 'react-native'
import React from 'react'
import BouncyButton from '../common/BouncyButton'
import { Text } from 'react-native-paper'
import { useRouter } from 'expo-router'

const HeaderCancelButton = () => {
  const router = useRouter()

  return (
    <BouncyButton onPress={() => router.dismiss()}>
      <Text>cancel</Text>
    </BouncyButton>
  )
}

export default HeaderCancelButton

const styles = StyleSheet.create({})
