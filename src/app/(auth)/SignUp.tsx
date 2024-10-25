import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/src/constants/Colors'
import { Divider, TextInput } from 'react-native-paper'
import ButtonText from '@/src/components/Utils/ButtonText'
import { ThemedText } from '@/src/components/Utils/Text'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: Colors.white }} contentContainerStyle={styles.wrapper}>
      <ThemedText style={styles.title}>Let's get your account set up</ThemedText>
      <View>
        <TextInput
          label='Email'
          value={email}
          onChangeText={email => setEmail(email)}
          mode='outlined'
          inputMode='email'
          outlineColor={Colors.placeholder3}
          activeOutlineColor={Colors.button}
          selectionColor={Colors.placeholder3}
          contentStyle={styles.contentWrapper}
          outlineStyle={styles.outline}
          style={styles.inputWrapper}
          theme={{
            colors: { onSurfaceVariant: Colors.placeholder3 }
          }}
        />
        <TextInput
          label='Password'
          value={password}
          onChangeText={password => setPassword(password)}
          mode='outlined'
          secureTextEntry
          outlineColor={Colors.placeholder3}
          activeOutlineColor={Colors.button}
          selectionColor={Colors.placeholder3}
          contentStyle={styles.contentWrapper}
          outlineStyle={styles.outline}
          style={styles.inputWrapper}
          theme={{
            colors: { onSurfaceVariant: Colors.placeholder3 }
          }}
        />
        <TextInput
          label='Repeat password'
          value={confirmPassword}
          onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
          mode='outlined'
          secureTextEntry
          outlineColor={Colors.placeholder3}
          activeOutlineColor={Colors.button}
          selectionColor={Colors.placeholder3}
          contentStyle={styles.contentWrapper}
          outlineStyle={styles.outline}
          style={styles.inputWrapper}
          theme={{
            colors: { onSurfaceVariant: Colors.placeholder3 }
          }}
        />
      </View>
      <ButtonText text='Continue' color={Colors.sinopia} textColor={Colors.white} />
      <ButtonText text='Already have an account?' color={Colors.placeholder2} />
      <View style={styles.orWrapper}>
        <Divider style={{ flex: 1 }} />
        <ThemedText>or</ThemedText>
        <Divider style={{ flex: 1 }} />
      </View>
      <ButtonText text='Continue with Google' outlined />
      <ButtonText text='Continue with Apple' outlined />
    </KeyboardAwareScrollView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
    gap: 15
  },
  title: {
    fontSize: 18
  },
  inputWrapper: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    fontFamily: 'PalanquinDark-Regular'
  },
  contentWrapper: {
    fontFamily: 'Palanquin-Bold',
    fontSize: 14
  },
  outline: {
    borderRadius: 15
  },
  orWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15
  }
})
