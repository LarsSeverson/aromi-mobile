import HomeHeader from '@/src/components/Home/HomeHeader'
import NavBar from '@/src/components/Navigation/NavBar'
import { Tabs } from 'expo-router'
import React from 'react'
import { useColorScheme } from 'react-native'
import { Amplify } from 'aws-amplify'
import amplifyconfiguration from '../../amplifyconfiguration.json'

Amplify.configure(amplifyconfiguration)

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-2_b6DRVfvJw',
      userPoolClientId: '1aop96ct6tm1oh2dttv8v1j2et',
      identityPoolId: 'us-east-2:bbae1053-0888-4120-85f4-5692fe6246ee',
      allowGuestAccess: true
    }
  },
  API: {
    GraphQL: {
      endpoint: 'https://iq7jbu76srexjfq4noopwo7c74.appsync-api.us-east-2.amazonaws.com/graphql',
      region: 'us-east-2',
      defaultAuthMode: 'userPool'
    }
  },
  Storage: {
    S3: {
      region: 'us-east-2',
      bucket: 'aromi-storage'
    }
  }
})

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
