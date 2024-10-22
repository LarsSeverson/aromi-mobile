import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextButton from '../Utils/TextButton'
import { Colors } from '@/src/constants/Colors'

const LegalAgreement = () => {
  return (
    <Text style={styles.agreementText}>
      By continuing, you agree to aromi's
      <TextButton style={styles.agreementTextHighlight} text=' Terms of Service ' />
      and acknowledge you have read our
      <TextButton style={styles.agreementTextHighlight} text=' Privacy Policy.' />
    </Text>
  )
}

export default LegalAgreement

const styles = StyleSheet.create({
  agreementText: {
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Palanquin-Medium',
    opacity: 0.7,
    lineHeight: 18,
    fontSize: 12
  },
  agreementTextHighlight: {
    opacity: 1,
    fontFamily: 'Palanquin-Bold',
    fontSize: 12,
    marginBottom: -3,
    color: Colors.black
  }
})
