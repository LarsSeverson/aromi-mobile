import { StyleSheet, View } from 'react-native'
import React, { ReactNode } from 'react'
import { Divider } from 'react-native-paper'
import BouncyButtonGroupButton from './BouncyButtonGroupButton'
import BouncyButton from './BouncyButton'
import { Colors } from '@/src/constants/Colors'

export interface BouncyButtonGroupProps {
  children: ReactNode
}

export interface BouncyButtonGroupComponent extends React.FC<BouncyButtonGroupProps> {
  Button: typeof BouncyButtonGroupButton
  ButtonRaw: typeof BouncyButton
}

const BouncyButtonGroup: BouncyButtonGroupComponent = (props: BouncyButtonGroupProps) => {
  const { children } = props
  const count = React.Children.count(children)

  return (
    <View style={styles.wrapper}>
      {React.Children.map(children, (child, index) => (
        <View key={index}>
          {child}
          {index !== count - 1 && (
            <Divider style={{ backgroundColor: Colors.placeholder2 }} />
          )}
        </View>
      ))}
    </View>
  )
}

BouncyButtonGroup.Button = BouncyButtonGroupButton
BouncyButtonGroup.ButtonRaw = BouncyButton

export default BouncyButtonGroup

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.placeholder2
  }
})
