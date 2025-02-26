/* eslint-disable react/jsx-handler-names */
import { StyleSheet, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Text, TextInput } from 'react-native-paper'
import { useAppTheme } from '@/src/constants/Themes'
import { Colors } from '@/src/constants/Colors'
import SubmitButton from '@/src/components/common/SubmitButton'
import EditableRatingStars from '@/src/components/common/EditableRatingStars'
import { KeyboardScrollView } from '@rlemasquerier/react-native-keyboard-scrollview'
import useReviewFragrance from '@/src/hooks/useReviewFragrance'
import { showNotifaction } from '@/src/components/notify/ShowNotification'
import FeedbackSuccess from '@/src/components/common/FeedbackSuccess'

const AddReviewPage = () => {
  const router = useRouter()
  const theme = useAppTheme()
  const { fragranceId } = useLocalSearchParams<{ fragranceId: string }>()
  const numFragId = Number(fragranceId)

  if (isNaN(numFragId)) {
    // TODO:
  }

  const { reviewFragrance, loading, error } = useReviewFragrance()

  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [done, setDone] = useState(false)

  const submitReview = useCallback(async () => {
    try {
      await reviewFragrance({ fragranceId: numFragId, myRating: rating, myReview: review })
      setDone(true)
    } catch (error) {
      showNotifaction.error('Something went wrong adding your review')
    }
  }, [numFragId, rating, review, reviewFragrance])

  if (done) {
    return (
      <FeedbackSuccess
        feedback='Review posted!'
        buttonText='Back to reviews'
        onButtonPress={() => router.dismiss()}
      />
    )
  }

  return (
    <KeyboardScrollView
      keyboardShouldPersistTaps='handled'
      scrollEnabled={false}
      contentContainerStyle={styles.wrapper}
    >
      <View style={[styles.wrapper, { padding: 0 }]}>
        <Text variant='titleMedium'>How would you rate this fragrance?</Text>
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
          loading={loading}
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
