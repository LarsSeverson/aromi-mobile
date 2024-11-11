import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '@/src/constants/Colors'
import TextButton from '@/src/components/Utils/TextButton'
import LegalAgreement from '@/src/components/Auth/LegalAgreement'
import { useRouter } from 'expo-router'
import ButtonText from '@/src/components/Utils/ButtonText'
import { Image } from 'expo-image'
import { Text } from 'react-native-paper'
import { Hub } from '@aws-amplify/core'
import { autoSignIn, fetchUserAttributes, getCurrentUser } from 'aws-amplify/auth'
import { useAromiAuthContext } from '@/src/hooks/useAromiAuthContext'
import { Notifier } from 'react-native-notifier'
import { showNotifaction } from '@/src/components/Notify/ShowNotification'

const AuthIndex = () => {
  const router = useRouter()
  const { userGetInfo } = useAromiAuthContext()

  const redirectToSignUp = () => {
    router.push('/auth/SignUp')
  }

  const redirectToLogIn = () => {
    router.push('/auth/LogIn')
  }

  const redirectToHome = () => {
    router.replace('/(core)/')
  }

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', async ({ payload }) => {
      switch (payload.event) {
        case 'signInWithRedirect': {
          const { success, error } = await userGetInfo()
          if (success) {
            return router.navigate('/(core)/')
          }
          if (error) {
            Notifier.showNotification(showNotifaction.error('Something went wrong logging you in'))
          }
          break
        }
        case 'signInWithRedirect_failure':
          Notifier.showNotification(showNotifaction.error('Something went wrong logging you in'))
          break
      }
    })

    return unsubscribe
  }, [router, userGetInfo])

  return (
    <View style={styles.wrapper}>
      <Image source='logo' style={{ width: 125, height: 125 }} />
      <View style={styles.authFlowWrapper}>
        <Text variant='titleLarge'>Welcome to aromi</Text>
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
