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
  const aromiAuth = useAromiAuthContext()

  const router = useRouter()

  const [loading, setLoading] = useState<boolean | null>(null)

  const confirm = async (confirmationCode: string) => {
    setLoading(true)
    const { success, error } = await aromiAuth.userConfirmSignUp(confirmationCode)
    setLoading(false)

    if (success) {
      router.dismiss()
      return
    }

    if (error) {
      Notifier.showNotification(showNotifaction.error(error.message))
    }
  }

  const edit = () => {
    router.dismiss()
  }

  const resend = async () => {
    const { success, error } = await aromiAuth.userResendConfirmCode(aromiAuth.userInfo?.email)

    if (success) {
      return
    }

    if (error) {
      Notifier.showNotification(showNotifaction.error(error.message))
    }
  }

  return (
    <KeyboardScrollView keyboardShouldPersistTaps='always' style={styles.wrapper}>
      <ConfirmationCode to={aromiAuth.userInfo?.email || 'WHO ARE YOU'} loading={loading} onCompleted={(code) => confirm(code)} onEdit={edit} onReset={resend} />
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
