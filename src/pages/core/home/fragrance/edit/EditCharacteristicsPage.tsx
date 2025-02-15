import { StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import EditFragranceSlider from '@/src/components/home/fragrance-page/EditFragranceSlider'
import { useLocalSearchParams } from 'expo-router'
import { AllureIcon, BalanceIcon, ComplexityIcon, GenderIcon, LongevityIcon, SillageIcon } from '@/src/constants/Icons'
import FeedbackButton from '@/src/components/FeedbackButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FragranceTrait } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import useFragranceTraits from '@/src/hooks/useFragranceTraits'

const EditCharacteristicsPage = () => {
  const fragranceId = Number(useLocalSearchParams().fragranceId)

  const {
    fragranceTraits,
    loading,
    error,
    refresh,
    voteOnTrait
  } = useFragranceTraits({ id: fragranceId })

  const handleVoteChanged = useCallback((value: number, trait: FragranceTrait) => {
    voteOnTrait({ fragranceId, trait: trait.trait, myVote: value }, trait)
  }, [voteOnTrait, fragranceId])

  // TODO: Skeleton
  if (!fragranceTraits || loading.traitsLoading) {
    return null
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <ScrollView style={styles.editSlidesWrapper} showsVerticalScrollIndicator={false}>
        <EditFragranceSlider
          label='gender'
          leftLabel='feminine'
          rightLabel='masculine'
          trait={fragranceTraits.gender}
          icon={<GenderIcon />}
          style={styles.editSliderWrapper}
          onTraitChanged={handleVoteChanged}
        />
        <EditFragranceSlider
          label='longevity'
          leftLabel='very short'
          rightLabel='very long'
          trait={fragranceTraits.longevity}
          icon={<LongevityIcon />}
          style={styles.editSliderWrapper}
          onTraitChanged={handleVoteChanged}
        />
        <EditFragranceSlider
          label='sillage'
          leftLabel='intimate'
          rightLabel='expansive'
          trait={fragranceTraits.sillage}
          icon={<SillageIcon />}
          style={styles.editSliderWrapper}
          onTraitChanged={handleVoteChanged}
        />
        <EditFragranceSlider
          label='complexity'
          leftLabel='simple'
          rightLabel='intricate'
          trait={fragranceTraits.complexity}
          icon={<ComplexityIcon />}
          style={styles.editSliderWrapper}
          onTraitChanged={handleVoteChanged}
        />
        <EditFragranceSlider
          label='balance'
          leftLabel='unbalanced'
          rightLabel='harmonious'
          trait={fragranceTraits.balance}
          icon={<BalanceIcon />}
          style={styles.editSliderWrapper}
          onTraitChanged={handleVoteChanged}
        />
        <EditFragranceSlider
          label='allure'
          leftLabel='unappealing'
          rightLabel='captivating'
          trait={fragranceTraits.allure}
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
