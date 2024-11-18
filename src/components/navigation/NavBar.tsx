import { SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import NavBarButton from './NavBarButton'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useAppTheme } from '@/src/constants/Themes'

const NavBar: React.FC<BottomTabBarProps> = (props: BottomTabBarProps) => {
  const { state } = props
  const theme = useAppTheme()

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: theme.colors.background }]}>
      {
        state.routes.map((route, index) => {
          const isFocused = state.index === index

          if (['_sitemap', '+not-found'].includes(route.name)) {
            return null
          }

          return (
            <NavBarButton
              key={route.key}
              route={route.name}
              isFocused={isFocused}
            />
          )
        })
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5
  }
})

export default NavBar
