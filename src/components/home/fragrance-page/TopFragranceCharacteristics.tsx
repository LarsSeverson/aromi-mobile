import { StyleSheet, View } from 'react-native'
import React from 'react'
import { FragranceTraits } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import ScaleBar from '../../common/ScaleBar'
import { AllureIcon, BalanceIcon, ComplexityIcon, LongevityIcon, SillageIcon } from '@/src/constants/Icons'
import FragranceCategory from './FragranceCategory'

export interface FragranceCharacteristicsPreviewProps {
  traits: FragranceTraits
  onExpand?: () => void
}

const TopFragranceCharacteristics: React.FC<FragranceCharacteristicsPreviewProps> = (props: FragranceCharacteristicsPreviewProps) => {
  const { traits, onExpand } = props

  return (
    <FragranceCategory title='Characteristics' expandText='what are its characteristics?' onCategoryPressed={onExpand}>
      <View style={styles.wrapper}>
        <ScaleBar value={traits.longevity.value} label='longevity' Icon={<LongevityIcon />} lessLabel='very short' greaterLabel='very long' />
        <ScaleBar value={traits.sillage.value} label='sillage' Icon={<SillageIcon />} lessLabel='intimate' greaterLabel='expansive' />
        <ScaleBar value={traits.complexity.value} label='complexity' Icon={<ComplexityIcon />} lessLabel='simple' greaterLabel='intricate' />
        <ScaleBar value={traits.balance.value} label='balance' Icon={<BalanceIcon />} lessLabel='unbalanced' greaterLabel='harmonious' />
        <ScaleBar value={traits.allure.value} label='allure' Icon={<AllureIcon />} lessLabel='unappealing' greaterLabel='captivating' />
      </View>
    </FragranceCategory>
  )
}

export default TopFragranceCharacteristics

const styles = StyleSheet.create({
  wrapper: {
    gap: 40
  }
})
