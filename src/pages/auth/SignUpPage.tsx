import { StyleSheet, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Colors } from '@/src/constants/Colors'
import { Divider, TextInput, Text } from 'react-native-paper'
import ButtonText from '@/src/components/common/ButtonText'
import { KeyboardScrollView } from '@rlemasquerier/react-native-keyboard-scrollview'
// import { Icon } from 'react-native-elements'
import { TextStyles } from '@/src/constants/TextStyles'
import { showNotifaction } from '@/src/common/show-notification'
import { AuthErrorCode } from '@/src/common/auth-errors'
import { useRouter } from 'expo-router'
import { useAuthContext } from '@/src/contexts/AuthContext'

const SignUpPage = () => {
  const router = useRouter()

  const aromiAuth = useAuthContext()

  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState<boolean | null>(null)
  const [password, setPassword] = useState('')
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordValid, setConfirmPasswordValid] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const [continueLevel, setContinueLevel] = useState(0)

  const gotoLogin = useCallback(() => {
    router.push('/auth/LogIn')
  }, [router])

  const createAccount = async () => {
    setLoading(true)
    const { success, error } = await aromiAuth.userSignUp(email, password)
    setLoading(false)

    if (success) {
      router.push({ pathname: '/(main)/auth/ConfirmSignUp', params: { email } })
      return
    }

    if (error != null) {
      showNotifaction.error(error.message)
      if (error.code === AuthErrorCode.USERNAME_EXISTS) {
        router.push({ pathname: '/auth/LogIn', params: { email } })
      }
    }
  }

  const validate = (email: boolean = false, password: boolean = false, confirmPassword: boolean = false) => {
    const valid: Array<boolean | null> = [null, null, null]
    if (email) {
      valid[0] = validateEmail()
    }
    if (password) {
      valid[1] = validatePassword()
    }
    if (confirmPassword) {
      valid[2] = validateConfirmPassword()
    }

    return valid
  }

  const validateEmail = () => {
    const valid = aromiAuth.validateEmail(email)
    setEmailValid(valid)
    return valid
  }

  const validatePassword = () => {
    const valid = aromiAuth.validatePassword(password)
    setPasswordValid(valid)
    return valid
  }

  const validateConfirmPassword = () => {
    const valid = aromiAuth.validateConfirmPassword(password, confirmPassword)
    setConfirmPasswordValid(valid)
    return valid
  }

  const continueForm = () => {
    if (continueLevel === 0) {
      const [e] = validate(true)
      if (e ?? false) {
        setContinueLevel(1)
      }
    } else if (continueLevel === 1) {
      const [e, p] = validate(true, true)
      if ((e ?? false) && (p ?? false)) {
        setContinueLevel(2)
      }
    } else {
      const [e, p, pp] = validate(true, true, true)
      if ((e ?? false) && (p ?? false) && (pp ?? false)) {
        void createAccount()
      }
    }
  }

  // const continueWithGoogle = async () => {
  //   setLoading(true)
  //   const { success, error } = await aromiAuth.socialSignIn('Google')
  //   setLoading(false)

  //   if (success) {
  //     //
  //     return
  //   }

  //   if (error != null) {
  //     showNotifaction.error(error.message)
  //   }
  // }

  return (
    <KeyboardScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps='handled'
      contentContainerStyle={styles.wrapper}
    >
      <Text variant='titleMedium'>Let's get your account set up</Text>
      <View>
        <TextInput
          label='Email'
          value={email}
          mode='outlined'
          inputMode='email'
          autoCapitalize='none'
          autoComplete='email'
          onChangeText={email => {
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
        {continueLevel >= 1 && (
          <>
            <TextInput
              label='Password'
              value={password}
              mode='outlined'
              inputMode='text'
              secureTextEntry
              autoFocus
              onChangeText={password => {
                if (passwordValid !== null) {
                  setPasswordValid(null)
                }
                setPassword(password)
              }}
            />
            <Text
              style={[TextStyles.smallInputFeedback, styles.feedbackText, { opacity: passwordValid === false ? 1 : 0 }]}
            >
              Password must be 8+ characters, with a letter and number
            </Text>
          </>
        )}
        {continueLevel === 2 &&
        (
          <>
            <TextInput
              label='Repeat password'
              value={confirmPassword}
              mode='outlined'
              inputMode='text'
              secureTextEntry
              autoFocus
              onChangeText={confirmPassword => {
                if (confirmPasswordValid !== null) {
                  setConfirmPasswordValid(null)
                }
                setConfirmPassword(confirmPassword)
              }}
            />
            <Text
              style={[TextStyles.smallInputFeedback, styles.feedbackText, { opacity: confirmPasswordValid === false ? 1 : 0 }]}
            >
              Passwords must match
            </Text>
          </>
        )}
      </View>
      <ButtonText
        text='Continue'
        loading={loading}
        loadingColor={Colors.white}
        color={Colors.sinopia}
        textColor={Colors.white}
        onPress={continueForm}
      />
      <ButtonText
        text='Already have an account?'
        onPress={gotoLogin}
      />
      <View style={styles.orWrapper}>
        <Divider style={{ flex: 1 }} />
        <Text>or</Text>
        <Divider style={{ flex: 1 }} />
      </View>
      {/* <ButtonText text='Continue with Google' outlined icon={<Icon name='logo-google' type='ionicon' size={15} />} onPress={continueWithGoogle} /> */}
      {/* <ButtonText text='Continue with Apple' outlined icon={<Icon name='logo-apple' type='ionicon' size={15} />} /> */}
    </KeyboardScrollView>
  )
}

export default SignUpPage

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
    gap: 15
  },
  orWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15
  },
  feedbackText: {
    paddingHorizontal: 20
  }
})
