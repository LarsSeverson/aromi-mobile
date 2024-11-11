import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '@/src/constants/Colors'
import TextButton from '@/src/components/Utils/TextButton'
import LegalAgreement from '@/src/components/auth/LegalAgreement'
import { useRouter } from 'expo-router'
import ButtonText from '@/src/components/Utils/ButtonText'
import { Image } from 'expo-image'
import { Text } from 'react-native-paper'
import { Hub } from '@aws-amplify/core'
import { useAromiAuthContext } from '@/src/hooks/useAromiAuthContext'
import { Notifier } from 'react-native-notifier'
import { showNotifaction } from '@/src/components/Notify/ShowNotification'

export interface AuthPageProps {
  onSignUp: () => void
  onLogIn: () => void
  onHome: () => void
}

const AuthPage: React.FC<AuthPageProps> = (props: AuthPageProps) => {
  const { onSignUp, onLogIn, onHome } = props
  const { userGetInfo } = useAromiAuthContext()

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', async ({ payload }) => {
      switch (payload.event) {
        case 'signInWithRedirect': {
          const { success, error } = await userGetInfo()
          if (success) {
            return onHome()
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
  }, [onHome, userGetInfo])

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
