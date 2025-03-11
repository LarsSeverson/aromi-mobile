import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import { type FragranceCollection } from '@/src/generated/graphql'
import GridImages from '../GridImages'
import { type FlattenType } from '@/src/common/util-types'

type FlattenedCollection = FlattenType<FragranceCollection>
type PartialUser = Pick<FlattenedCollection['user'], 'username'>
type PartialFragrance = Pick<FlattenedCollection['items'][number]['fragrance'], 'images'>
type PartialItem = Pick<FlattenedCollection['items'][number], 'id'> & { fragrance: PartialFragrance }
export type CardFragranceCollectionPreview = Pick<FlattenedCollection, 'name'> & { user: PartialUser, items: PartialItem[] }

export interface FragranceCollectoinPreviewCardProps {
  collection: CardFragranceCollectionPreview
}

const FragranceCollectionPreviewCard = (props: FragranceCollectoinPreviewCardProps) => {
  const { collection } = props
  const { items } = collection
  const images = items.flatMap(item => item.fragrance.images.map(image => image.url))

  return (
    <View style={styles.wrapper}>
      <View>
        <GridImages images={images} />
      </View>
      <View>
        <Text>{collection.name}</Text>
        <Text style={{ opacity: 0.8, fontSize: 13 }}>{collection.user.username}</Text>
      </View>
    </View>
  )
}

export default FragranceCollectionPreviewCard

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10
  }
})
