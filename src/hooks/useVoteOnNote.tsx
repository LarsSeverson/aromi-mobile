import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { graphql } from '../generated'
import { type FragranceNote, type VoteOnNoteMutationVariables } from '../generated/graphql'

const VOTE_ON_NOTE_MUTATION = graphql(/* GraphQL */ `
  mutation VoteOnNote($fragranceId: Int!, $noteId: Int!, $layer: NoteLayer!, $myVote: Boolean!) {
    voteOnNote(fragranceId: $fragranceId, noteId: $noteId, layer: $layer, myVote: $myVote) {
      id
      noteId
      layer
      votes
      myVote
    }
  }
`)

export type VoteOnNoteOld = Pick<FragranceNote, 'id' | 'noteId' | 'layer' | 'votes' | 'myVote'>

const useVoteOnNote = () => {
  const [voteOnNoteMutation, {
    loading,
    error
  }] = useMutation(VOTE_ON_NOTE_MUTATION)

  const voteOnNote = useCallback((variables: VoteOnNoteMutationVariables, note: VoteOnNoteOld) => {
    const curVotes = note.votes + (variables.myVote ? 1 : -1)

    void voteOnNoteMutation({
      variables,
      optimisticResponse: {
        voteOnNote: {
          ...note,
          votes: curVotes,
          myVote: variables.myVote
        }
      }
    })
  }, [voteOnNoteMutation])

  return {
    loading,
    error,
    voteOnNote
  }
}

export default useVoteOnNote
