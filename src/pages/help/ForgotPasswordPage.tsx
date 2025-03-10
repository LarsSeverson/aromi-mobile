import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Text } from 'react-native-paper'
import TextButton from '@/src/components/common/TextButton'
import ButtonText from '@/src/components/common/ButtonText'
import { Colors } from '@/src/constants/Colors'
import { TextStyles } from '@/src/constants/TextStyles'
import { showNotifaction } from '@/src/common/show-notification'
import useAuth from '@/src/hooks/useAuth'

export interface ForgotPasswordProps {
  onContinue: (email: string) => void
  onRememberedPassword: () => void
}

const ForgotPasswordPage = (props: ForgotPasswordProps) => {
  const { onContinue, onRememberedPassword } = props

  const { validateEmail, sendResetPasswordCode } = useAuth()

  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)

  const continueForm = async () => {
    const valid = validateEmail(email)
    setEmailValid(valid)

    if (valid) {
      setLoading(true)
      const { success, error } = await sendResetPasswordCode(email)
      setLoading(false)

      if (success) {
        onContinue(email)
        return
      }

      if (error != null) {
        showNotifaction.error(error.message)
      }
    }
  }

  return (
    <View style={styles.wrapper}>
      <Text variant='titleMedium'>Enter your email to reset your password</Text>
      <View>
        <TextInput
          label='Email'
          value={email}
          mode='outlined'
          inputMode='email'
          autoCapitalize='none'
          autoComplete='email'
          onChangeText={(email) => {
            if (emailValid !== null) {
              setEmailValid(null)
            }
            setEmail(email)
          }}
        />
        <Text
          style={[TextStyles.smallInputFeedback, styles.feedbackText, { opacity: emailValid === false ? 1 : 0 }]}
        >
          Please enter a valid email address
        </Text>
      </View>
      <TextButton
        text='Remember password?'
        scaleTo={0.995}
        wrapperStyle={{ alignSelf: 'flex-start' }}
        style={styles.rememberPasswordText}
        onPress={onRememberedPassword}
      />
      <ButtonText
        text='Continue'
        color={Colors.sinopia}
        textColor={Colors.white}
        loading={loading}
        onPress={() => { void continueForm() }}
      />
    </View>
  )
}

export default ForgotPasswordPage

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
    gap: 15,
    display: 'flex'
  },
  feedbackText: {
    marginHorizontal: 20
  },
  rememberPasswordText: {
    marginHorizontal: 10
  }
})
