import { StyleSheet, View } from 'react-native'
import React from 'react'
import ProfileCategory from './ProfileCategory'
import { Text } from 'react-native-paper'
import { FragrancePreviewCollection } from '@/src/hooks/useUserPreview'
import UserCollectionPreviewCard from './UserCollectionPreviewCard'

export interface UserCollectionsProps {
  collections: FragrancePreviewCollection[]
  editable?: boolean | undefined
}

const UserCollections = (props: UserCollectionsProps) => {
  const { collections, editable } = props

  return (
    <ProfileCategory title='Collections'>
      <View>
        {[
          { id: 1, name: 'Collection 1', fragrances: [{ id: 1, images: [{ id: 1, url: '' }, { id: 1, url: '' }, { id: 1, url: '' }, { id: 1, url: '' }] }], user: { username: 'LarsSeverosn' } }
        ].map((collection, index) => (
          <UserCollectionPreviewCard key={index} collection={collection} />
        ))}
      </View>
    </ProfileCategory>
  )
}

export default UserCollections

const styles = StyleSheet.create({})
