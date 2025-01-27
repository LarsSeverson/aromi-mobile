import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/src/constants/Colors'
import ConfirmationCode from '@/src/components/auth/ConfirmationCode'
import { KeyboardScrollView } from '@rlemasquerier/react-native-keyboard-scrollview'
import { useAromiAuthContext } from '@/src/hooks/useAromiAuthContext'
import { showNotifaction } from '@/src/components/notify/ShowNotification'
import { useLocalSearchParams } from 'expo-router'

export interface ConfirmSignUpPageProps {
  onLogIn: () => void
  onSuccess: () => void
  onEdit: () => void
}

const ConfirmSignUpPage: React.FC<ConfirmSignUpPageProps> = (props: ConfirmSignUpPageProps) => {
  const email = useLocalSearchParams().email as string

  const { onLogIn, onSuccess, onEdit } = props

  const { userConfirmSignUp, userResendConfirmCode, userAutoLogIn } = useAromiAuthContext()

  const [loading, setLoading] = useState<boolean | null>(null)

  const tryLogIn = async () => {
    setLoading(true)
    const { success } = await userAutoLogIn()
    setLoading(false)

    return success
  }

  const confirm = async (confirmationCode: string) => {
    setLoading(true)
    const { success, error } = await userConfirmSignUp(email, confirmationCode)
    setLoading(false)

    if (success) {
      const autoLogInSuccess = await tryLogIn()
      if (autoLogInSuccess) {
        return onLogIn()
      }

      return onSuccess()
    }

    if (error) {
      showNotifaction.error(error.message)
    }
  }

  const edit = () => {
    onEdit()
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
      <ConfirmationCode to={email || 'WHO ARE YOU'} loading={loading} onCompleted={(code) => confirm(code)} onEdit={edit} onReset={resend} />
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
