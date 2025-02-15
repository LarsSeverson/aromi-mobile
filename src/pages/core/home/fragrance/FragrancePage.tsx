import { StyleSheet, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import useFragrance, { FragranceVars } from '@/src/hooks/useFragrance'
import { Divider, Text } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { GenderIcon } from '@/src/constants/Icons'
import BouncyButton from '@/src/components/BouncyButton'
import { Colors } from '@/src/constants/Colors'
import ScaleBar from '@/src/components/stats/ScaleBar'
import AccordsLadder from '@/src/components/home/fragrance-page/AccordsLadder'
import NotesPyramid from '@/src/components/home/fragrance-page/NotesPyramid'
import FragranceCharacteristics from '@/src/components/home/fragrance-page/FragranceCharacteristics'
import FragranceHeading from '@/src/components/home/fragrance-page/FragranceHeading'
import FragranceCategory from '@/src/components/home/fragrance-page/FragranceCategory'
import useS3Image from '@/src/hooks/useS3Image'
import { Image } from 'expo-image'
import { Icon } from 'react-native-elements'

const BASE_IMAGES_LIMIT = 5
const BASE_NOTES_LIMIT = 10
const BASE_ACCORDS_LIMIT = 8
const BASE_OFFSET = 0
const BASE_FILL = false

const FragrancePage = () => {
  const router = useRouter()
  const fragranceId = Number(useLocalSearchParams().fragranceId as string)

  const fragranceVariables = useRef<FragranceVars>({
    id: fragranceId,
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
  } = useFragrance(fragranceVariables.current)

  // Temp
  const { path, loading: imgLoading } = useS3Image(fragrance?.images?.at(0)?.url)

  const onFragranceVote = useCallback((myVote: boolean | null) => {
    if (!fragrance) return

    const vars = { fragranceId: fragrance.id, myVote }
    voteOnFragrance(vars, fragrance.vote)
  }, [fragrance, voteOnFragrance])

  const gotoEditGender = () => {
    router.push({
      pathname: '/(core)/home/fragrance/edit/characteristics',
      params: {
        fragranceId
      }
    })
  }

  const gotoEditAccords = () => {
    router.push({
      pathname: '/(core)/home/fragrance/edit/accords',
      params: {
        fragranceId
      }
    })
  }

  const gotoEditNotes = () => {
    router.push({
      pathname: '/(core)/home/fragrance/edit/notes',
      params: {
        fragranceId
      }
    })
  }

  const gotoEditCharacteristics = () => {
    router.push({
      pathname: '/(core)/home/fragrance/edit/characteristics',
      params: {
        fragranceId
      }
    })
  }

  if (loading.fragranceLoading || !fragrance) {
    return null
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.imageWrapper}>
        {path && <Image source={{ uri: path }} style={styles.image} />}
        <BouncyButton style={{ position: 'absolute', top: 20, right: 20 }}>
          <Icon name='dots-vertical' type='material-community' backgroundColor={Colors.placeholder2} style={{ padding: 7, borderRadius: 50 }} />
        </BouncyButton>
        <BouncyButton style={{ position: 'absolute', bottom: 20, right: 20 }}>
          <Icon name='bookmark-outline' backgroundColor={Colors.placeholder2} style={{ padding: 7, borderRadius: 50 }} />
        </BouncyButton>
      </View>

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

      <FragranceCategory title='Gender' expandText='masculine or feminine' onExpand={gotoEditGender}>
        <ScaleBar
          value={fragrance.traits.gender.value}
          Icon={<GenderIcon />}
          lessLabel='feminine'
          greaterLabel='masculine'
        />
      </FragranceCategory>

      <FragranceCategory title='Top accords' expandText='how are the accords?' onExpand={gotoEditAccords}>
        <AccordsLadder accords={fragrance.accords} />
      </FragranceCategory>

      <FragranceCategory title='Notes' expandText='how do the notes develop?' onExpand={gotoEditNotes}>
        <NotesPyramid notes={fragrance.notes} />
      </FragranceCategory>

      <FragranceCategory title='Characteristics' expandText='what are its characteristics?' onExpand={gotoEditCharacteristics}>
        <FragranceCharacteristics traits={fragrance.traits} />
      </FragranceCategory>

      <FragranceCategory title='Reviews' expandText='write a review'>
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <Text variant='titleSmall' style={{ opacity: 0.8 }}>No reviews yet</Text>
          <Text variant='labelMedium' style={{ textAlign: 'center', opacity: 0.8 }}>Tried this fragrance? Help out the community by sharing your experience</Text>
        </View>
      </FragranceCategory>

      <FragranceCategory title='More like this' />

      <View style={{ paddingHorizontal: 20, paddingVertical: 10, gap: 10 }}>
        <BouncyButton style={{ alignItems: 'center', justifyContent: 'center', height: 48, marginVertical: 10, backgroundColor: Colors.button }}>
          <Text style={{ color: Colors.white }}>did we get something wrong?</Text>
        </BouncyButton>
      </View>

    </ScrollView>
  )
}

export default FragrancePage

const styles = StyleSheet.create({
  imageWrapper: {
    height: 400,
    position: 'relative'
  },
  image: {
    flex: 1
  }
})
