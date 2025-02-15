import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'
import BouncyButton from '../../BouncyButton'
import { Icon } from 'react-native-elements'
import { Text } from 'react-native-paper'
import { FragranceNote } from '@/aromi-backend/src/graphql/types/fragranceTypes'

export interface NotePreviewProps {
  note?: FragranceNote
  empty?: boolean
}

const NotePreview: React.FC<NotePreviewProps> = (props: NotePreviewProps) => {
  const { note, empty = false } = props

  const theme = useAppTheme()

  if (empty) {
    return (
      <View style={styles.wrapper}>
        <BouncyButton style={[styles.previewWrapper, { backgroundColor: theme.colors.surfaceDisabled }]}>
          <Icon name='plus-box' type='material-community' size={40} style={{ opacity: 0.5 }} />
        </BouncyButton>
      </View>
    )
  }

  if (!note) {
    return null
  }

  return (
    <View style={styles.wrapper}>
      <BouncyButton style={[styles.previewWrapper, { backgroundColor: theme.colors.surfaceDisabled }]} />
      <Text ellipsizeMode='tail' numberOfLines={1} style={{ marginLeft: 10 }}>{note.name.toLowerCase()}</Text>
    </View>
  )
}

export default NotePreview

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    overflow: 'hidden',
    width: 100
  },
  previewWrapper: {
    borderRadius: 20,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
