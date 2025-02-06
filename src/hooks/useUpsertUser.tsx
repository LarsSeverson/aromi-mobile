import { gql } from '@apollo/client/core'
import { useMutation } from '@apollo/client'
import { User } from '@/aromi-backend/src/graphql/types/userTypes'

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

const useUpsertUser = (vars: UpsertUserVars = { email: '', cognitoId: '' }) => {
  const {
    email,
    cognitoId
  } = vars

  const [execute, {
    data,
    loading,
    error
  }] = useMutation<UpsertUserData, UpsertUserVars>(UPSERT_USER_MUTATION,
    {
      variables: { email, cognitoId }
    })

  return {
    user: data?.upsertUser,
    error,
    loading,

    upsertUser: execute
  }
}

export default useUpsertUser
