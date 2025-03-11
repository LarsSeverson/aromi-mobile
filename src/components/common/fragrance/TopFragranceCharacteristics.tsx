import { StyleSheet, View } from 'react-native'
import React from 'react'
import ScaleBar from '../../common/ScaleBar'
import { AllureIcon, BalanceIcon, ComplexityIcon, LongevityIcon, SillageIcon } from '@/src/constants/Icons'
import FragranceCategory from './FragranceCategory'
import { type CardFragranceTrait } from './TraitSlider'

export interface TopFragranceCharacteristicsCards {
  longevity?: CardFragranceTrait | undefined | null
  sillage?: CardFragranceTrait | undefined | null
  complexity?: CardFragranceTrait | undefined | null
  balance?: CardFragranceTrait | undefined | null
  allure?: CardFragranceTrait | undefined | null
}

export interface TopFragranceCharacteristicsProps {
  traits?: TopFragranceCharacteristicsCards | undefined | null
  onExpand?: () => void
}

const TopFragranceCharacteristics = (props: TopFragranceCharacteristicsProps) => {
  const { traits, onExpand } = props

  return (
    <FragranceCategory
      title='Characteristics'
      expandText='what are its characteristics?'
      onCategoryPressed={onExpand}
    >
      <View style={styles.wrapper}>
        {traits?.longevity != null && (
          <ScaleBar
            value={traits.longevity.value}
            label='longevity'
            Icon={<LongevityIcon />}
            lessLabel='very short'
            greaterLabel='very long'
          />)}
        {traits?.sillage != null && (
          <ScaleBar
            value={traits.sillage.value}
            label='sillage'
            Icon={<SillageIcon />}
            lessLabel='intimate'
            greaterLabel='expansive'
          />)}
        {traits?.complexity != null && (
          <ScaleBar
            value={traits.complexity.value}
            label='complexity'
            Icon={<ComplexityIcon />}
            lessLabel='simple'
            greaterLabel='intricate'
          />)}
        {traits?.balance != null && (
          <ScaleBar
            value={traits.balance.value}
            label='balance'
            Icon={<BalanceIcon />}
            lessLabel='unbalanced'
            greaterLabel='harmonious'
          />)}
        {traits?.allure != null && (
          <ScaleBar
            value={traits.allure.value}
            label='allure'
            Icon={<AllureIcon />}
            lessLabel='unappealing'
            greaterLabel='captivating'
          />)}
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
