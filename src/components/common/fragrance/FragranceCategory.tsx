import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import BouncyButton from '../../common/BouncyButton'
import { useAppTheme } from '@/src/constants/Themes'
import TextButton from '../../common/TextButton'

export interface FragranceCategoryProps {
  title: string
  expandText?: string | undefined
  showSeeAll?: boolean | undefined
  children?: React.ReactNode
  onCategoryPressed?: () => void
  onSeeAll?: () => void
}

const FragranceCategory = (props: FragranceCategoryProps) => {
  const {
    title,
    expandText,
    showSeeAll,
    children,
    onCategoryPressed,
    onSeeAll
  } = props
  const theme = useAppTheme()

  return (
    <View style={styles.categoryWrapper}>
      <View style={styles.headingWrapper}>
        <Text
          variant='headlineSmall'
          style={{ fontWeight: 500 }}
        >
          {title}
        </Text>
        {(showSeeAll ?? false) && <TextButton text='see all' onPress={onSeeAll} />}
      </View>

      {children}

      {(expandText != null) && (
        <BouncyButton
          style={[styles.categoryButton, { borderColor: theme.colors.surfaceDisabled }]}
          onPress={onCategoryPressed}
        >
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
  },
  headingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
