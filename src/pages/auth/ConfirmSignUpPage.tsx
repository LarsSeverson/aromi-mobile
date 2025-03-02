import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/src/constants/Colors'
import { KeyboardScrollView } from '@rlemasquerier/react-native-keyboard-scrollview'
import { showNotifaction } from '@/src/common/show-notification'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useAuthContext } from '@/src/contexts/AuthContext'
import ConfirmationCode from '@/src/components/common/auth/ConfirmationCode'

const ConfirmSignUpPage = () => {
  const { userConfirmSignUp, userResendConfirmCode } = useAuthContext()
  const router = useRouter()

  const email = useLocalSearchParams().email as string

  const [loading, setLoading] = useState<boolean | null>(null)

  const confirm = async (confirmationCode: string) => {
    setLoading(true)
    const { success, error } = await userConfirmSignUp(email, confirmationCode)
    setLoading(false)

    if (success) {
      router.replace('/(core)/home'); return
    }

    if (error != null) {
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

    if (error != null) {
      showNotifaction.error(error.message)
    }
  }

  return (
    <KeyboardScrollView
      keyboardShouldPersistTaps='always'
      style={styles.wrapper}
    >
      <ConfirmationCode
        to={email ?? 'Unknown Email'}
        loading={loading}
        onCompleted={(code) => { void confirm(code) }}
        onEdit={onEdit}
        onReset={() => { void resend() }}
      />
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
