import { StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import EditFragranceSlider from '@/src/components/home/fragrance/EditFragranceSlider'
import { useLocalSearchParams } from 'expo-router'
import { AllureIcon, BalanceIcon, ComplexityIcon, GenderIcon, LongevityIcon, SillageIcon } from '@/src/constants/Icons'
import FeedbackButton from '@/src/components/FeedbackButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FragranceTraitType } from '@/aromi-backend/src/graphql/types/fragranceTypes'
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

  const handleVoteChanged = useCallback((value: number, trait: FragranceTraitType) => {
    voteOnTrait({ variables: { fragranceId, trait, myVote: value } })
  }, [voteOnTrait, fragranceId])

  // TODO: Skeleton
  if (!fragranceTraits || loading.traitsLoading) {
    return null
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <ScrollView style={styles.editSlidesWrapper} showsVerticalScrollIndicator={false}>
        <EditFragranceSlider
          type={FragranceTraitType.GENDER}
          label='gender'
          leftLabel='feminine'
          rightLabel='masculine'
          averageValue={fragranceTraits.gender.value}
          userValue={fragranceTraits.gender.myVote}
          icon={<GenderIcon />}
          style={styles.editSliderWrapper}
          onTraitChanged={handleVoteChanged}
        />
        <EditFragranceSlider
          type={FragranceTraitType.LONGEVITY}
          label='longevity'
          leftLabel='very short'
          rightLabel='very long'
          averageValue={fragranceTraits.longevity.value}
          userValue={fragranceTraits.longevity.myVote}
          icon={<LongevityIcon />}
          style={styles.editSliderWrapper}
          onTraitChanged={handleVoteChanged}
        />
        <EditFragranceSlider
          type={FragranceTraitType.SILLAGE}
          label='sillage'
          leftLabel='intimate'
          rightLabel='expansive'
          averageValue={fragranceTraits.sillage.value}
          userValue={fragranceTraits.longevity.myVote}
          icon={<SillageIcon />}
          style={styles.editSliderWrapper}
          onTraitChanged={handleVoteChanged}
        />
        <EditFragranceSlider
          type={FragranceTraitType.COMPLEXITY}
          label='complexity'
          leftLabel='simple'
          rightLabel='intricate'
          averageValue={fragranceTraits.complexity.value}
          userValue={fragranceTraits.complexity.myVote}
          icon={<ComplexityIcon />}
          style={styles.editSliderWrapper}
          onTraitChanged={handleVoteChanged}
        />
        <EditFragranceSlider
          type={FragranceTraitType.BALANCE}
          label='balance'
          leftLabel='unbalanced'
          rightLabel='harmonious'
          averageValue={fragranceTraits.balance.value}
          userValue={fragranceTraits.balance.myVote}
          icon={<BalanceIcon />}
          style={styles.editSliderWrapper}
          onTraitChanged={handleVoteChanged}
        />
        <EditFragranceSlider
          type={FragranceTraitType.ALLURE}
          label='allure'
          leftLabel='unappealing'
          rightLabel='captivating'
          averageValue={fragranceTraits.allure.value}
          userValue={fragranceTraits.allure.myVote}
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
