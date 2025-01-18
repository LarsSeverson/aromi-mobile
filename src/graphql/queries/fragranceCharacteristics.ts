const fragranceCharacteristicsQuery = `#graphql
  query fragrance($id: Int!) {
    fragrance(id: $id) {
      gender
      longevity
      sillage
      complexity
      balance
      allure
    }
  }
`

export default fragranceCharacteristicsQuery
