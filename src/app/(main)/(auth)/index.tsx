import { StyleSheet, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/src/constants/Colors'
import TitleText from '@/src/components/Utils/Text'
import TextButton from '@/src/components/Utils/TextButton'
import LegalAgreement from '@/src/components/Auth/LegalAgreement'
import { Redirect, useRouter } from 'expo-router'
import ButtonText from '@/src/components/Utils/ButtonText'

const AuthIndex = () => {
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const redirectToSignUp = () => {
    router.push('/SignUp')
  }

  const redirectToLogIn = () => {
    router.push('/LogIn')
  }

  const redirectToHome = () => {
    router.replace('/(main)/')
  }

  return (
    <View style={styles.wrapper}>
      <Image
        source={require('@/src/assets/images/logo.png')} style={{ width: 125, height: 125 }}
      />
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
    backgroundColor: Colors.white,
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
