import React from 'react'
import { StyleSheet } from 'react-native'
import NavBarIcons from '@/src/constants/Icons'
import { useRouter } from 'expo-router'
import BouncyButton from '../BouncyButton'

interface NavBarButtonProps {
  route: string
  isFocused: boolean
}

const NavBarButton = (props: NavBarButtonProps) => {
  const router = useRouter()
  const { route, isFocused } = props
  const Icon = NavBarIcons[route as keyof typeof NavBarIcons]

  const onPressed = () => {
    if (!isFocused) {
      router.navigate({ pathname: route })
    }
  }

  return (
    <BouncyButton
      onPress={onPressed}
      style={[{ opacity: isFocused ? 1.0 : 0.7 }, styles.wrapper]}
    >
      <Icon />
    </BouncyButton>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '20%',
    padding: 10
  }
})

export default NavBarButton
