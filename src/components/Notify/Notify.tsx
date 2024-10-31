import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/src/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '../Utils/Text'
import { Icon } from 'react-native-elements'

export interface NotifyProps {
  message: string
}

export const ErrorNotify: React.FC<NotifyProps> = (props: NotifyProps) => {
  const { message } = props

  return (
    <SafeAreaView style={{ padding: 10 }}>
      <View style={styles.errorNotifyWrapper}>
        <View style={styles.errorNotifyContentWrapper}>
          <Icon name='alert-box' type='material-community' size={35} color={Colors.white} />
          <ThemedText style={styles.errorMessage}>{message}</ThemedText>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  errorNotifyWrapper: {
    marginHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorNotifyContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 15,
    gap: 10,
    backgroundColor: Colors.negative,
    shadowColor: Colors.black,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 20,
    width: '100%'
  },
  errorMessage: {
    fontSize: 16,
    marginBottom: -5,
    fontFamily: 'Palanquin-SemiBold',
    flexShrink: 1,
    lineHeight: 20,
    color: Colors.white
  }
})
