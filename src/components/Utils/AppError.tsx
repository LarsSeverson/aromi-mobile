import { View, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '@/src/constants/Colors'
import CategoryText from './CategoryText'
import { Text } from 'react-native-paper'
import ButtonText from './ButtonText'
import AuthActionGuard from '../auth/AuthActionGuard'

interface AppErrorProps {
    onRetry: () => void
}

const AppError: React.FC<AppErrorProps> = (props: AppErrorProps) => {
  return (
    <View style={styles.wrapper}>
      <Text variant='titleLarge'>Oh no!</Text>
      <CategoryText style={styles.textMiniWrapper}>It looks like something went wrong. Please try again.</CategoryText>
      <AuthActionGuard>
        <ButtonText text='Reload page' />
      </AuthActionGuard>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textMiniWrapper: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20
  },
  reloadButtonWrapper: {
    backgroundColor: Colors.sinopia,
    padding: 15,
    borderRadius: 40
  },
  reloadButtonText: {
    color: Colors.white,
    opacity: 1.0,
    fontSize: 15
  }
})

export default AppError
