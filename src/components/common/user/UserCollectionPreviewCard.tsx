import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import { type FragranceCollection } from '@/src/generated/graphql'
import GridImages from '../GridImages'

type PartialFragrance = Pick<FragranceCollection['fragrances'][number], 'images'>
type PartialUser = Pick<FragranceCollection['user'], 'username'>
export type CardUserCollection = Pick<FragranceCollection, 'name' > & { user: PartialUser } & { fragrances: PartialFragrance[] }

export interface UserCollectionPreviewCardProps {
  collection: CardUserCollection
}

const UserCollectionPreviewCard = (props: UserCollectionPreviewCardProps) => {
  const { collection } = props
  const images = collection.fragrances.flatMap(fragrance => fragrance.images.map(image => image.url))

  return (
    <View style={styles.wrapper}>
      <View>
        <GridImages images={images} />
      </View>
      <View style={styles.text}>
        <Text>{collection.name}</Text>
        <Text style={{ opacity: 0.8, fontSize: 13 }}>{collection.user.username}</Text>
      </View>
    </View>
  )
}

export default UserCollectionPreviewCard

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 200,
    height: 200
  },
  text: {
    // padding: 20
  }
})
