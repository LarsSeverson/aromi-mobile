import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/src/constants/Colors'
import { Divider, TextInput, Text } from 'react-native-paper'
import ButtonText from '@/src/components/Utils/ButtonText'
import { Icon } from 'react-native-elements'
import { useRouter } from 'expo-router'
import { TextStyles } from '@/src/constants/TextStyles'
import TextButton from '@/src/components/Utils/TextButton'
import { KeyboardScrollView } from '@rlemasquerier/react-native-keyboard-scrollview'
import { useAromiAuthContext } from '@/src/hooks/useAromiAuthContext'
import { Notifier } from 'react-native-notifier'
import { showNotifaction } from '@/src/components/Notify/ShowNotification'
import { AuthErrorCode } from '@/src/hooks/Utils/AuthErrors'

const LogIn = () => {
  const aromiAuth = useAromiAuthContext()

  const router = useRouter()

  const [email, setEmail] = useState(aromiAuth.userInfo.email || '')
  const [emailValid, setEmailValid] = useState<boolean | null>(null)
  const [password, setPassword] = useState('')
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)

  const logIn = async () => {
    const [e, p] = validate(true, true)
    if (!e || !p) {
      return
    }

    setLoading(true)
    const { success, error } = await aromiAuth.userLogIn(email, password)
    setLoading(false)

    if (success) {
      router.replace('/(core)/')
      return
    }

    if (error) {
      if (error.code === AuthErrorCode.SIGN_UP_INCOMPLETE) {
        router.push('/ConfirmSignUp')
      } else if (error.code === AuthErrorCode.USER_NOT_FOUND) {
        Notifier.showNotification(showNotifaction.error(error.message))
      } else {
        Notifier.showNotification(showNotifaction.error('Something went wrong. Please try again later.'))
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

  const gotoSignUp = () => {
    router.dismissAll()
    router.push('/SignUp')
  }

  const gotoForgotPassword = async () => {
    router.push('/help')
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
        <TextButton text='Forgot password?' scaleTo={0.995} wrapperStyle={{ alignSelf: 'flex-start' }} style={styles.forgotPasswordWrapper} onPress={gotoForgotPassword} />
        <ButtonText text='Log in' loading={loading} loadingColor={Colors.white} color={Colors.sinopia} textColor={Colors.white} onPress={logIn} />
      </View>

      <View style={styles.orWrapper}>
        <Divider style={{ flex: 1 }} />
        <Text>or</Text>
        <Divider style={{ flex: 1 }} />
      </View>
      <ButtonText text='Continue with Google' outlined icon={<Icon name='logo-google' type='ionicon' size={15} />} />
      <ButtonText text='Continue with Apple' outlined icon={<Icon name='logo-apple' type='ionicon' size={15} />} />
      <Text style={{ alignSelf: 'center' }}>New here? <TextButton text='Sign up' style={{ marginBottom: -3 }} onPress={gotoSignUp} /></Text>
    </KeyboardScrollView>
  )
}

export default LogIn

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
