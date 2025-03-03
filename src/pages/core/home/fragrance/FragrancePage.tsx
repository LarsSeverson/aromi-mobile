import React, { useCallback } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import useFragrance from '@/src/hooks/useFragrance'
import { Divider } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { GenderIcon } from '@/src/constants/Icons'
import { Colors } from '@/src/constants/Colors'
import ScaleBar from '@/src/components/common/ScaleBar'
import FeedbackButton from '@/src/components/common/FeedbackButton'
import { StyleSheet, View } from 'react-native'
import FragranceImageCarousel from '@/src/components/common/fragrance/FragranceImageCarousel'
import FragranceHeading from '@/src/components/common/fragrance/FragranceHeading'
import FragranceCategory from '@/src/components/common/fragrance/FragranceCategory'
import TopFragranceAccords from '@/src/components/common/fragrance/TopFragranceAccords'
import TopFragranceNotes from '@/src/components/common/fragrance/TopFragranceNotes'
import TopFragranceCharacteristics from '@/src/components/common/fragrance/TopFragranceCharacteristics'
import TopFragranceReviews from '@/src/components/common/fragrance/TopFragranceReviews'
import useVoteOnFragrance from '@/src/hooks/useVoteOnFragrance'

const FragrancePage = () => {
  const router = useRouter()
  const { fragranceId } = useLocalSearchParams<{ fragranceId: string }>()

  const { fragrance, loading } = useFragrance({ id: Number(fragranceId) })
  const { voteOnFragrance } = useVoteOnFragrance()

  console.log(fragranceId)

  const onFragranceVote = useCallback((myVote: boolean | null) => {
    if (fragrance == null) return

    const { id, vote } = fragrance
    const vars = { fragranceId: id, myVote }

    voteOnFragrance(vars, vote)
  }, [fragrance, voteOnFragrance])

  const gotoEditGender = useCallback(() => {
    router.push({
      pathname: '/(core)/home/fragrance/edit/characteristics',
      params: {
        fragranceId
      }
    })
  }, [router, fragranceId])

  const gotoEditAccords = useCallback(() => {
    router.push({
      pathname: '/(core)/home/fragrance/edit/accords',
      params: {
        fragranceId
      }
    })
  }, [router, fragranceId])

  const gotoEditNotes = useCallback(() => {
    router.push({
      pathname: '/(core)/home/fragrance/note-layers',
      params: {
        fragranceId
      }
    })
  }, [router, fragranceId])

  const gotoEditCharacteristics = useCallback(() => {
    router.push({
      pathname: '/(core)/home/fragrance/edit/characteristics',
      params: {
        fragranceId
      }
    })
  }, [router, fragranceId])

  const gotoFragranceReviews = useCallback((reviewId?: number | undefined) => {
    router.push({
      pathname: '/(core)/home/fragrance/reviews',
      params: {
        fragranceId,
        reviewId
      }
    })
  }, [router, fragranceId])

  const gotoAddFragranceReview = useCallback(() => {
    router.push({
      pathname: '/(core)/home/fragrance/edit/review'
    })
  }, [router])

  if (loading || fragrance == null) {
    return null
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FragranceImageCarousel images={fragrance.images} />

      <Divider />

      <FragranceHeading
        name={fragrance.name}
        brand={fragrance.brand}
        rating={fragrance.rating}
        reviewsCount={fragrance.reviewsCount}
        vote={fragrance.vote}
        onVote={onFragranceVote}
      />

      <Divider style={{ marginTop: 10 }} />

      <FragranceCategory title='Gender' expandText='masculine or feminine' onCategoryPressed={gotoEditGender}>
        <ScaleBar value={fragrance.traits.gender.value} Icon={<GenderIcon />} lessLabel='feminine' greaterLabel='masculine' />
      </FragranceCategory>

      <TopFragranceAccords
        accords={fragrance.accords}
        onExpand={gotoEditAccords}
      />

      <TopFragranceNotes
        notes={fragrance.notes}
        onExpand={gotoEditNotes}
      />

      <TopFragranceCharacteristics
        traits={fragrance.traits}
        onExpand={gotoEditCharacteristics}
      />

      <TopFragranceReviews
        reviews={fragrance.reviews}
        onExpandReviews={gotoFragranceReviews}
        onWriteReview={gotoAddFragranceReview}
      />

      <View style={styles.feedbackWrapper}>
        <FeedbackButton
          text='Did we get something wrong?'
          color={Colors.button}
          textColor={Colors.white}
        />
      </View>

    </ScrollView>
  )
}

export default FragrancePage

const styles = StyleSheet.create({
  feedbackWrapper: {
    padding: 10,
    paddingBottom: 40
  }
})
