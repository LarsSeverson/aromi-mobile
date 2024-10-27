import ReactNative, { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors } from '@/src/constants/Colors'
import { TextInput } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ThemedText } from '../Utils/Text'
import TextButton from '../Utils/TextButton'
import ButtonText from '../Utils/ButtonText'
import { TextStyles } from '@/src/constants/TextStyles'

interface ConfirmationCodeProps {
  to: string
  length?: number
  onCompleted: () => void
  onEdit: () => void
  onReset: () => void
}

const ConfirmationCode: React.FC<ConfirmationCodeProps> = (props: ConfirmationCodeProps) => {
  const { to, length = 6, onCompleted, onEdit, onReset } = props

  const [codes, setCodes] = useState(Array(length).fill(''))
  const [codesValid, setCodesValid] = useState<boolean | null>(null)

  const inputsRef = useRef<Array<ReactNative.TextInput>>([])

  const continueForm = () => {
    const valid = codes.every(code => code.trim() !== '')
    setCodesValid(valid)
    if (valid) {
      onCompleted()
    }
  }

  const updateCode = (index: number, value: string) => {
    setCodes(prev => {
      const newCodes = [...prev]
      newCodes[index] = value
      return newCodes
    })
  }

  const textChange = (text: string, index: number) => {
    if (codesValid !== null) {
      setCodesValid(null)
    }
    updateCode(index, text)
    if (text.length && index + 1 < length) {
      inputsRef.current[index + 1].focus()
    }
  }

  const keyPress = (e: ReactNative.NativeSyntheticEvent<ReactNative.TextInputKeyPressEventData>, index: number) => {
    if (codesValid !== null) {
      setCodesValid(null)
    }
    if (e.nativeEvent.key === 'Backspace' && codes[index] === '') {
      if (index > 0) {
        updateCode(index - 1, '')
        inputsRef.current[index - 1].focus()
      }
    }
  }

  return (
    <View style={styles.wrapper}>
      <ThemedText style={{ fontSize: 25 }}>Enter your verification code</ThemedText>
      <View style={{ gap: 20 }}>
        <ThemedText style={styles.sentToWrapper}>sent to: {to}   •<TextButton text='Edit' style={styles.toWrapper} onPress={onEdit} /></ThemedText>
        <View>
          <View style={styles.codesWrapper}>
            {codes.map((code, index) => (
              <TextInput
                ref={(ref: ReactNative.TextInput) => (inputsRef.current[index] = ref)}
                key={index}
                value={code}
                mode='outlined'
                inputMode='numeric'
                maxLength={1}
                autoFocus={index === 0}
                outlineColor={Colors.placeholder3}
                activeOutlineColor={Colors.button}
                selectionColor={Colors.placeholder3}
                style={styles.codeWrapper}
                contentStyle={styles.codeInputWrapper}
                outlineStyle={styles.borderWrapper}
                onChangeText={text => textChange(text, index)}
                onKeyPress={e => keyPress(e, index)}
              />
            ))}
          </View>
          <ThemedText style={[TextStyles.smallInputFeedback, { opacity: codesValid === false ? 1 : 0, marginTop: 10, marginBottom: -10 }]}>Enter the complete 6-digit code</ThemedText>
        </View>
        <TextButton text="Didn't get a code?" style={{ fontFamily: 'Palanquin-SemiBold', flex: 1 }} scaleTo={0.997} />
        <ButtonText text='Continue' color={Colors.sinopia} textColor={Colors.white} onPress={continueForm} />
      </View>
    </View>
  )
}

export default ConfirmationCode

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10
  },
  sentToWrapper: {
    marginBottom: 10,
    color: Colors.placeholder3
  },
  toWrapper: {
    color: Colors.button,
    marginBottom: -4,
    marginLeft: 10,
    fontFamily: 'Palanquin-SemiBold'
  },
  codesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    justifyContent: 'space-between'
  },
  codeWrapper: {
    flex: 1,
    maxWidth: 50,
    maxHeight: 50,
    backgroundColor: Colors.white,
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  codeInputWrapper: {
    fontFamily: 'PalanquinDark-Regular',
    textAlign: 'center'
  },
  borderWrapper: {
    borderRadius: 10
  }
})
