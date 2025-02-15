import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import BouncyButton from '../../BouncyButton'
import { useAppTheme } from '@/src/constants/Themes'

export interface FragranceCategoryProps {
  title: string
  expandText?: string
  children?: React.ReactNode
  onExpand?: () => void
}

const FragranceCategory: React.FC<FragranceCategoryProps> = (props: FragranceCategoryProps) => {
  const { title, expandText, children, onExpand } = props
  const theme = useAppTheme()

  return (
    <View style={styles.categoryWrapper}>
      <Text variant='titleSmall' style={{ fontWeight: 500 }}>{title}</Text>

      {children}

      {expandText && (
        <BouncyButton style={[styles.categoryButton, { borderColor: theme.colors.surfaceDisabled }]} onPress={onExpand}>
          <Text style={{ opacity: 0.8 }}>{expandText}</Text>
        </BouncyButton>
      )}

    </View>
  )
}

export default FragranceCategory

const styles = StyleSheet.create({
  categoryWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10
  },
  categoryButton: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    marginVertical: 10
  }
})
