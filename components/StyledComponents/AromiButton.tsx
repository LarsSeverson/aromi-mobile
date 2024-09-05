import { View, Text, TouchableOpacityProps, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import { Colors } from '@/constants/Colors'

const AromiButtonStyle = styled.TouchableOpacity`
  height: 40px;
  width: 110px;
  background-color: ${Colors.button};

  display: flex;
  justify-content: center;
  align-items: center;
`

const AromiButtonTextStyle = styled.Text`

  color: ${Colors.white};
  font-family: 'PalanquinDark-Regular';
  font-size: 16px;
`

const AromiButton: React.FC<TouchableOpacityProps> = (props: TouchableOpacityProps) => {
  return (
    <View style={styles.wrapper}>
      <AromiButtonStyle {...props}>
        <AromiButtonTextStyle adjustsFontSizeToFit style={{ textAlignVertical: 'center' }}>{props.children}</AromiButtonTextStyle>
      </AromiButtonStyle>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default AromiButton
