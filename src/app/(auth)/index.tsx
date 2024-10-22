import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/src/constants/Colors'
import TitleText from '@/src/components/Utils/Text'
import TextButton from '@/src/components/Utils/TextButton'
import SignUpButton from '@/src/components/Auth/SignUpButton'
import LogInButton from '@/src/components/Auth/LogInButton'
import LegalAgreement from '@/src/components/Auth/LegalAgreement'

const AuthIndex = () => {
  const insets = useSafeAreaInsets()

  const signUp = () => {}

  const logIn = () => {}

  const continueAsGuest = () => {}

  return (
    <View style={styles.wrapper}>
      <View style={[styles.authFlowWrapper, { paddingBottom: insets.bottom }]}>
        <TitleText style={styles.welcomeText}>Welcome to aromi</TitleText>
        <SignUpButton onPress={signUp} />
        <LogInButton onPress={logIn} />
        <TextButton text='Continue as guest' onPress={continueAsGuest} />
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
