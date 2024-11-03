import { StyleSheet } from 'react-native'
import React from 'react'
import BouncyButton, { BouncyButtonProps } from '../Utils/BouncyButton'
import { Icon } from 'react-native-elements'
import { Colors } from '@/src/constants/Colors'

const HeaderCloseButton: React.FC<BouncyButtonProps> = (props: BouncyButtonProps) => {
  return (
    <BouncyButton {...props} style={styles.wrapper}>
      <Icon name='x' type='octicon' size={18} />
    </BouncyButton>
  )
}

export default HeaderCloseButton

const styles = StyleSheet.create({
  wrapper: {
    width: 40,
    height: 40,
    padding: 10,
    borderColor: Colors.placeholder2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
