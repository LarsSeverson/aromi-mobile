import type ReactNative from 'react-native'
import { StyleSheet, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors } from '@/src/constants/Colors'
import { Dialog, Portal, TextInput, Text } from 'react-native-paper'
import TextButton from '../TextButton'
import ButtonText from '../ButtonText'
import { TextStyles } from '@/src/constants/TextStyles'

interface ConfirmationCodeProps {
  to: string
  length?: number
  loading: boolean | null
  onCompleted: (code: string) => void
  onEdit: () => void
  onReset: () => void
}

const ConfirmationCode = (props: ConfirmationCodeProps) => {
  const { to, length = 6, loading, onCompleted, onEdit, onReset } = props

  const [codes, setCodes] = useState<string[]>(Array(length).fill(''))
  const [codesValid, setCodesValid] = useState<boolean | null>(null)
  const [dialogVisible, setDialogVisible] = useState(false)

  const inputsRef = useRef<ReactNative.TextInput[]>([])

  const continueForm = () => {
    const code = codes.join('').trim()
    const valid = code.length === length
    setCodesValid(valid)
    if (valid) {
      onCompleted(code)
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
    if ((text.length !== 0) && index + 1 < length) {
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
      <Text variant='titleMedium'>Enter your confirmation code</Text>
      <View style={{ gap: 20 }}>
        <Text
          style={styles.sentToWrapper}
        >
          sent to: {to}   •
          <TextButton
            text='Edit'
            style={styles.toWrapper}
            onPress={onEdit}
          />
        </Text>
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
                readOnly={dialogVisible}
                autoFocus={index === 0}
                style={styles.codeWrapper}
                contentStyle={styles.codeInputWrapper}
                onChangeText={text => { textChange(text, index) }}
                onKeyPress={e => { keyPress(e, index) }}
              />
            ))}
          </View>
          <Text
            style={[TextStyles.smallInputFeedback, {
              opacity: codesValid === false ? 1 : 0,
              marginTop: 10,
              marginBottom: -10
            }]}
          >
            Enter the complete 6-digit code
          </Text>
        </View>
        <TextButton
          text="Didn't get a code?"
          scaleTo={0.997}
          onPress={() => { setDialogVisible(true) }}
        />
        <ButtonText
          text='Continue'
          loading={loading ?? false}
          color={Colors.sinopia}
          loadingColor={Colors.white}
          textColor={Colors.white}
          onPress={continueForm}
        />
      </View>
      <Portal>
        <Dialog
          dismissable={false}
          visible={dialogVisible}
          style={styles.dialogWrapper}
        >
          <Dialog.Content style={styles.dialogContentWrapper}>
            <View>
              <ButtonText
                text='Send again'
                color={Colors.white}
                style={[styles.dialogGroupWrapper, styles.sendAgainWrapper]}
                onPress={() => {
                  setDialogVisible(false)
                  onReset()
                }}
              />
              <ButtonText
                text='Edit email'
                color={Colors.white}
                style={[styles.dialogGroupWrapper, styles.editEmailWrapper]}
                onPress={() => {
                  setDialogVisible(false)
                  onEdit()
                }}
              />
            </View>
            <ButtonText
              text='Cancel'
              color={Colors.white}
              style={styles.dialogGroupWrapper}
              onPress={() => { setDialogVisible(false) }}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  )
}

export default ConfirmationCode

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
    flex: 1
  },
  sentToWrapper: {
    marginBottom: 10,
    color: Colors.placeholder3
  },
  toWrapper: {
    color: Colors.button,
    marginBottom: -4,
    marginLeft: 10
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  codeInputWrapper: {
    textAlign: 'center'
  },
  borderWrapper: {
    borderRadius: 10
  },
  dialogWrapper: {
    marginTop: 'auto',
    marginHorizontal: 0
  },
  dialogContentWrapper: {
    gap: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  dialogGroupWrapper: {
    borderRadius: 10,
    padding: 15
  },
  sendAgainWrapper: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.placeholder2
  },
  editEmailWrapper: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  }
})
