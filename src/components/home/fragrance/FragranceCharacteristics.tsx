import { StyleSheet, View } from 'react-native'
import React from 'react'
import { FragranceTraits } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import ScaleBar from '../../stats/ScaleBar'
import { AllureIcon, BalanceIcon, ComplexityIcon, LongevityIcon, SillageIcon } from '@/src/constants/Icons'

export interface FragranceCharacteristicsProps {
  traits: FragranceTraits
}

const FragranceCharacteristics: React.FC<FragranceCharacteristicsProps> = (props: FragranceCharacteristicsProps) => {
  const { traits } = props

  return (
    <View style={{ gap: 40 }}>
      <ScaleBar value={traits.longevity.value} label='longevity' Icon={<LongevityIcon />} lessLabel='very short' greaterLabel='very long' />
      <ScaleBar value={traits.sillage.value} label='sillage' Icon={<SillageIcon />} lessLabel='intimate' greaterLabel='expansive' />
      <ScaleBar value={traits.complexity.value} label='complexity' Icon={<ComplexityIcon />} lessLabel='simple' greaterLabel='intricate' />
      <ScaleBar value={traits.balance.value} label='balance' Icon={<BalanceIcon />} lessLabel='unbalanced' greaterLabel='harmonious' />
      <ScaleBar value={traits.allure.value} label='allure' Icon={<AllureIcon />} lessLabel='unappealing' greaterLabel='captivating' />
    </View>
  )
}

export default FragranceCharacteristics

const styles = StyleSheet.create({})
