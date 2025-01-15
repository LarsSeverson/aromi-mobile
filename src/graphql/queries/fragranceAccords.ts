const fragranceAccords = `#graphql
  query fragranceAccords($id: Int!, $name: String, $limit: Int, $offset: Int) {
    fragranceAccords(id: $id, name: $name, limit: $limit, offset: $offset) {
      id
      accordId
      name
      color
      votes
    }
  }
`

export default fragranceAccords
