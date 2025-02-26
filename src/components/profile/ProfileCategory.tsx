import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import BouncyButton from '../common/BouncyButton'
import TextButton from '../common/TextButton'
import { useAppTheme } from '@/src/constants/Themes'

export interface ProfileCategoryProps {
  title: string
  expandText?: string | undefined
  showSeeAll?: boolean | undefined
  children?: React.ReactNode
  onCategoryPressed?: () => void
  onSeeAll?: () => void
}

const ProfileCategory = (props: ProfileCategoryProps) => {
  const theme = useAppTheme()
  const {
    title,
    expandText,
    showSeeAll,
    children,
    onCategoryPressed,
    onSeeAll
  } = props

  return (
    <View style={styles.categoryWrapper}>
      <View style={styles.headingWrapper}>
        <Text variant='headlineSmall' style={{ fontWeight: 500 }}>{title}</Text>
        {showSeeAll && <TextButton text='see all' onPress={onSeeAll} />}
      </View>

      {children}

      {expandText && (
        <BouncyButton style={[styles.categoryButton, { borderColor: theme.colors.surfaceDisabled }]} onPress={onCategoryPressed}>
          <Text style={{ opacity: 0.8 }}>{expandText}</Text>
        </BouncyButton>
      )}
    </View>
  )
}

export default ProfileCategory

const styles = StyleSheet.create({
  categoryWrapper: {
    gap: 10,
    paddingVertical: 20
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
