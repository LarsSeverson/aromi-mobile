import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import ButtonText from '@/src/components/common/ButtonText'
import { Colors } from '@/src/constants/Colors'

interface FeedbackSuccessProps {
  feedback: string
  buttonText: string
  onButtonPress?: () => void
}

const FeedbackSuccess = (props: FeedbackSuccessProps) => {
  const { feedback, buttonText, onButtonPress } = props

  return (
    <View style={styles.wrapper}>
      <Text variant='titleMedium'>{feedback}</Text>
      <ButtonText text={buttonText} color={Colors.sinopia} textColor={Colors.white} style={{ width: 200 }} onPress={onButtonPress} />
    </View>
  )
}

export default FeedbackSuccess

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    marginBottom: 200
  }
})
