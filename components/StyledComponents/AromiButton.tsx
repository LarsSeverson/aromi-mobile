import { View, Text, TouchableOpacityProps, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import { Colors } from '@/constants/Colors'

const AromiButtonStyle = styled.TouchableOpacity`
  width: 110px;
  background-color: ${Colors.aromiLight.button};

  display: flex;
  justify-content: center;
  align-items: center;
`

const AromiButtonTextStyle = styled.Text`
  height: 100%;

  color: ${Colors.white};
  font-family: 'PalanquinDark-Regular';
  font-size: 16px;
`

const AromiButton: React.FC<TouchableOpacityProps> = (props: TouchableOpacityProps) => {
  return (
    <View style={styles.wrapper}>
      <AromiButtonStyle {...props}>
        <AromiButtonTextStyle style={{ textAlignVertical: 'center' }}>{props.children}</AromiButtonTextStyle>
      </AromiButtonStyle>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: 40,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default AromiButton
