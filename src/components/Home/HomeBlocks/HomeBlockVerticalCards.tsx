import { View, FlatList } from 'react-native'
import React, { useState } from 'react'
import HomeCategory from '../HomeCategory'
import { FragranceBlock, FragranceBlockTypes } from '../../FragranceBlocks/FragranceBlock'
import AromiButton from '../../Misc/ButtonText'
import { HomeBlockProps } from './HomeBlock'
import { styles } from './HomeBlockConstants'

const HomeBlockVerticalCards: React.FC<HomeBlockProps> = (props: HomeBlockProps) => {
  const cols = props.numColumns || 2
  const previewLength = props.previewLength || 6

  const { data, loading, error } = props.data
  const [blockData, setBlockData] = useState(Array(previewLength).fill(null))

  if (!loading && !error) {
    setBlockData(data)
  }

  return (
    <View style={styles.wrapper}>
      <HomeCategory onPress={props.onSeeAll}>{props.title}</HomeCategory>
      <FlatList
        data={blockData.slice(0, previewLength)}
        renderItem={({ item }) => (<FragranceBlock type={FragranceBlockTypes.VerticalCard} loading={loading} error={error} />)}
        scrollEnabled={false}
        numColumns={cols}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={cols ? { gap: 10 } : null}
        contentContainerStyle={styles.fragranceListWrapper}
      />
      <AromiButton onPress={props.onSeeAll}>see all</AromiButton>
    </View>
  )
}

export default HomeBlockVerticalCards