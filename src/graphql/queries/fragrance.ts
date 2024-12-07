const fragranceQuery = `#graphql
  query fragrances($id: Int!) {
    fragrance(id: $id) {
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
        accordID,
        name,
        concentration
      }

      notes {
        noteID,
        name,
        type,
        concentration
      }

      images {
        s3Key
      }
    }
  }
`

export default fragranceQuery
