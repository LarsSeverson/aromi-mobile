import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router'
import InvalidPage from '../InvalidPage'
import { Colors } from '@/src/constants/Colors'
import { KeyboardScrollView } from '@rlemasquerier/react-native-keyboard-scrollview'
import { TextInput, Text } from 'react-native-paper'
import { TextStyles } from '@/src/constants/TextStyles'
import TextButton from '@/src/components/common/TextButton'
import ButtonText from '@/src/components/common/ButtonText'
import { showNotifaction } from '@/src/components/common/notify/ShowNotification'
import { useAuthContext } from '@/src/contexts/AuthContext'

const ChangePasswordPage = () => {
  const router = useRouter()

  const code = useLocalSearchParams().code as string
  const email = useLocalSearchParams().email as string

  const { userResetPassword, validatePassword, validateConfirmPassword } = useAuthContext()

  const [newPassword, setNewPassword] = useState('')
  const [newPasswordValid, setNewPasswordValid] = useState<boolean | null>(null)
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [confirmNewPasswordValid, setConfirmNewPasswordValid] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)

  const validateFields = () => {
    const passwordValid = validatePassword(newPassword)
    setNewPasswordValid(passwordValid)

    if (passwordValid) {
      const confirmPasswordValid = validateConfirmPassword(newPassword, confirmNewPassword)
      setConfirmNewPasswordValid(confirmPasswordValid)

      return passwordValid && confirmPasswordValid
    }
  }

  const resetPassword = async () => {
    const valid = validateFields()
    if (!valid) {
      return
    }

    setLoading(true)
    const { success, error } = await userResetPassword(email, newPassword, code)
    setLoading(false)

    if (success) {
      return onSuccess()
    }

    if (error) {
      showNotifaction.error(error.message)
    }
  }

  const rememberPassword = () => {
    onRemembered()
  }

  if (!code || !email) {
    return <InvalidPage />
  }

  return (
    <KeyboardScrollView keyboardShouldPersistTaps='handled' style={styles.wrapper}>
      <Text style={styles.codeWrapper}>Confirmation code: {code}   •<TextButton text='Edit' style={styles.editWrapper} onPress={() => router.dismiss()} /></Text>
      <TextInput
        label='New password'
        value={newPassword}
        mode='outlined'
        inputMode='text'
        secureTextEntry
        onChangeText={password => {
          if (newPasswordValid !== null) {
            setNewPasswordValid(null)
          }
          setNewPassword(password)
        }}
      />
      <Text style={[TextStyles.smallInputFeedback, styles.feedbackText, { opacity: newPasswordValid === false ? 1 : 0 }]}>Password must be 8+ characters, with a letter and number</Text>
      <TextInput
        label='Repeat new password'
        value={confirmNewPassword}
        mode='outlined'
        inputMode='text'
        secureTextEntry
        onChangeText={password => {
          if (confirmNewPasswordValid !== null) {
            setConfirmNewPasswordValid(null)
          }
          setConfirmNewPassword(password)
        }}
      />
      <Text style={[TextStyles.smallInputFeedback, styles.feedbackText, { opacity: confirmNewPasswordValid === false ? 1 : 0 }]}>Passwords must match</Text>
      <TextButton text='Remember password?' scaleTo={0.995} wrapperStyle={{ alignSelf: 'flex-start' }} style={styles.rememberPasswordText} onPress={rememberPassword} />
      <ButtonText text='Change password' loading={loading} color={Colors.sinopia} textColor={Colors.white} onPress={resetPassword} />
    </KeyboardScrollView>
  )
}

export default ChangePasswordPage

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20
  },
  inputWrapper: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'center'
  },
  contentWrapper: {
    fontSize: 17
  },
  outline: {
    borderRadius: 15
  },
  feedbackText: {
    paddingHorizontal: 20
  },
  codeWrapper: {
    marginBottom: 10,
    color: Colors.placeholder3
  },
  editWrapper: {
    color: Colors.button,
    marginBottom: -4,
    marginLeft: 10
  },
  rememberPasswordText: {
    margin: 10
  }
})
