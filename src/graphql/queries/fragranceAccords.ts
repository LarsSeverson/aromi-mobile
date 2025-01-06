const fragranceAccordsListQuery = `#graphql
  query fragranceAccords($id: Int!, $limit: Int, $offset: Int) {
    fragranceAccords(id: $id, limit: $limit, offset: $offset) {
      accordId,
      name,
      color,
      votes
    }
  }
`

export default fragranceAccordsListQuery
