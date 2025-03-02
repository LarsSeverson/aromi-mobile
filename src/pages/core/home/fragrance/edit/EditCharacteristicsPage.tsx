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
  const fragranceId = Number(useLocalSearchParams().fragranceId)

  const {
    traits,
    loading
  } = useFragranceTraits({ id: fragranceId })

  const { voteOnTrait } = useVoteOnTrait()

  const handleVoteChanged = useCallback((value: number, trait: CardFragranceTrait) => {
    voteOnTrait({
      fragranceId,
      trait: trait.trait,
      myVote: value
    }, trait)
  }, [voteOnTrait, fragranceId])

  // TODO: Skeleton
  if (loading || traits == null) {
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
        <TraitSliderProps
          label='gender'
          leftLabel='feminine'
          rightLabel='masculine'
          trait={traits.gender}
          icon={<GenderIcon />}
          style={styles.editSliderWrapper}
          onTraitChanged={handleVoteChanged}
        />
        <TraitSliderProps
          label='longevity'
          leftLabel='very short'
          rightLabel='very long'
          trait={traits.longevity}
          icon={<LongevityIcon />}
          style={styles.editSliderWrapper}
          onTraitChanged={handleVoteChanged}
        />
        <TraitSliderProps
          label='sillage'
          leftLabel='intimate'
          rightLabel='expansive'
          trait={traits.sillage}
          icon={<SillageIcon />}
          style={styles.editSliderWrapper}
          onTraitChanged={handleVoteChanged}
        />
        <TraitSliderProps
          label='complexity'
          leftLabel='simple'
          rightLabel='intricate'
          trait={traits.complexity}
          icon={<ComplexityIcon />}
          style={styles.editSliderWrapper}
          onTraitChanged={handleVoteChanged}
        />
        <TraitSliderProps
          label='balance'
          leftLabel='unbalanced'
          rightLabel='harmonious'
          trait={traits.balance}
          icon={<BalanceIcon />}
          style={styles.editSliderWrapper}
          onTraitChanged={handleVoteChanged}
        />
        <TraitSliderProps
          label='allure'
          leftLabel='unappealing'
          rightLabel='captivating'
          trait={traits.allure}
          icon={<AllureIcon />}
          style={styles.editSliderWrapper}
          onTraitChanged={handleVoteChanged}
        />
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
