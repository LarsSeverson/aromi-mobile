import { View, FlatList, ListRenderItemInfo } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeCategory from '../../home/HomeCategory'
import { FragranceBlock, FragranceBlockTypes } from '../fragrance-blocks/FragranceBlock'
import ButtonText from '../../utils/ButtonText'
import { HomeBlockProps } from './HomeBlock'
import { styles } from './HomeBlockConstants'
import { Colors } from '@/src/constants/Colors'
import { useRouter } from 'expo-router'
import { Fragrance } from '@/aromi-backend/src/graphql/types/fragranceTypes'

const HomeBlockVerticalCards: React.FC<HomeBlockProps> = (props: HomeBlockProps) => {
  const router = useRouter()
  const { numColumns = 2, previewLength = 6, data } = props
  const [blockData, setBlockData] = useState(Array(previewLength).fill(null))

  const onExpanded = (fragranceId: string) => {
    router.push({ pathname: '/home/fragrance/', params: { fragranceId } })
  }

  useEffect(() => {
    if (data) {
      setBlockData(data)
    }
  }, [data])

  return (
    <View style={styles.wrapper}>
      <HomeCategory onPress={props.onSeeAll}>{props.title}</HomeCategory>
      <FlatList
        data={blockData.slice(0, previewLength)}
        renderItem={({ item: fragrance }: ListRenderItemInfo<Fragrance> | any) => (
          <FragranceBlock type={FragranceBlockTypes.VerticalCard} fragrance={fragrance} onPress={() => onExpanded(fragrance.id)} />
        )}
        scrollEnabled={false}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={numColumns ? { gap: 10 } : null}
        contentContainerStyle={styles.fragranceListWrapper}
      />
      <ButtonText
        text='see all'
        color={Colors.button}
        textColor={Colors.white}
        textStyle={{ fontSize: 15 }}
        style={{ width: 100, padding: 8, borderRadius: 10, alignSelf: 'center' }}
        onPress={props.onSeeAll}
      />
    </View>
  )
}

export default HomeBlockVerticalCards
