const fragranceNotes = `#graphql
  query fragranceNotes($id: Int!, $layer: NoteLayer!, $name: String, $limit: Int, $offset: Int, $fill: Boolean) {
    fragranceNotes(id: $id, layer: $layer, name: $name, limit: $limit, offset: $offset, fill: $fill) {
      id
      noteId
      name
      votes
    }
  }
`

export default fragranceNotes
