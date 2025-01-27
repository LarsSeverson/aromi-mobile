import { User } from '@/aromi-backend/src/graphql/types/userTypes'

const userQuery = `#graphql
  query UserQuery($id: Int, $cognitoId: String) {
    user(id: $id) {
      id
      username
      cognitoId
    }
  }
`

export interface UserQueryArgs {
  id?: number | undefined

  cognitoId?: string | undefined
}

export interface UserQueryResult {
  user: User
}

export default userQuery
