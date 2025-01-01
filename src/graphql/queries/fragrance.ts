const fragranceQuery = `#graphql
  query fragrances($id: Int!) {
    fragrance(id: $id) {
      id
      brand
      name
      rating
      reviewCount
      likes
      dislikes
      gender
      longevity
      sillage
      complexity
      balance
      allure

      accords {
        accordId,
        name,
        color,
        votes
      }

      notes {
        noteId,
        name,
        type,
        votes
      }

      images {
        s3Key
      }
    }
  }
`

export default fragranceQuery
