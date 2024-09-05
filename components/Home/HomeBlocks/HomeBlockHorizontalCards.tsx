import { View, FlatList, ScrollView } from 'react-native'
import React from 'react'
import HomeCategory from '../HomeCategory'
import { FragranceBlock, FragranceBlockTypes } from '../../FragranceBlocks/FragranceBlock'
import { HomeBlockProps } from './HomeBlock'
import { styles } from './HomeBlockConstants'

const HomeBlockHorizontalCards: React.FC<HomeBlockProps> = (props: HomeBlockProps) => {
  const rows = props.numRows || 1
  const previewLength = props.previewLength || 12

  return (
    <View style={styles.wrapper}>
      <HomeCategory onPress={props.onSeeAll}>{props.title}</HomeCategory>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled
      >
        <FlatList
          data={props.data.slice(0, props.previewLength)}
          numColumns={Math.ceil(props.data.slice(0, previewLength * (rows)).length / rows)}
          renderItem={({ item }) => (<FragranceBlock type={FragranceBlockTypes.HorizontalCards} />)}
          alwaysBounceVertical={false}
          columnWrapperStyle={styles.fragranceListWrapper}
          contentContainerStyle={styles.fragranceListWrapper}
        />
      </ScrollView>
    </View>
  )
}

export default HomeBlockHorizontalCards
