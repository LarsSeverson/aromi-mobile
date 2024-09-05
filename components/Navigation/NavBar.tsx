import { ColorSchemeName, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ParamListBase, TabNavigationState, Descriptor, NavigationProp } from '@react-navigation/native'
import NavBarButton from './NavBarButton'
import { Colors } from '@/constants/Colors'

interface NavBarProps {
  state: TabNavigationState<ParamListBase>
  descriptors: any
  navigation: any
  colorScheme?: ColorSchemeName // TODO:
}

const NavBar: React.FC<NavBarProps> = ({ state, navigation, colorScheme }) => {
  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: colorScheme === 'dark' ? Colors.black : Colors.white }]}>
      {
        state.routes.map((route, index) => {
          const isFocused = state.index === index

          if (['_sitemap', '+not-found'].includes(route.name)) {
            return null
          }

          const onPressed = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params)
            }
          }

          return (
            <NavBarButton
              key={route.key}
              routeName={route.name}
              onPressed={onPressed}
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
