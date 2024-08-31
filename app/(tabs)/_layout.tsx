import NavBar from "@/components/Navigation/NavBar"
import { Tabs } from "expo-router"
import { View, Text } from "react-native"

export default function TabLayout() {
  return (
    <Tabs tabBar={NavBar}>
      <Tabs.Screen name='home' options={{ headerShown: false, tabBarShowLabel: false }} />
      <Tabs.Screen name='search' options={{ headerShown: false, tabBarShowLabel: false }} />
      <Tabs.Screen name='community' options={{ headerShown: false, tabBarShowLabel: false }} />
      <Tabs.Screen name='profile' options={{ headerShown: false, tabBarShowLabel: false }} />
    </Tabs>
  )
}