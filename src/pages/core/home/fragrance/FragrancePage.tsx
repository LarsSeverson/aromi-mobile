import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import useFragrance from '@/src/hooks/useFragrance'
import AromiImage from '@/src/components/utils/AromiImage'
import { Divider, Text } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { ThumbDownIcon } from '@/src/constants/Icons'
import CIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import BouncyButton from '@/src/components/utils/BouncyButton'
import { Icon } from 'react-native-elements'
import { Colors } from '@/src/constants/Colors'

const FragrancePage = () => {
  const fragranceId = Number(useLocalSearchParams().fragranceId as string)

  const { data: fragrance, loading, error, refresh } = useFragrance(fragranceId)

  if (loading || !fragrance) {
    return null
  }

  const previewUrl = fragrance.images?.[0]?.s3Key || undefined

  return (
    <ScrollView>
      <AromiImage path={previewUrl} style={styles.imageWrapper} imageProps={{ resizeMode: 'contain' }}>
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
          <View style={{ padding: 5 }}>
            <ThumbDownIcon />
          </View>
          <Text>{fragrance.dislikes}</Text>
        </View>
        <View style={{ flex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text variant='titleMedium' style={{ fontWeight: 500 }}>{fragrance.name}</Text>
          <Text>{fragrance.brand}</Text>
          <Text variant='titleSmall'>{fragrance.rating}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <CIcon name='heart-outline' size={22} style={{ padding: 5 }} />
          <Text>{fragrance.likes}</Text>
        </View>
      </View>
      <Divider />
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
    justifyContent: 'center'
  }
})
