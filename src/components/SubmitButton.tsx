import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'
import ButtonText, { ButtonTextProps } from './ButtonText'

export interface SubmitButtonProps extends ButtonTextProps {
}

const SubmitButton = (props: SubmitButtonProps) => {
  const theme = useAppTheme()

  const { text, disabled, loading, ...rest } = props

  return (
    <View style={[styles.submitWrapper, { backgroundColor: theme.colors.background, opacity: disabled ? 0.5 : 1 }]}>
      <ButtonText
        text={text || 'Submit'}
        color={Colors.button}
        textColor={Colors.white}
        style={styles.submit}
        disabled={disabled || loading}
        loading={loading}
        {...rest}
      />
    </View>
  )
}

export default SubmitButton

const styles = StyleSheet.create({
  submitWrapper: {
    width: '100%',
    padding: 10
  },
  submit: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 48
  }
})
