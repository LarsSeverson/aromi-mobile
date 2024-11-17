import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardScrollView } from '@rlemasquerier/react-native-keyboard-scrollview'
import { Divider, Text, TextInput } from 'react-native-paper'
import ButtonText from '@/src/components/utils/ButtonText'
import { Colors } from '@/src/constants/Colors'
import { Icon } from 'react-native-elements'
import { Hub } from '@aws-amplify/core'
import { useAromiAuthContext } from '@/src/hooks/useAromiAuthContext'
import { useRouter } from 'expo-router'
import { showNotifaction } from '@/src/components/notify/ShowNotification'

export interface AuthCheckPageProps {
  onSignUp: () => void
  onLogIn: () => void
}

const AuthCheckPage: React.FC<AuthCheckPageProps> = (props: AuthCheckPageProps) => {
  const { onSignUp, onLogIn } = props
  const { userGetInfo, socialSignIn, userSignUp } = useAromiAuthContext()
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', async ({ payload }) => {
      switch (payload.event) {
        case 'signInWithRedirect': {
          const { success, error } = await userGetInfo()
          if (success) {
            return router.dismissAll()
          }
          if (error) {
            showNotifaction.error('Something went wrong logging you in')
          }
          break
        }
        case 'signInWithRedirect_failure':
          showNotifaction.error('Something went wrong logging you in')
          break
      }
    })

    return unsubscribe
  }, [router, userGetInfo])

  const signUp = () => {
    onSignUp()
  }

  const logIn = () => {
    onLogIn()
  }

  const continueWithGoogle = async () => {
    const { success, error } = await socialSignIn('Google')

    if (success) {
      //
      return
    }

    if (error) {
      showNotifaction.error(error.message)
    }
  }

  return (
    <View style={styles.wrapper}>
      <Text variant='titleMedium'>You need an account to continue</Text>
      <ButtonText text='Sign up' color={Colors.button} textColor={Colors.white} onPress={onSignUp} />
      <ButtonText text='Log in' color={Colors.placeholder2} onPress={onLogIn} />
      <View style={styles.orWrapper}>
        <Divider style={{ flex: 1 }} />
        <Text>or</Text>
        <Divider style={{ flex: 1 }} />
      </View>
      <ButtonText text='Continue with Google' outlined icon={<Icon name='logo-google' type='ionicon' size={15} />} onPress={continueWithGoogle} />
      <ButtonText text='Continue with Apple' outlined icon={<Icon name='logo-apple' type='ionicon' size={15} />} />
    </View>
  )
}

export default AuthCheckPage

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    gap: 15
  },
  orWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15
  }
})
