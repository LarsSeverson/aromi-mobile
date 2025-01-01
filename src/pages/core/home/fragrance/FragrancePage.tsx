import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import useFragrance from '@/src/hooks/useFragrance'
import AromiImage from '@/src/components/utils/AromiImage'
import { Divider, Text } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { GenderIcon, ThumbDownIcon } from '@/src/constants/Icons'
import BouncyButton from '@/src/components/utils/BouncyButton'
import { Icon } from 'react-native-elements'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'
import ScaleBar from '@/src/components/stats/ScaleBar'
import ButtonText from '@/src/components/utils/ButtonText'
import AccordBars from '@/src/components/fragrance/AccordBars'
import NotesPyramid from '@/src/components/fragrance/NotesPyramid'
import { FragranceNotes } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import FragranceCharacteristics from '@/src/components/fragrance/FragranceCharacteristics'
import RatingStars from '@/src/components/stats/RatingStars'
import FragranceHeading from '@/src/components/fragrance/FragranceHeading'
import FragranceCategory from '@/src/components/fragrance/FragranceCategory'

const FragrancePage = () => {
  const router = useRouter()
  const fragranceId = Number(useLocalSearchParams().fragranceId as string)
  const { data: fragrance, loading, error, refresh } = useFragrance(fragranceId)

  if (loading || !fragrance) {
    return null
  }

  const previewUrl = fragrance.images?.[0]?.s3Key || undefined

  const gotoEditGender = () => {
    router.push('/(core)/home/fragrance/edit/gender')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <AromiImage path={previewUrl} style={styles.imageWrapper}>
        <BouncyButton style={{ position: 'absolute', top: 20, right: 20 }}>
          <Icon name='dots-vertical' type='material-community' backgroundColor={Colors.placeholder2} style={{ padding: 7, borderRadius: 50 }} />
        </BouncyButton>
        <BouncyButton style={{ position: 'absolute', bottom: 20, right: 20 }}>
          <Icon name='bookmark-outline' backgroundColor={Colors.placeholder2} style={{ padding: 7, borderRadius: 50 }} />
        </BouncyButton>
      </AromiImage>

      <Divider />

      <FragranceHeading
        name={fragrance.name}
        brand={fragrance.brand}
        rating={fragrance.rating}
        reviewCount={fragrance.reviewCount}
        dislikes={fragrance.dislikes}
        likes={fragrance.likes}
      />

      <Divider style={{ marginTop: 10 }} />

      <FragranceCategory title='Gender' buttonText='masculine or feminine' onButtonPress={gotoEditGender}>
        <ScaleBar value={fragrance.gender} Icon={<GenderIcon />} />
      </FragranceCategory>

      <FragranceCategory title='Top accords' buttonText='how are the accords?'>
        <AccordBars accords={fragrance.accords} />
      </FragranceCategory>

      <FragranceCategory title='Notes' buttonText='how do the notes develop?'>
        <NotesPyramid notes={fragrance.notes} />
      </FragranceCategory>

      <FragranceCategory title='Characteristics' buttonText='what are its characteristics?'>
        <FragranceCharacteristics fragrance={fragrance} />
      </FragranceCategory>

      <FragranceCategory title='Reviews' buttonText='write a review'>
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
  }
})
