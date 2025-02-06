import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '@/src/constants/Colors'
import TextButton from '@/src/components/TextButton'
import LegalAgreement from '@/src/components/auth/LegalAgreement'
import ButtonText from '@/src/components/ButtonText'
import { Image } from 'expo-image'
import { Text } from 'react-native-paper'
import { useRouter } from 'expo-router'

const AuthPage = () => {
  const router = useRouter()

  const onSignUp = () => {
    router.push('/(main)/auth/SignUp')
  }

  const onLogIn = () => {
    router.push('/(main)/auth/LogIn')
  }

  const onHome = () => {
    router.replace('/(core)/home')
  }

  return (
    <View style={styles.wrapper}>
      <Image source='logo' style={{ width: 125, height: 125 }} />
      <View style={styles.authFlowWrapper}>
        <Text variant='titleLarge'>Welcome to aromi</Text>
        <ButtonText onPress={onSignUp} text='Sign up' color={Colors.sinopia} textColor={Colors.white} />
        <ButtonText onPress={onLogIn} text='Log in' color={Colors.placeholder2} />
        <TextButton text='Continue as guest' onPress={onHome} />
        <LegalAgreement />
      </View>
    </View>
  )
}

export default AuthPage

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  authFlowWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
    padding: 20
  },
  welcomeText: {
    fontSize: 25,
    marginBottom: 20
  }
})
