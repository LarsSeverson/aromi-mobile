import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/src/constants/Colors'
import ConfirmationCode from '@/src/components/auth/ConfirmationCode'
import { KeyboardScrollView } from '@rlemasquerier/react-native-keyboard-scrollview'
import { showNotifaction } from '@/src/components/notify/ShowNotification'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useAuthContext } from '@/src/contexts/AuthContext'

const ConfirmSignUpPage = () => {
  const router = useRouter()

  const email = useLocalSearchParams().email as string

  const { userConfirmSignUp, userResendConfirmCode } = useAuthContext()

  const [loading, setLoading] = useState<boolean | null>(null)

  const confirm = async (confirmationCode: string) => {
    setLoading(true)
    const { success, error } = await userConfirmSignUp(email, confirmationCode)
    setLoading(false)

    if (success) {
      return router.replace('/(core)/home')
    }

    if (error) {
      showNotifaction.error(error.message)
    }
  }

  const onEdit = () => {
    router.dismiss()
  }

  const resend = async () => {
    const { success, error } = await userResendConfirmCode(email)

    if (success) {
      return
    }

    if (error) {
      showNotifaction.error(error.message)
    }
  }

  return (
    <KeyboardScrollView keyboardShouldPersistTaps='always' style={styles.wrapper}>
      <ConfirmationCode to={email || 'Unknown Email'} loading={loading} onCompleted={(code) => confirm(code)} onEdit={onEdit} onReset={resend} />
    </KeyboardScrollView>
  )
}

export default ConfirmSignUpPage

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white
  }
})
