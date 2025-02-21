/* eslint-disable react/jsx-handler-names */
import { StyleSheet, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Text, TextInput } from 'react-native-paper'
import { useAppTheme } from '@/src/constants/Themes'
import { Colors } from '@/src/constants/Colors'
import SubmitButton from '@/src/components/SubmitButton'
import EditableRatingStars from '@/src/components/EditableRatingStars'
import { KeyboardScrollView } from '@rlemasquerier/react-native-keyboard-scrollview'
import useReviewFragrance from '@/src/hooks/useReviewFragrance'

const AddReviewPage = () => {
  const theme = useAppTheme()
  const { fragranceId } = useLocalSearchParams<{ fragranceId: string }>()
  const numFragId = Number(fragranceId)

  if (isNaN(numFragId)) {
    // TODO:
  }

  const { reviewFragrance, loading, error } = useReviewFragrance()

  error && console.log(error)

  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  const submitReview = useCallback(() => reviewFragrance({
    fragranceId: numFragId,
    myRating: rating,
    myReview: review
  }), [numFragId, rating, review, reviewFragrance])

  return (
    <KeyboardScrollView
      keyboardShouldPersistTaps='handled'
      scrollEnabled={false}
      contentContainerStyle={styles.wrapper}
    >
      <View style={[styles.wrapper, { padding: 0 }]}>
        <Text variant='titleMedium'>How would you rate your experience?</Text>
        <EditableRatingStars
          rating={0}
          size={28}
          filledColor={Colors.button}
          emptyColor={theme.colors.onSurfaceDisabled}
          style={{ alignSelf: 'center' }}
          onRatingChange={setRating}
        />
        <Text variant='titleMedium'>Tell us about your experience</Text>
        <View style={{ flex: 1 }}>
          <TextInput
            multiline
            mode='outlined'
            dense
            outlineStyle={{ borderRadius: 5 }}
            style={{ height: 200 }}
            contentStyle={{ fontFamily: 'RobotoMono' }}
            activeOutlineColor={theme.colors.primary}
            selectionColor={Colors.cursor}
            onChangeText={setReview}
          />
        </View>
        <SubmitButton
          text='Add Review'
          disabled={rating === 0}
          onPress={submitReview}
        />
      </View>
    </KeyboardScrollView>
  )
}

export default AddReviewPage

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    gap: 20,
    height: '100%'
  }
})
