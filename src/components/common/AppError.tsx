import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/src/constants/Colors'
import { Text } from 'react-native-paper'
import ButtonText from './ButtonText'
import AuthActionGuard from '../auth/AuthActionGuard'

interface AppErrorProps {
  onRetry: () => void
}

const AppError: React.FC<AppErrorProps> = (props: AppErrorProps) => {
  const { onRetry } = props

  return (
    <View style={styles.wrapper}>
      <Text variant='titleLarge'>Oh no!</Text>
      <Text>It looks like something went wrong. Please try again.</Text>
      <AuthActionGuard>
        <ButtonText text='Reload page' onPress={onRetry} color={Colors.button} textColor={Colors.white} />
      </AuthActionGuard>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 20
  }
})

export default AppError
