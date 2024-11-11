import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/src/constants/Colors'
import { KeyboardScrollView } from '@rlemasquerier/react-native-keyboard-scrollview'
import ConfirmationCode from '@/src/components/Auth/ConfirmationCode'
import { useLocalSearchParams, useRouter } from 'expo-router'
import InvalidPage from '../InvalidPage'
import { useAromiAuthContext } from '@/src/hooks/useAromiAuthContext'
import { Notifier } from 'react-native-notifier'
import { showNotifaction } from '@/src/components/Notify/ShowNotification'

let codeSent = false

const ConfirmResetPasswordPage = () => {
  const router = useRouter()
  const { sendResetPasswordCode } = useAromiAuthContext()
  const email = useLocalSearchParams().email as string
  const [loading, setLoading] = useState(false)

  const confirmCompleted = (code: string) => {
    router.push({ pathname: '/auth/help/ChangePassword', params: { email, code } })
  }

  const confirmEdit = () => {
    router.dismiss()
  }

  const confirmReset = async () => {
    setLoading(true)
    const { error } = await sendResetPasswordCode(email)
    setLoading(false)

    if (error) {
      Notifier.showNotification(showNotifaction.error(error.message))
    }
  }

  useEffect(() => {
    const sendCode = async () => {
      const { success, error } = await sendResetPasswordCode(email)
      if (success) {
        codeSent = true
        return
      }

      if (error) {
        Notifier.showNotification(showNotifaction.error(error.message))
      }
    }

    if (email && !codeSent) {
      sendCode()
    }
  }, [sendResetPasswordCode, email])

  if (!email) {
    return <InvalidPage />
  }

  return (
    <KeyboardScrollView keyboardShouldPersistTaps='handled' style={styles.wrapper}>
      <ConfirmationCode to={email} loading={loading} onCompleted={confirmCompleted} onEdit={confirmEdit} onReset={confirmReset} />
    </KeyboardScrollView>
  )
}

export default ConfirmResetPasswordPage

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white
  }
})
