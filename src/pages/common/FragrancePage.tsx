import React, { useCallback } from 'react'
import { useRouter } from 'expo-router'
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
import useFragranceTraits from '@/src/hooks/useFragranceTraits'
import { type FragranceInfo } from '@/src/hooks/useFragranceInfo'

export interface FragrancePageProps {
  fragranceInfo: FragranceInfo
}

const FragrancePage = (props: FragrancePageProps) => {
  const router = useRouter()

  const { fragranceInfo } = props
  const { id } = fragranceInfo

  const { data: traits } = useFragranceTraits(id)
  const { voteOnFragrance } = useVoteOnFragrance()

  const onFragranceVote = useCallback((myVote: boolean | null) => {
    const vars = { fragranceId: id, myVote }
    voteOnFragrance(vars)
  }, [id, voteOnFragrance])

  const gotoEditGender = useCallback(() => {
    router.push({
      pathname: '/(core)/home/fragrance/edit/characteristics',
      params: {
        fragranceId: id
      }
    })
  }, [router, id])

  const gotoEditAccords = useCallback(() => {
    router.push({
      pathname: '/(core)/home/fragrance/edit/accords',
      params: {
        fragranceId: id
      }
    })
  }, [router, id])

  const gotoEditNotes = useCallback(() => {
    router.push({
      pathname: '/(core)/home/fragrance/note-layers',
      params: {
        fragranceId: id
      }
    })
  }, [router, id])

  const gotoEditCharacteristics = useCallback(() => {
    router.push({
      pathname: '/(core)/home/fragrance/edit/characteristics',
      params: {
        fragranceId: id
      }
    })
  }, [router, id])

  const gotoFragranceReviews = useCallback((reviewId?: number | undefined) => {
    router.push({
      pathname: '/(core)/home/fragrance/reviews',
      params: {
        fragranceId: id,
        reviewId
      }
    })
  }, [router, id])

  const gotoAddFragranceReview = useCallback(() => {
    router.push({
      pathname: '/(core)/home/fragrance/edit/review'
    })
  }, [router])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FragranceImageCarousel
        fragranceId={id}
      />

      <Divider />

      <FragranceHeading
        fragranceInfo={fragranceInfo}
        onVote={onFragranceVote}
      />

      <Divider style={{ marginTop: 10 }} />

      <FragranceCategory
        title='Gender'
        expandText='masculine or feminine'
        onCategoryPressed={gotoEditGender}
      >
        <ScaleBar
          value={traits.gender.value}
          Icon={<GenderIcon />}
          lessLabel='feminine'
          greaterLabel='masculine'
        />
      </FragranceCategory>

      <TopFragranceAccords
        fragranceInfo={fragranceInfo}
        onExpand={gotoEditAccords}
      />

      <TopFragranceNotes
        fragranceInfo={fragranceInfo}
        onExpand={gotoEditNotes}
      />

      <TopFragranceCharacteristics
        traits={traits}
        onExpand={gotoEditCharacteristics}
      />

      <TopFragranceReviews
        fragranceInfo={fragranceInfo}
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
