import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import useFragrance from '@/src/hooks/useFragrance'
import AromiImage from '@/src/components/utils/AromiImage'
import { Divider, Text } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { GenderIcon, ThumbDownIcon } from '@/src/constants/Icons'
import CIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import BouncyButton from '@/src/components/utils/BouncyButton'
import { Icon } from 'react-native-elements'
import { Colors } from '@/src/constants/Colors'
import { useAppTheme } from '@/src/constants/Themes'
import ScaleBar from '@/src/components/stats/ScaleBar'
import ButtonText from '@/src/components/utils/ButtonText'
import AccordBars from '@/src/components/stats/AccordBars'
import NotesPyramid from '@/src/components/fragrance/NotesPyramid'
import { FragranceNotes } from '@/aromi-backend/src/graphql/types/fragranceTypes'

const FragrancePage = () => {
  const theme = useAppTheme()
  const fragranceId = Number(useLocalSearchParams().fragranceId as string)

  const { data: fragrance, loading, error, refresh } = useFragrance(fragranceId)

  if (loading || !fragrance) {
    return null
  }

  const previewUrl = fragrance.images?.[0]?.s3Key || undefined
  const tempGenderStat = 0.5

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

      <View style={styles.titleWrapper}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <BouncyButton>
            <View style={{ padding: 5 }}>
              <ThumbDownIcon />
            </View>
          </BouncyButton>
          <Text>{fragrance.dislikes}</Text>
        </View>
        <View style={{ flex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text variant='titleMedium' style={{ fontWeight: 500 }}>{fragrance.name}</Text>
          <Text>{fragrance.brand}</Text>
          <Text variant='titleSmall'>{fragrance.rating}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <BouncyButton>
            <CIcon name='heart-outline' size={25} style={{ padding: 5 }} color={theme.colors.icon} />
          </BouncyButton>
          <Text>{fragrance.likes}</Text>
        </View>
      </View>

      <Divider />

      <View style={{ paddingHorizontal: 20, paddingVertical: 10, gap: 10 }}>
        <Text variant='titleSmall' style={{ fontWeight: 500 }}>Gender</Text>
        <GenderIcon />
        <ScaleBar value={tempGenderStat} style={{ marginTop: 10 }} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ opacity: 0.6 }}>feminine</Text>
          <Text style={{ marginLeft: 'auto', opacity: 0.6 }}>masculine</Text>
        </View>
        <BouncyButton style={{ borderWidth: 1, alignItems: 'center', justifyContent: 'center', height: 48, borderColor: theme.colors.surfaceDisabled, marginVertical: 10 }}>
          <Text style={{ opacity: 0.8 }}>masculine or feminine?</Text>
        </BouncyButton>
      </View>

      <View style={{ paddingHorizontal: 20, paddingVertical: 10, gap: 10 }}>
        <Text variant='titleSmall' style={{ fontWeight: 500 }}>Top accords</Text>
        <AccordBars accords={fragrance.accords} />
        <BouncyButton style={{ borderWidth: 1, alignItems: 'center', justifyContent: 'center', height: 48, borderColor: theme.colors.surfaceDisabled, marginVertical: 10 }}>
          <Text style={{ opacity: 0.8 }}>how are the accords?</Text>
        </BouncyButton>
      </View>

      <View style={{ paddingHorizontal: 20, paddingVertical: 10, gap: 10 }}>
        <Text variant='titleSmall' style={{ fontWeight: 500 }}>Notes</Text>
        <NotesPyramid topNotes={[] as FragranceNotes} middleNotes={[] as FragranceNotes} baseNotes={[] as FragranceNotes} />
        <BouncyButton style={{ borderWidth: 1, alignItems: 'center', justifyContent: 'center', height: 48, borderColor: theme.colors.surfaceDisabled, marginVertical: 10 }}>
          <Text style={{ opacity: 0.8 }}>how do the notes develop?</Text>
        </BouncyButton>
      </View>

      <View style={{ paddingHorizontal: 20, paddingVertical: 10, gap: 10 }}>
        <Text variant='titleSmall' style={{ fontWeight: 500 }}>Characteristics</Text>
        <BouncyButton style={{ borderWidth: 1, alignItems: 'center', justifyContent: 'center', height: 48, borderColor: theme.colors.surfaceDisabled, marginVertical: 10 }}>
          <Text style={{ opacity: 0.8 }}>what are its characteristics?</Text>
        </BouncyButton>
      </View>

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
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5
  }
})
