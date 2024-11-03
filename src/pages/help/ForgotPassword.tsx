import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ThemedText } from '@/src/components/Utils/Text'
import { TextInput } from 'react-native-paper'
import TextButton from '@/src/components/Utils/TextButton'
import ButtonText from '@/src/components/Utils/ButtonText'
import { Colors } from '@/src/constants/Colors'
import { useAromiAuthContext } from '@/src/hooks/useAromiAuthContext'
import { TextStyles } from '@/src/constants/TextStyles'

export interface ForgotPasswordProps {
  onContinue: () => void
  onRememberedPassword: () => void
}

const ForgotPasswordPage: React.FC<ForgotPasswordProps> = (props: ForgotPasswordProps) => {
  const { onContinue, onRememberedPassword } = props
  const { validateEmail } = useAromiAuthContext()
  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState<boolean | null>(null)

  const continueForm = () => {
    const valid = validateEmail(email)
    setEmailValid(valid)
    if (valid) {
      onContinue()
    }
  }

  return (
    <View style={styles.wrapper}>
      <ThemedText style={{ fontSize: 18 }}>Enter your email to reset your password</ThemedText>
      <TextInput
        label='Email'
        value={email}
        mode='outlined'
        inputMode='email'
        autoCapitalize='none'
        autoComplete='email'
        outlineColor={Colors.placeholder3}
        activeOutlineColor={Colors.button}
        selectionColor={Colors.placeholder3}
        contentStyle={styles.contentWrapper}
        outlineStyle={styles.outlineWrapper}
        style={styles.inputWrapper}
        theme={{
          colors: { onSurfaceVariant: Colors.placeholder3 }
        }}
        onChangeText={(email) => {
          if (emailValid) {
            setEmailValid(null)
          }
          setEmail(email)
        }}
      />
      <Text style={[TextStyles.smallInputFeedback, styles.feedbackText, { opacity: emailValid === false ? 1 : 0 }]}>Please enter a valid email address</Text>
      <TextButton text='Remember password?' scaleTo={0.995} wrapperStyle={{ alignSelf: 'flex-start' }} style={styles.rememberPasswordText} onPress={onRememberedPassword} />
      <ButtonText text='Continue' color={Colors.sinopia} textColor={Colors.white} onPress={continueForm} />
    </View>
  )
}

export default ForgotPasswordPage

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
    display: 'flex'
  },
  inputWrapper: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20
  },
  contentWrapper: {
    fontFamily: 'PalanquinDark-Regular',
    fontSize: 17
  },
  outlineWrapper: {
    borderRadius: 15
  },
  feedbackText: {
    marginHorizontal: 20
  },
  rememberPasswordText: {
    margin: 10,
    fontSize: 13
  }
})
