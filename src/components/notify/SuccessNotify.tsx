import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Notify } from './Notify'
import { Text } from 'react-native-paper'
import { Icon } from 'react-native-elements'
import { Colors } from '@/src/constants/Colors'

interface SuccessNotifyProps {
  message: string
}

const SuccessNotify: React.FC<SuccessNotifyProps> = (props: SuccessNotifyProps) => {
  const { message } = props
  return (
    <Notify>
      <View style={styles.successBackground}>
        <Icon
          name='alert-box'
          type='material-community'
          size={35}
          color={Colors.white}
        />
        <Text variant='titleSmall' style={styles.successMessage}>
          {message}
        </Text>
      </View>
    </Notify>
  )
}

export default SuccessNotify

const styles = StyleSheet.create({
  successBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 15,
    gap: 10,
    backgroundColor: Colors.positive,
    shadowColor: Colors.black,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 20,
    width: '100%'
  },
  successMessage: {
    marginBottom: -5,
    flexShrink: 1,
    lineHeight: 20,
    color: Colors.white
  }
})
