import ReactNative, { StyleSheet, View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '@/src/constants/Colors'
import { Divider, TextInput } from 'react-native-paper'
import ButtonText from '@/src/components/Utils/ButtonText'
import { ThemedText } from '@/src/components/Utils/Text'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Icon } from 'react-native-elements'
import { signUp } from 'aws-amplify/auth'
import { ScreenProps } from 'expo-router/build/useScreens'
import { useRouter } from 'expo-router'
import { TextStyles } from '@/src/constants/TextStyles'

const SignUp = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState<boolean | null>(null)
  const [password, setPassword] = useState('')
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordValid, setConfirmPasswordValid] = useState<boolean | null>(null)
  const [continueLevel, setContinueLevel] = useState(0)

  const passwordRef = useRef<ReactNative.TextInput>(null)
  const confirmPasswordRef = useRef<ReactNative.TextInput>(null)

  const createAccount = async () => {
    const userInfo = { id: email }
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp(
        {
          username: email,
          password,
          options: {
            userAttributes: {
              email
            },
            autoSignIn: true
          }
        })
      if (userId) {
        userInfo.id = userId
      }
    } catch (err) {
      // TODO:
      console.error('Error signing up:', err)
    } finally {
      router.push({
        pathname: '/(auth)/ConfirmSignUp',
        params: { userId: userInfo.id }
      })
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
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    const valid = emailRegex.test(email.toLowerCase())

    setEmailValid(valid)

    return valid
  }

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const valid = passwordRegex.test(password)

    setPasswordValid(valid)

    return valid
  }

  const validateConfirmPassword = () => {
    const valid = confirmPassword === password
    setConfirmPasswordValid(valid)
    return valid
  }

  const continueForm = () => {
    if (continueLevel === 0) {
      const [e] = validate(true)
      if (e) {
        setContinueLevel(1)
      }
    } else if (continueLevel === 1) {
      const [e, p] = validate(true, true)
      if (e && p) {
        setContinueLevel(2)
      }
    } else {
      const [e, p, pp] = validate(true, true, true)
      if (e && p && pp) {
        createAccount()
      }
    }
  }

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' style={{ backgroundColor: Colors.white }} contentContainerStyle={styles.wrapper}>
      <ThemedText style={styles.title}>Let's get your account set up</ThemedText>
      <View>
        <TextInput
          label='Email'
          value={email}
          mode='outlined'
          inputMode='email'
          autoCapitalize='none'
          outlineColor={Colors.placeholder3}
          activeOutlineColor={Colors.button}
          selectionColor={Colors.placeholder3}
          contentStyle={styles.contentWrapper}
          outlineStyle={styles.outline}
          style={styles.inputWrapper}
          theme={{
            colors: { onSurfaceVariant: Colors.placeholder3 }
          }}
          onChangeText={email => {
            setEmailValid(null)
            setEmail(email)
          }}
        />
        <Text style={[styles.feedbackText, { opacity: emailValid === false ? 1 : 0 }]}>Please enter a valid email address</Text>
        {continueLevel >= 1 && (
          <>
            <TextInput
              ref={passwordRef}
              label='Password'
              value={password}
              mode='outlined'
              inputMode='text'
              secureTextEntry
              autoFocus
              outlineColor={Colors.placeholder3}
              activeOutlineColor={Colors.button}
              selectionColor={Colors.placeholder3}
              contentStyle={styles.contentWrapper}
              outlineStyle={styles.outline}
              style={styles.inputWrapper}
              theme={{
                colors: { onSurfaceVariant: Colors.placeholder3 }
              }}
              onChangeText={password => {
                setPasswordValid(null)
                setPassword(password)
              }}
            />
            <Text style={[styles.feedbackText, { opacity: passwordValid === false ? 1 : 0 }]}>Password must be 8+ characters, with a letter and number</Text>
          </>
        )}
        {continueLevel === 2 &&
        (
          <>
            <TextInput
              ref={confirmPasswordRef}
              label='Repeat password'
              value={confirmPassword}
              mode='outlined'
              inputMode='text'
              secureTextEntry
              autoFocus
              outlineColor={Colors.placeholder3}
              activeOutlineColor={Colors.button}
              selectionColor={Colors.placeholder3}
              contentStyle={styles.contentWrapper}
              outlineStyle={styles.outline}
              style={styles.inputWrapper}
              theme={{
                colors: { onSurfaceVariant: Colors.placeholder3 }
              }}
              onChangeText={confirmPassword => {
                setConfirmPasswordValid(null)
                setConfirmPassword(confirmPassword)
              }}
            />
            <Text style={[TextStyles.smallInputFeedback, styles.feedbackText, { opacity: confirmPasswordValid === false ? 1 : 0 }]}>Passwords must match</Text>
          </>
        )}
      </View>
      <ButtonText text='Continue' color={Colors.sinopia} textColor={Colors.white} onPress={continueForm} />
      <ButtonText text='Already have an account?' color={Colors.placeholder2} />
      <View style={styles.orWrapper}>
        <Divider style={{ flex: 1 }} />
        <ThemedText>or</ThemedText>
        <Divider style={{ flex: 1 }} />
      </View>
      <ButtonText text='Continue with Google' outlined icon={<Icon name='logo-google' type='ionicon' size={15} />} />
      <ButtonText text='Continue with Apple' outlined icon={<Icon name='logo-apple' type='ionicon' size={15} />} />
    </KeyboardAwareScrollView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
    gap: 15
  },
  title: {
    fontSize: 18
  },
  inputWrapper: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  contentWrapper: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 14
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
    paddingHorizontal: 20
  }
})
