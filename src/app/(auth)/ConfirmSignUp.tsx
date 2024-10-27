import { StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth'
import { Colors } from '@/src/constants/Colors'
import ConfirmationCode from '@/src/components/Auth/ConfirmationCode'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Notifier } from 'react-native-notifier'
import { ErrorNotify } from '@/src/components/Utils/Notify'

const ConfirmSignUp = () => {
  const { userId } = useLocalSearchParams()
  const router = useRouter()

  const accountExists = () => {
    Notifier.showNotification({
      Component: ErrorNotify,
      componentProps: { message: "It looks like you're already on aromi.\nPlease log in." },
      duration: 4000
    })
    router.dismissAll()
    router.push('/(auth)/LogIn')
  }

  const confirm = () => {
    accountExists()
  }
  const edit = () => {}
  const resend = () => {}

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps='always' style={styles.wrapper}>
      <ConfirmationCode to={userId as string} onCompleted={confirm} onEdit={edit} onReset={resend} />
    </KeyboardAwareScrollView>
  )
}

export default ConfirmSignUp

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white
  }
})
