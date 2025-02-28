import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardScrollView } from '@rlemasquerier/react-native-keyboard-scrollview'
import { Divider, Text, TextInput } from 'react-native-paper'
import ButtonText from '@/src/components/common/ButtonText'
import { Colors } from '@/src/constants/Colors'
import { Icon } from 'react-native-elements'
import { Hub } from '@aws-amplify/core'
import { useRouter } from 'expo-router'
import { showNotifaction } from '@/src/components/common/notify/ShowNotification'
import { useAuthContext } from '@/src/contexts/AuthContext'

const AuthCheckPage = () => {
  const router = useRouter()

  const {
    userGetInfo,
    socialSignIn,
    userSignUp
  } = useAuthContext()

  const signUp = () => {
    onSignUp()
  }

  const logIn = () => {
    onLogIn()
  }

  const continueWithGoogle = async () => {
    // const { success, error } = await socialSignIn('Google')

    // if (success) {
    //   //
    //   return
    // }

    // if (error) {
    //   showNotifaction.error(error.message)
    // }
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
