import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BouncyButton, { BouncyButtonProps } from '../Utils/BouncyButton'
import { authStyles } from './AuthStyles'
import { Colors } from '@/src/constants/Colors'

interface LogInButtonProps extends BouncyButtonProps {}

const LogInButton: React.FC<LogInButtonProps> = (props: LogInButtonProps) => {
  return (
    <BouncyButton {...props} style={[authStyles.authButtonWrapper, { backgroundColor: Colors.placeholder2 }]}>
      <Text style={[authStyles.authButtonTextWrapper, { color: Colors.black }]}>Log in</Text>
    </BouncyButton>
  )
}

export default LogInButton

const styles = StyleSheet.create({})
