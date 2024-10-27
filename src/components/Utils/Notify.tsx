import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/src/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from './Text'
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
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorNotifyContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 10,
    backgroundColor: Colors.negative,
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 20,
    width: '100%'
  },
  errorMessage: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'Palanquin-SemiBold',
    flexWrap: 'wrap',
    lineHeight: 20,
    color: Colors.white
  }
})
