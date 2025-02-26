import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import ButtonText from '../components/common/ButtonText'
import { useRouter } from 'expo-router'
import { Text } from 'react-native-paper'

interface InvalidPageProps {
  text?: string

  onGoBack?: () => void
}

const InvalidPage: React.FC<InvalidPageProps> = (props: InvalidPageProps) => {
  const router = useRouter()

  const {
    text = 'Hmmm... something went wrong loading this screen.',
    onGoBack = () => router.dismiss()
  } = props

  return (
    <View style={styles.wrapper}>
      <Text variant='titleMedium'>{text}</Text>
      <ButtonText text='Go back' color={Colors.sinopia} textColor={Colors.white} onPress={onGoBack} />
    </View>
  )
}

export default InvalidPage

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
    gap: 50,
    alignItems: 'center'
  }
})
