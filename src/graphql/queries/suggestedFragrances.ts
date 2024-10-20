const suggestedFragrancesQuery = `#graphql
  query fragrances($limit: Int, $offset: Int) {
    fragrances(limit: $limit, offset: $offset) {
      id
      brand
      name
      likes
      dislikes
      images {
        s3Key
      }
    }
  }
`

export default suggestedFragrancesQuery
