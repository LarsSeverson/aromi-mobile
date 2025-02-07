import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Fragrance } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import ScaleBar from '../../stats/ScaleBar'
import { AllureIcon, BalanceIcon, ComplexityIcon, LongevityIcon, SillageIcon } from '@/src/constants/Icons'

export interface FragranceCharacteristicsProps {
  fragrance: Fragrance
}

const FragranceCharacteristics: React.FC<FragranceCharacteristicsProps> = ({ fragrance }) => {
  return (
    <View style={{ gap: 40 }}>
      <ScaleBar value={fragrance.longevity} label='longevity' Icon={<LongevityIcon />} lessLabel='very short' greaterLabel='very long' />
      <ScaleBar value={fragrance.sillage} label='sillage' Icon={<SillageIcon />} lessLabel='intimate' greaterLabel='expansive' />
      <ScaleBar value={fragrance.complexity} label='complexity' Icon={<ComplexityIcon />} lessLabel='simple' greaterLabel='intricate' />
      <ScaleBar value={fragrance.balance} label='balance' Icon={<BalanceIcon />} lessLabel='unbalanced' greaterLabel='harmonious' />
      <ScaleBar value={fragrance.allure} label='allure' Icon={<AllureIcon />} lessLabel='unappealing' greaterLabel='captivating' />
    </View>
  )
}

export default FragranceCharacteristics

const styles = StyleSheet.create({})
