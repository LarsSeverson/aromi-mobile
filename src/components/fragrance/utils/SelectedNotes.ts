import { FragranceNotes } from '@/aromi-backend/src/graphql/types/fragranceTypes'

interface SelectedNotesState {
  value: FragranceNotes | null
}

export const selectedNotesState: SelectedNotesState = { value: null }
