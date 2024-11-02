import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { autoSignIn, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth'
import { Colors } from '@/src/constants/Colors'
import ConfirmationCode from '@/src/components/Auth/ConfirmationCode'
import { Notifier } from 'react-native-notifier'
import { KeyboardScrollView } from '@rlemasquerier/react-native-keyboard-scrollview'
import { useAromiAuthContext } from '@/src/hooks/useAromiAuthContext'
import { showNotifaction } from '@/src/components/Notify/ShowNotification'

const ConfirmSignUp = () => {
  const { userConfirmSignUp, userResendConfirmCode, userAutoLogIn, userInfo } = useAromiAuthContext()

  const router = useRouter()

  const [loading, setLoading] = useState<boolean | null>(null)

  const tryLogIn = async () => {
    setLoading(true)
    const { success } = await userAutoLogIn()
    setLoading(false)

    return success
  }

  const confirm = async (confirmationCode: string) => {
    setLoading(true)
    const { success, error } = await userConfirmSignUp(confirmationCode)
    setLoading(false)

    if (success) {
      const autoLogInSuccess = await tryLogIn()
      if (autoLogInSuccess) {
        return router.replace('/(core)/')
      }

      return router.dismiss()
    }

    if (error) {
      Notifier.showNotification(showNotifaction.error(error.message))
    }
  }

  const edit = () => {
    router.dismiss()
  }

  const resend = async () => {
    const { success, error } = await userResendConfirmCode()

    if (success) {
      return
    }

    if (error) {
      Notifier.showNotification(showNotifaction.error(error.message))
    }
  }

  return (
    <KeyboardScrollView keyboardShouldPersistTaps='always' style={styles.wrapper}>
      <ConfirmationCode to={userInfo.email || 'WHO ARE YOU'} loading={loading} onCompleted={(code) => confirm(code)} onEdit={edit} onReset={resend} />
    </KeyboardScrollView>
  )
}

export default ConfirmSignUp

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white
  }
})
