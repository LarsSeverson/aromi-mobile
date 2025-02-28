import React, { useCallback, useRef } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import useFragrance, { FragranceVars } from '@/src/hooks/useFragrance'
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

const BASE_IMAGES_LIMIT = 5
const BASE_NOTES_LIMIT = 10
const BASE_ACCORDS_LIMIT = 8
const BASE_OFFSET = 0
const BASE_FILL = false

const FragrancePage = () => {
  const router = useRouter()
  const fragranceId = useRef(Number(useLocalSearchParams().fragranceId as string))

  const fragranceVariables = useRef<FragranceVars>({
    id: fragranceId.current,
    imagesLimit: BASE_IMAGES_LIMIT,
    imagesOffset: BASE_OFFSET,

    notesLimit: BASE_NOTES_LIMIT,
    notesOffset: BASE_OFFSET,
    notesFill: BASE_FILL,

    accordsLimit: BASE_ACCORDS_LIMIT,
    accordsOffset: BASE_OFFSET,
    accordsFill: BASE_FILL
  })

  const {
    fragrance,
    loading,
    error,
    refresh,
    voteOnFragrance
  } = useFragrance({ variables: fragranceVariables.current })

  const onFragranceVote = useCallback((myVote: boolean | null) => {
    if (!fragrance) return

    const vars = { fragranceId: fragrance.id, myVote }
    voteOnFragrance(vars, fragrance.vote)
  }, [fragrance, voteOnFragrance])

  const gotoEditGender = useCallback(() => {
    router.push({
      pathname: '/(core)/home/fragrance/edit/characteristics',
      params: {
        fragranceId: fragranceId.current
      }
    })
  }, [router])

  const gotoEditAccords = useCallback(() => {
    router.push({
      pathname: '/(core)/home/fragrance/edit/accords',
      params: {
        fragranceId: fragranceId.current
      }
    })
  }, [router])

  const gotoEditNotes = useCallback(() => {
    router.push({
      pathname: '/(core)/home/fragrance/note-layers',
      params: {
        fragranceId: fragranceId.current
      }
    })
  }, [router])

  const gotoEditCharacteristics = useCallback(() => {
    router.push({
      pathname: '/(core)/home/fragrance/edit/characteristics',
      params: {
        fragranceId: fragranceId.current
      }
    })
  }, [router])

  const gotoFragranceReviews = useCallback((reviewId?: number | undefined) => {
    router.push({
      pathname: '/(core)/home/fragrance/reviews',
      params: {
        fragranceId: fragranceId.current,
        reviewId
      }
    })
  }, [router])

  const gotoAddFragranceReview = useCallback(() => {
    router.push({
      pathname: '/(core)/home/fragrance/edit/review'
    })
  }, [router])

  if (loading.fragranceLoading || !fragrance) {
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
