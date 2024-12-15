import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'

export interface NotePreviewProps {
  empty?: boolean
}

const NotePreview: React.FC<NotePreviewProps> = (props: NotePreviewProps) => {
  const { empty = false } = props

  const theme = useAppTheme()
  const note = ''

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.colors.surfaceDisabled }]} />
  )
}

export default NotePreview

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    flex: 1,
    height: 70,
    width: 70
  }
})
