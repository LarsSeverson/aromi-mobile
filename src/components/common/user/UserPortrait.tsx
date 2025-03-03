import { StyleSheet, Text as RegularText, View } from 'react-native'
import React from 'react'
import { Divider, Text } from 'react-native-paper'
import { Image } from 'expo-image'
import { useAppTheme } from '@/src/constants/Themes'
import { appImages } from '@/src/common/app-images'

export interface UserPortraitProps {
  username: string
  followers: number
  following: number
  avatar?: string | undefined
  isOwner?: boolean | undefined
}

const UserPortrait = (props: UserPortraitProps) => {
  const theme = useAppTheme()
  const { username, followers, following } = props

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={appImages.pfpPlaceholder}
          style={[styles.imageWrapper, { backgroundColor: theme.colors.surfaceDisabled }]}
        />
        <View>
          <Text variant='headlineMedium'>{username}</Text>
          <View style={styles.followWrapper}>
            <Text style={styles.followNumber}>
              {followers} <Text style={styles.followText}>followers</Text>
            </Text>
            <RegularText style={[styles.dot, { color: theme.colors.text }]}>●</RegularText>
            <Text style={styles.followNumber}>
              {following} <Text style={styles.followText}>following</Text>
            </Text>
          </View>
        </View>
      </View>
      <Divider style={{ opacity: 0.3 }} />
    </View>
  )
}

export default UserPortrait

const styles = StyleSheet.create({
  container: {
    gap: 20
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  imageWrapper: {
    height: 90,
    aspectRatio: 1,
    borderRadius: 50
  },
  followWrapper: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginTop: -5
  },
  followNumber: {
    fontWeight: 'bold'
  },
  followText: {
    opacity: 0.8
  },
  dot: {
    fontSize: 6,
    marginBottom: -3
  }
})
