import { User } from '@/aromi-backend/src/graphql/types/userTypes'

const userQuery = `#graphql
  query UserQuery($id: Int!) {
    user(id: $id) {
      id
      username
      cognitoId
    }
  }
`

export interface UserQueryResult {
  user: User
}

export default userQuery
