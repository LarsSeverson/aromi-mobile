import { StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import EditFragranceSlider from '@/src/components/fragrance/EditFragranceSlider'
import { useLocalSearchParams } from 'expo-router'
import { AllureIcon, BalanceIcon, ComplexityIcon, LongevityIcon, SillageIcon } from '@/src/constants/Icons'
import FeedbackButton from '@/src/components/FeedbackButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FragranceTraitType } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { useAuthContext } from '@/src/contexts/AuthContext'

const EditCharacteristicsPage = () => {
  const { userInfo } = useAuthContext()

  const fragranceId = useRef(Number(useLocalSearchParams().fragranceId))

  // const {
  //   data: traits,
  //   loading: traitsLoading,
  //   error: traitsError,
  //   execute: getTraits,
  //   reset: refreshTraits
  // } = useResolver<FragranceTraitsQueryResult, FragranceTraitsQueryArgs>(
  //   {
  //     resolver: fragranceTraitsQuery,
  //     type: 'query',
  //     authMode: 'iam'
  //   }
  // )

  // const {
  //   data: votes,
  //   loading: votesLoading,
  //   error: votesError,
  //   execute: getVotes,
  //   reset: refreshvotes
  // } = useResolver<FragranceTraitVotesQueryResult, FragranceTraitVotesQueryArgs>(
  //   {
  //     resolver: fragranceTraitVotesQuery,
  //     type: 'query',
  //     authMode: 'userPool'
  //   }
  // )

  // const {
  //   error: voteError,
  //   execute: voteOnTrait
  // } = useResolver<VoteOnTraitMutationResult, VoteOnTraitMutationArgs>(
  //   {
  //     resolver: voteOnTraitMutation,
  //     type: 'mutation',
  //     authMode: 'userPool'
  //   }
  // )

  // const averageValues = useMemo<Map<FragranceTraitType, number>>(() => {
  //   if (!traits) return new Map()

  //   const traitMap = new Map(traits.fragranceTraits.map((trait) => [trait.trait, trait.value]))

  //   return traitMap
  // }, [traits])

  // const userVotes = useMemo<Map<FragranceTraitType, number>>(() => {
  //   if (!votes || !userInfo.user) return new Map()

  //   const votesMap = new Map(votes.fragranceTraitVotes.map((vote) => [vote.trait, vote.value]))

  //   return votesMap
  // }, [votes, userInfo.user])

  // const handleVoteChanged = useCallback((value: number, trait: FragranceTraitType) => {
  //   if (!userInfo.user) return

  //   voteOnTrait({ fragranceId: fragranceId.current, trait, value })
  // }, [userInfo.user, voteOnTrait])

  // useEffect(() => {
  //   !traits && getTraits({ id: fragranceId.current })

  //   if (userInfo.user) {
  //     !votes && getVotes({ fragranceId: fragranceId.current })
  //   }
  // }, [traits, votes, userInfo.user, getTraits, getVotes])

  // // TODO: Skeleton
  // if (!traits || traitsLoading) {
  //   return null
  // }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <ScrollView style={styles.editSlidesWrapper} showsVerticalScrollIndicator={false}>
        <EditFragranceSlider
          type={FragranceTraitType.LONGEVITY}
          label='longevity'
          leftLabel='very short'
          rightLabel='very long'
          // averageValue={averageValues.get(FragranceTraitType.LONGEVITY)}
          // userValue={userVotes.get(FragranceTraitType.LONGEVITY)}
          icon={<LongevityIcon />}
          style={styles.editSliderWrapper}
          // onTraitChanged={handleVoteChanged}
        />
        <EditFragranceSlider
          type={FragranceTraitType.SILLAGE}
          label='sillage'
          leftLabel='intimate'
          rightLabel='expansive'
          // averageValue={averageValues.get(FragranceTraitType.SILLAGE)}
          // userValue={userVotes.get(FragranceTraitType.SILLAGE)}
          icon={<SillageIcon />}
          style={styles.editSliderWrapper}
          // onTraitChanged={handleVoteChanged}
        />
        <EditFragranceSlider
          type={FragranceTraitType.COMPLEXITY}
          label='complexity'
          leftLabel='simple'
          rightLabel='intricate'
          // averageValue={averageValues.get(FragranceTraitType.COMPLEXITY)}
          // userValue={userVotes.get(FragranceTraitType.COMPLEXITY)}
          icon={<ComplexityIcon />}
          style={styles.editSliderWrapper}
          // onTraitChanged={handleVoteChanged}
        />
        <EditFragranceSlider
          type={FragranceTraitType.BALANCE}
          label='balance'
          leftLabel='unbalanced'
          rightLabel='harmonious'
          // averageValue={averageValues.get(FragranceTraitType.BALANCE)}
          // userValue={userVotes.get(FragranceTraitType.BALANCE)}
          icon={<BalanceIcon />}
          style={styles.editSliderWrapper}
          // onTraitChanged={handleVoteChanged}
        />
        <EditFragranceSlider
          type={FragranceTraitType.ALLURE}
          label='allure'
          leftLabel='unappealing'
          rightLabel='captivating'
          // averageValue={averageValues.get(FragranceTraitType.ALLURE)}
          // userValue={userVotes.get(FragranceTraitType.ALLURE)}
          icon={<AllureIcon />}
          style={styles.editSliderWrapper}
          // onTraitChanged={handleVoteChanged}
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
