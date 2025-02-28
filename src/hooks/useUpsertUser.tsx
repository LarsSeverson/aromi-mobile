import { gql } from '@apollo/client/core'
import { useMutation } from '@apollo/client'
import { User } from '../gql/graphql'

const UPSERT_USER_MUTATION = gql`
  mutation UpsertUser($email: String!, $cognitoId: String!) {
    upsertUser(email: $email, cognitoId: $cognitoId) {
      id
      email
      username
      cognitoId
    }
  }
`

export interface UpsertUserVars {
  email: string
  cognitoId: string
}

export interface UpsertUserData {
  upsertUser: User
}

const useUpsertUser = () => {
  const [execute, { data, loading, error }] = useMutation<UpsertUserData, UpsertUserVars>(UPSERT_USER_MUTATION)

  return {
    user: data?.upsertUser,
    error,
    loading,

    upsertUser: execute
  }
}

export default useUpsertUser
