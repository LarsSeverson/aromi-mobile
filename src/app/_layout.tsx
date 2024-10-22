import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

const RootLayout = () => {
  const isAuthenticated = false
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated
        ? (
          <Stack.Screen name='(main)' />
          )
        : (
          <Stack.Screen name='(auth)' />
          )}
    </Stack>
  )
}

export default RootLayout

const styles = StyleSheet.create({})
