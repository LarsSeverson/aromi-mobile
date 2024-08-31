import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ParamListBase, TabNavigationState, Descriptor, NavigationProp } from '@react-navigation/native'
import NavBarButton from './NavBarButton'

interface NavBarProps {
  state: TabNavigationState<ParamListBase>
  descriptors: any
  navigation: any
}

const NavBar: React.FC<NavBarProps> = ({ state, navigation }) => {
  return (
    <View style={styles.wrapper}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default NavBar
