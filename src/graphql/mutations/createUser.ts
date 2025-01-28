import { User } from '@/aromi-backend/src/graphql/types/userTypes'

const createUserMutation = `#graphql
  mutation createUser($cognitoId: String!, $email: String!) {
    createUser(cognitoId: $cognitoId, email: $email) {
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
}

export interface CreateUserMutationResult {
  createUser: User | null
}

export default createUserMutation
