import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/src/constants/Colors'
import BouncyButton, { BouncyButtonProps } from '../Utils/BouncyButton'
import { authStyles } from './AuthStyles'

interface SignUpButtonProps extends BouncyButtonProps {}

const SignUpButton: React.FC<SignUpButtonProps> = (props: SignUpButtonProps) => {
  return (
    <BouncyButton {...props} style={[authStyles.authButtonWrapper, { backgroundColor: Colors.sinopia }]}>
      <Text style={[authStyles.authButtonTextWrapper, { color: Colors.white }]}>Sign up</Text>
    </BouncyButton>
  )
}

export default SignUpButton
