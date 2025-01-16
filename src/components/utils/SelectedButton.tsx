import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'
import ButtonText from './ButtonText'
import { BouncyButtonProps } from './BouncyButton'

export interface SelectedButtonProps extends BouncyButtonProps {
  selectedCount: number
}

const SelectedButton = (props: SelectedButtonProps) => {
  const theme = useAppTheme()

  const { selectedCount, ...rest } = props

  return (
    <View style={[styles.submitWrapper, { backgroundColor: theme.colors.background }]}>
      <ButtonText text={`Submit (${selectedCount})`} color={Colors.button} textColor={Colors.white} style={styles.submit} {...rest} />
    </View>
  )
}

export default SelectedButton

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
