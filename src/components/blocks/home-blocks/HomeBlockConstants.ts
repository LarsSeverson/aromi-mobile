import { StyleSheet } from 'react-native'

export enum HomeBlockTypes {
  VerticalCards = 0,
  HorizontalCards,

  HorizontalBars
}

export enum HomeBlockExpansions {
  Fragrance = 0,
  // Search...?
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    gap: 10
  },
  fragranceListWrapper: { gap: 10 }
})

export { styles }
