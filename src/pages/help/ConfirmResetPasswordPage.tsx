import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/src/constants/Colors'
import { KeyboardScrollView } from '@rlemasquerier/react-native-keyboard-scrollview'
import { useLocalSearchParams, useRouter } from 'expo-router'
import InvalidPage from '../InvalidPage'
import { showNotifaction } from '@/src/components/common/notify/ShowNotification'
import { useAuthContext } from '@/src/contexts/AuthContext'
import ConfirmationCode from '@/src/components/common/auth/ConfirmationCode'

export interface ConfirmPasswordResetPageProps {
  onContinue: (email: string, code: string) => void
}

const ConfirmPasswordResetPage: React.FC<ConfirmPasswordResetPageProps> = (props: ConfirmPasswordResetPageProps) => {
  const { onContinue } = props
  const router = useRouter()
  const { sendResetPasswordCode } = useAuthContext()
  const email = useLocalSearchParams().email as string
  const [loading, setLoading] = useState(false)

  const confirmCompleted = (code: string) => {
    onContinue(email, code)
  }

  const confirmReset = async () => {
    setLoading(true)
    const { error } = await sendResetPasswordCode(email)
    setLoading(false)

    if (error) {
      showNotifaction.error(error.message)
    }
  }

  if (!email) {
    return <InvalidPage />
  }

  return (
    <KeyboardScrollView keyboardShouldPersistTaps='handled' style={styles.wrapper}>
      <ConfirmationCode to={email} loading={loading} onCompleted={confirmCompleted} onEdit={() => router.dismiss()} onReset={confirmReset} />
    </KeyboardScrollView>
  )
}

export default ConfirmPasswordResetPage

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white
  }
})
