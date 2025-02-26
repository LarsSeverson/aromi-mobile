import { StyleSheet, TextStyle, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import React from 'react'
import TextButton from '../common/TextButton'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'

const LegalAgreement = () => {
  const theme = useAppTheme()

  return (
    <Text variant='labelSmall' style={styles.agreementText}>
      By continuing, you agree to aromi's
      <TextButton variant='labelSmall' style={[styles.agreementTextHighlight, { color: theme.colors.text }]} text=' Terms of Service ' />
      and acknowledge you have read our
      <TextButton variant='labelSmall' style={[styles.agreementTextHighlight, { color: theme.colors.text }]} text=' Privacy Policy.' />
    </Text>
  )
}

export default LegalAgreement

const styles = StyleSheet.create({
  agreementText: {
    textAlign: 'center',
    opacity: 0.85
  },
  agreementTextHighlight: {
    marginBottom: -3,
    fontWeight: 'bold',
    opacity: 0.85
  }
})
