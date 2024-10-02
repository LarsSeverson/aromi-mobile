import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { FragranceBlockProps } from './FragranceBlock'
import BlockButton from '../Misc/BlockButton'
import FragranceBlockVerticalCardLoading from './Utils/FragranceBlockVerticalCardLoading'
import { Fragrance } from '@/aromi-backend/src/types/fragrance'
import { Colors } from '@/src/constants/Colors'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Name = styled.Text`
  font-family: 'PalanquinDark-Medium';
  font-size: small;
  color: ${Colors.black};
`

const Brand = styled.Text`
  font-family: 'Palanquin-SemiBold';
  font-size: 11px;
  color: ${Colors.black};
  margin-bottom: 12px;
`

const FragranceBlockVerticalCard: React.FC<FragranceBlockProps> = (props: FragranceBlockProps) => {
  const fragrance = props.fragrance as Fragrance

  if (!fragrance) {
    return (
      <FragranceBlockVerticalCardLoading />
    )
  }

  return (
    <View style={styles.wrapper}>
      <BlockButton style={styles.wrapper}>
        <View style={styles.wrapper}>
          <View style={styles.imageBackground} />
        </View>
      </BlockButton>
      <View style={styles.bottomWrapper}>
        <View style={styles.bottomTop}>
          <Name>{fragrance.name}</Name>
          <View style={styles.blockOptionsWrapper}>
            <BlockButton>
              <Icon name='more-horiz' size={20} color='#000' />
            </BlockButton>
          </View>
        </View>
        <Brand>{fragrance.brand}</Brand>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex'
  },
  imageBackground: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: Colors.black,
    opacity: 0.1,
    height: 200,
    overflow: 'hidden'
  },
  bottomWrapper: {
    paddingLeft: 10,
    paddingRight: 10
  },
  bottomTop: {
    flexDirection: 'row',
    overflow: 'hidden'
  },
  blockOptionsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto'
  }
})

export default FragranceBlockVerticalCard
