import { StyleSheet, View } from 'react-native'
import React, { useEffect, useMemo, useRef } from 'react'
import { GenderIcon } from '@/src/constants/Icons'
import EditFragranceSlider from '@/src/components/fragrance/EditFragranceSlider'
import { useLocalSearchParams, useRouter } from 'expo-router'
import useResolver from '@/src/hooks/useResolver'
import { fragranceTraitVotesQuery, FragranceTraitVotesQueryArgs, FragranceTraitVotesQueryResult } from '@/src/graphql/queries/fraganceTraitVotes'
import { voteOnTraitMutation, VoteOnTraitMutationArgs, VoteOnTraitMutationResult } from '@/src/graphql/mutations/voteOnTrait'
import { FragranceTraitType } from '@/aromi-backend/src/graphql/types/fragranceTypes'
import { useAromiAuthContext } from '@/src/hooks/useAromiAuthContext'

const EditGenderPage = () => {
  const router = useRouter()
  const { userInfo } = useAromiAuthContext()

  const fragranceId = useRef(Number(useLocalSearchParams().fragranceId as string))
  const genderData = useRef(Number(useLocalSearchParams().genderData as string))

  const {
    data: votes,
    loading: votesLoading,
    error: votesError,
    execute: getVotes,
    reset: refreshvotes
  } = useResolver<FragranceTraitVotesQueryResult, FragranceTraitVotesQueryArgs>(
    {
      resolver: fragranceTraitVotesQuery,
      type: 'query',
      authMode: 'userPool'
    }
  )

  const {
    error: voteError,
    execute: voteOnTrait
  } = useResolver<VoteOnTraitMutationResult, VoteOnTraitMutationArgs>(
    {
      resolver: voteOnTraitMutation,
      type: 'mutation',
      authMode: 'userPool'
    }
  )

  const userVote = useMemo<number>(() => {
    if (!votes || !userInfo.user) return 50

    return votes.fragranceTraitVotes.find(vote => vote.trait === FragranceTraitType.GENDER)?.value || 50
  }, [userInfo.user, votes])

  const handleVoteChanged = (value: number, trait: FragranceTraitType) => {
    if (!userInfo.user) return

    voteOnTrait({ fragranceId: fragranceId.current, trait, value })
  }

  useEffect(() => {
    if (!userInfo.user) return

    !votes && getVotes({ fragranceId: fragranceId.current })
  }, [userInfo.user, votes, getVotes])

  return (
    <View>
      <EditFragranceSlider
        type={FragranceTraitType.GENDER}
        averageValue={genderData.current}
        userValue={userVote}
        icon={<GenderIcon />}
        leftLabel='feminine'
        rightLabel='masculine'
        style={{ padding: 10 }}
        onTraitChanged={handleVoteChanged}
      />
    </View>
  )
}

export default EditGenderPage
