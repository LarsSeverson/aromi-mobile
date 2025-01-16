import { FragranceNote, NoteLayer } from '@/aromi-backend/src/graphql/types/fragranceTypes'

export const selectedNotesState = new Map<string, FragranceNote>()

export const getNoteKey = (id: number, layer: NoteLayer): string => {
  const key = `${id}_${layer}`

  return key
}
