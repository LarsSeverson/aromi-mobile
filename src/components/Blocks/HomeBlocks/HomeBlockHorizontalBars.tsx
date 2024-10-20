import { FlatList, ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HomeBlockProps } from './HomeBlock'
import { styles } from './HomeBlockConstants'
import HomeCategory from '../../Home/HomeCategory'
import { FragranceBlock, FragranceBlockTypes } from '../FragranceBlocks/FragranceBlock'

const HomeBlockHorizontalBars: React.FC<HomeBlockProps> = (props: HomeBlockProps) => {
  const rows = props.numRows || 1
  const previewLength = props.previewLength || 12

  const data = props.data
  const [blockData, setBlockData] = useState(Array(previewLength).fill(null))

  useEffect(() => {
    if (data) {
      setBlockData(data)
    }
  }, [data])

  return (
    <View style={styles.wrapper}>
      <HomeCategory expandable={false}>{props.title}</HomeCategory>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled
      >
        <FlatList
          data={blockData.slice(0, props.previewLength)}
          numColumns={Math.ceil(blockData.slice(0, previewLength * (rows)).length / rows)}
          renderItem={({ item }) => (<FragranceBlock type={FragranceBlockTypes.HorizontalBar} fragrance={item} />)}
          alwaysBounceVertical={false}
          columnWrapperStyle={styles.fragranceListWrapper}
          contentContainerStyle={styles.fragranceListWrapper}
        />
      </ScrollView>
    </View>
  )
}

export default HomeBlockHorizontalBars
