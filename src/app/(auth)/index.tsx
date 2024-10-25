import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/src/constants/Colors'
import TitleText from '@/src/components/Utils/Text'
import TextButton from '@/src/components/Utils/TextButton'
import LegalAgreement from '@/src/components/Auth/LegalAgreement'
import { useRouter } from 'expo-router'
import ButtonText from '@/src/components/Utils/ButtonText'

const AuthIndex = () => {
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const redirectToSignUp = () => {
    router.push('/(auth)/SignUp')
  }

  const redirectToLogIn = () => {}

  const redirectToHome = () => {
    router.replace('/(main)/')
  }

  return (
    <View style={styles.wrapper}>
      <View style={[styles.authFlowWrapper, { paddingBottom: insets.bottom }]}>
        <TitleText style={styles.welcomeText}>Welcome to aromi</TitleText>
        <ButtonText onPress={redirectToSignUp} text='Sign up' color={Colors.sinopia} textColor={Colors.white} />
        <ButtonText onPress={redirectToLogIn} text='Log in' color={Colors.placeholder2} />
        <TextButton text='Continue as guest' onPress={redirectToHome} />
        <LegalAgreement />
      </View>
    </View>
  )
}

export default AuthIndex

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderWidth: 1,
    position: 'relative',
    backgroundColor: Colors.white
  },
  authFlowWrapper: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 20
  },
  welcomeText: {
    fontSize: 25,
    marginBottom: 20
  }
})
