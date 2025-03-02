import { StyleSheet, View } from 'react-native'
import React, { type ReactNode } from 'react'
import { Divider } from 'react-native-paper'
import BouncyButtonGroupButton from './BouncyButtonGroupButton'
import BouncyButton from './BouncyButton'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'

export interface BouncyButtonGroupProps {
  children: ReactNode
}

export interface BouncyButtonGroupComponent extends React.FC<BouncyButtonGroupProps> {
  Button: typeof BouncyButtonGroupButton
  ButtonRaw: typeof BouncyButton
}

const BouncyButtonGroup = (props: BouncyButtonGroupProps) => {
  const { children } = props
  const count = React.Children.count(children)
  const theme = useAppTheme()

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.colors.background }]}>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5
  }
})
