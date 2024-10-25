import { StyleSheet } from 'react-native'
import React from 'react'
import BouncyButton, { BouncyButtonProps } from '../Utils/BouncyButton'
import { Icon } from 'react-native-elements'
import { Colors } from '@/src/constants/Colors'

const HeaderBackButton: React.FC<BouncyButtonProps> = (props: BouncyButtonProps) => {
  return (
    <BouncyButton {...props} style={styles.wrapper}>
      <Icon name='arrow-left' type='octicon' size={18} />
    </BouncyButton>
  )
}

export default HeaderBackButton

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 50,
    borderWidth: 1,
    width: 40,
    height: 40,
    padding: 10,
    borderColor: Colors.placeholder2
  }
})
