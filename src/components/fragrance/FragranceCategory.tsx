import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import BouncyButton from '../utils/BouncyButton'
import { useAppTheme } from '@/src/constants/Themes'

export interface FragranceCategoryProps {
  title: string
  buttonText?: string
  onButtonPress?: () => void
  children?: React.ReactNode
}

const FragranceCategory: React.FC<FragranceCategoryProps> = ({ title, buttonText, onButtonPress, children }) => {
  const theme = useAppTheme()

  return (
    <View style={styles.categoryWrapper}>
      <Text variant='titleSmall' style={{ fontWeight: 500 }}>{title}</Text>

      {children}

      {buttonText && (
        <BouncyButton style={[styles.categoryButton, { borderColor: theme.colors.surfaceDisabled }]} onPress={onButtonPress}>
          <Text style={{ opacity: 0.8 }}>{buttonText}</Text>
        </BouncyButton>
      )}

    </View>
  )
}

export default FragranceCategory

const styles = StyleSheet.create({
  categoryWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10
  },
  categoryButton: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    marginVertical: 10
  }
})
