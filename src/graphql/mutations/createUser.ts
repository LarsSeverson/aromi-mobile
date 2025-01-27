import { User } from '@/aromi-backend/src/graphql/types/userTypes'

const createUserMutation = `#graphql
  mutation createUser($cognitoId: String!, $email: String!, $username: String) {
    createUser(cognitoId: $cognitoId, email: $email, username: $username) {
      id
      cognitoId 
      email
      username
    }
  }
`

export interface CreateUserMutationArgs {
  cognitoId: string
  email: string

  username?: string | undefined
}

export interface CreateUserMutationResult {
  user: User | null
}

export default createUserMutation
