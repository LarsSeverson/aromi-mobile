import { StyleSheet, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Colors } from '@/src/constants/Colors'
import { Divider, TextInput, Text } from 'react-native-paper'
import ButtonText from '@/src/components/common/ButtonText'
import { Icon } from 'react-native-elements'
import { TextStyles } from '@/src/constants/TextStyles'
import TextButton from '@/src/components/common/TextButton'
import { KeyboardScrollView } from '@rlemasquerier/react-native-keyboard-scrollview'
import { showNotifaction } from '@/src/components/common/notify/ShowNotification'
import { AuthErrorCode } from '@/src/hooks/utils/AuthErrors'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useAuthContext } from '@/src/contexts/AuthContext'

const LogInPage = () => {
  const router = useRouter()

  const storedEmail = useLocalSearchParams().email as string

  const aromiAuth = useAuthContext()

  const [email, setEmail] = useState(storedEmail || '')
  const [emailValid, setEmailValid] = useState<boolean | null>(null)
  const [password, setPassword] = useState('')
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)

  const onForgotPassword = useCallback(() => {
    router.push('/auth/help')
  }, [router])

  const onSignUp = useCallback(() => {
    router.push('/auth/SignUp')
  }, [router])

  const logIn = async () => {
    const [e, p] = validate(true, true)
    if (!e || !p) {
      return
    }

    setLoading(true)
    const { success, error } = await aromiAuth.userLogIn(email, password)
    setLoading(false)

    if (success) {
      return router.replace('/(core)')
    }

    if (error) {
      if (error.code === AuthErrorCode.SIGN_UP_INCOMPLETE) {
        router.push({ pathname: '/auth/ConfirmSignUp', params: { email } })
      } else if (error.code === AuthErrorCode.USER_NOT_FOUND) {
        showNotifaction.error(error.message)
      } else {
        showNotifaction.error('Something went wrong. Please try again later.')
      }
    }
  }

  const validate = (email: boolean = false, password: boolean = false) => {
    const valid: Array<boolean | null> = [null, null]
    if (email) {
      valid[0] = validateEmail()
    }
    if (password) {
      valid[1] = validatePassword()
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

  const continueWithGoogle = async () => {
    setLoading(true)
    const { success, error } = await aromiAuth.socialSignIn('Google')
    setLoading(false)

    if (success) {
      //
      return
    }

    if (error) {
      showNotifaction.error(error.message)
    }
  }

  return (
    <KeyboardScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' contentContainerStyle={styles.wrapper}>
      <Text variant='titleMedium'>Welcome back</Text>
      <View>
        <TextInput
          value={email}
          label='Email'
          mode='outlined'
          inputMode='email'
          autoCapitalize='none'
          autoComplete='email'
          onChangeText={email => {
            if (emailValid) {
              setEmailValid(null)
            }
            setEmail(email)
          }}
        />
        <Text style={[TextStyles.smallInputFeedback, styles.feedbackText, { opacity: emailValid === false ? 1 : 0 }]}>Please enter a valid email address</Text>

        <TextInput
          label='Password'
          value={password}
          mode='outlined'
          inputMode='text'
          secureTextEntry
          onChangeText={password => {
            if (passwordValid !== null) {
              setPasswordValid(null)
            }
            setPassword(password)
          }}
        />
        <Text style={[TextStyles.smallInputFeedback, styles.feedbackText, { opacity: passwordValid === false ? 1 : 0 }]}>Password must be 8+ characters, with a letter and number</Text>
        <TextButton text='Forgot password?' scaleTo={0.995} wrapperStyle={{ alignSelf: 'flex-start' }} style={styles.forgotPasswordWrapper} onPress={onForgotPassword} />
        <ButtonText text='Log in' loading={loading} loadingColor={Colors.white} color={Colors.sinopia} textColor={Colors.white} onPress={logIn} />
      </View>

      <View style={styles.orWrapper}>
        <Divider style={{ flex: 1 }} />
        <Text>or</Text>
        <Divider style={{ flex: 1 }} />
      </View>
      <ButtonText text='Continue with Google' outlined icon={<Icon name='logo-google' type='ionicon' size={15} />} onPress={continueWithGoogle} />
      <ButtonText text='Continue with Apple' outlined icon={<Icon name='logo-apple' type='ionicon' size={15} />} />
      <Text style={{ alignSelf: 'center' }}>New here? <TextButton text='Sign up' style={{ marginBottom: -3 }} onPress={onSignUp} /></Text>
    </KeyboardScrollView>
  )
}

export default LogInPage

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
    gap: 15
  },
  title: {
    fontSize: 18
  },
  inputWrapper: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'center'
  },
  contentWrapper: {
    fontFamily: 'PalanquinDark-Regular',
    fontSize: 17
  },
  outline: {
    borderRadius: 15
  },
  orWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15
  },
  feedbackText: {
    marginHorizontal: 20
  },
  forgotPasswordWrapper: {
    margin: 10
  }
})
