import React from 'react'
import { StyleSheet } from 'react-native'
import Icons from '@/src/constants/Icons'
import { Href, useRouter } from 'expo-router'
import BouncyButton from '../utils/BouncyButton'

interface NavBarButtonProps {
  route: string
  isFocused: boolean
}

const NavBarButton: React.FC<NavBarButtonProps> = (props: NavBarButtonProps) => {
  const { route, isFocused } = props
  const router = useRouter()
  const Icon = Icons[route as keyof typeof Icons]

  const onPressed = () => {
    if (!isFocused) {
      router.navigate(route as Href)
    }
  }

  return (
    <BouncyButton onPress={onPressed} style={[{ opacity: isFocused ? 1.0 : 0.7 }, styles.wrapper]}>
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
