import { View, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import HomeCategory from '../../home/HomeCategory'
import { FragranceBlock, FragranceBlockTypes } from '../fragrance-blocks/FragranceBlock'
import { HomeBlockProps } from './HomeBlock'
import { styles } from './HomeBlockConstants'

const HomeBlockHorizontalCards: React.FC<HomeBlockProps> = (props: HomeBlockProps) => {
  const rows = props.numRows || 1
  const previewLength = props.previewLength || 6

  const data = props.data
  const [blockData, setBlockData] = useState(Array(previewLength).fill(null))

  useEffect(() => {
    if (data) {
      setBlockData(data)
    }
  }, [data])

  return (
    <View style={styles.wrapper}>
      <HomeCategory onPress={props.onSeeAll}>{props.title}</HomeCategory>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled
      >
        <FlatList
          data={blockData.slice(0, previewLength)}
          numColumns={Math.ceil(blockData.slice(0, previewLength * (rows)).length / rows)}
          renderItem={({ item }) => (<FragranceBlock type={FragranceBlockTypes.HorizontalCard} fragrance={item} />)}
          alwaysBounceVertical={false}
          columnWrapperStyle={styles.fragranceListWrapper}
          contentContainerStyle={styles.fragranceListWrapper}
        />
      </ScrollView>
    </View>
  )
}

export default HomeBlockHorizontalCards
