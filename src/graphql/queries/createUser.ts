import { User } from '@/aromi-backend/src/graphql/types/userTypes'

const createUserMutation = `#graphql
  mutation createUser($username: String, $cognitoId: String!) {
    createUser(username: $username, cognitoId: $cognitoId) {
      id
      username
      cognitoId 
    }
  }
`

export interface CreateUserMutationArgs {
  cognitoId: string
  username?: string | undefined
}

export interface CreateUserMutationResult {
  user: User
}

export default createUserMutation
