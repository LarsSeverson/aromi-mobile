import { StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useLocalSearchParams } from 'expo-router'
import { AllureIcon, BalanceIcon, ComplexityIcon, GenderIcon, LongevityIcon, SillageIcon } from '@/src/constants/Icons'
import FeedbackButton from '@/src/components/common/FeedbackButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import useFragranceTraits from '@/src/hooks/useFragranceTraits'
import TraitSliderProps, { type CardFragranceTrait } from '@/src/components/common/fragrance/TraitSlider'
import useVoteOnTrait from '@/src/hooks/useVoteOnTrait'

const EditCharacteristicsPage = () => {
  const fragranceId = Number(useLocalSearchParams<{ fragranceId: string }>().fragranceId)

  const { data, loading } = useFragranceTraits(fragranceId)
  const { voteOnTrait } = useVoteOnTrait()

  const handleVoteChanged = useCallback((value: number, trait: CardFragranceTrait) => {
    voteOnTrait({
      fragranceId,
      trait: trait.trait,
      myVote: value
    }, trait)
  }, [voteOnTrait, fragranceId])

  // TODO: Skeleton
  if (loading) {
    return null
  }

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={['bottom']}
    >
      <ScrollView
        style={styles.editSlidesWrapper}
        showsVerticalScrollIndicator={false}
      >
        {data?.gender != null && (
          <TraitSliderProps
            label='gender'
            leftLabel='feminine'
            rightLabel='masculine'
            trait={data.gender}
            icon={<GenderIcon />}
            style={styles.editSliderWrapper}
            onTraitChanged={handleVoteChanged}
          />)}
        {data?.longevity != null && (
          <TraitSliderProps
            label='longevity'
            leftLabel='very short'
            rightLabel='very long'
            trait={data.longevity}
            icon={<LongevityIcon />}
            style={styles.editSliderWrapper}
            onTraitChanged={handleVoteChanged}
          />)}
        {data?.sillage != null && (
          <TraitSliderProps
            label='sillage'
            leftLabel='intimate'
            rightLabel='expansive'
            trait={data.sillage}
            icon={<SillageIcon />}
            style={styles.editSliderWrapper}
            onTraitChanged={handleVoteChanged}
          />)}
        {data?.complexity != null && (
          <TraitSliderProps
            label='complexity'
            leftLabel='simple'
            rightLabel='intricate'
            trait={data.complexity}
            icon={<ComplexityIcon />}
            style={styles.editSliderWrapper}
            onTraitChanged={handleVoteChanged}
          />)}
        {data?.balance != null && (
          <TraitSliderProps
            label='balance'
            leftLabel='unbalanced'
            rightLabel='harmonious'
            trait={data.balance}
            icon={<BalanceIcon />}
            style={styles.editSliderWrapper}
            onTraitChanged={handleVoteChanged}
          />)}
        {data?.allure != null && (
          <TraitSliderProps
            label='allure'
            leftLabel='unappealing'
            rightLabel='captivating'
            trait={data.allure}
            icon={<AllureIcon />}
            style={styles.editSliderWrapper}
            onTraitChanged={handleVoteChanged}
          />)}
        <FeedbackButton />
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditCharacteristicsPage

const styles = StyleSheet.create({
  editSlidesWrapper: {
    flex: 1,
    padding: 10
  },
  editSliderWrapper: {
    marginVertical: 10
  }
})
