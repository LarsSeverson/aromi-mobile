import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ParamListBase, TabNavigationState, Descriptor, NavigationProp } from '@react-navigation/native'
import NavBarButton from './NavBarButton'
import { SafeAreaView } from 'react-native-safe-area-context'

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
    alignItems: 'center',

    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5
  }
})

export default NavBar
