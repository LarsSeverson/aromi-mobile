import HomeHeader from '@/src/components/Home/HomeHeader'
import NavBar from '@/src/components/Navigation/NavBar'
import { Tabs } from 'expo-router'
import React from 'react'
import { useColorScheme } from 'react-native'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { Amplify } from 'aws-amplify'
import config from '../amplifyconfiguration.json'

Amplify.configure({
  Auth: {
    region: 'us-east-2',
    userPoolId: 'us-east-2_b6DRVfvJw',
    identityPoolId: 'us-east-2:bbae1053-0888-4120-85f4-5692fe6246ee',
    userPoolWebClientId: '1aop96ct6tm1oh2dttv8v1j2et',
    mandatorySignIn: false
  },
  Storage: {
    AWSS3: {
      bucket: 'aromi-storage',
      region: 'us-east-2'
    }
  }
})

Amplify.configure(config)

SystemNavigationBar.setNavigationColor('translucent')

const TabLayout: React.FC = () => {
  // TODO:
  const colorScheme = useColorScheme()

  return (
    <Tabs
      tabBar={(props) => <NavBar {...props} />}
      screenOptions={{ tabBarShowLabel: false }}
    >
      <Tabs.Screen name='index' options={{ header: HomeHeader }} />
      <Tabs.Screen name='search' />
      <Tabs.Screen name='community' />
      <Tabs.Screen name='profile' />
    </Tabs>
  )
}

export default TabLayout
