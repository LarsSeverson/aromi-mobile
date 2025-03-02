import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Notify } from './Notify'
import { Text } from 'react-native-paper'
import { Icon } from 'react-native-elements'
import { Colors } from '@/src/constants/Colors'

interface ErrorNotifyProps {
  message: string
}

const ErrorNotify = (props: ErrorNotifyProps) => {
  const { message } = props
  return (
    <Notify>
      <View style={styles.errorBackground}>
        <Icon
          name='alert-box'
          type='material-community'
          size={30}
          color={Colors.white}
        />
        <Text style={styles.errorMessage}>
          {message}
        </Text>
      </View>
    </Notify>
  )
}

export default ErrorNotify

const styles = StyleSheet.create({
  errorBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
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
    marginBottom: -5,
    flexShrink: 1,
    lineHeight: 20,
    color: Colors.white
  }
})
