import { AuthError, autoSignIn, confirmResetPassword, confirmSignUp, getCurrentUser, resendSignUpCode, resetPassword, signIn, signInWithRedirect, signOut, signUp } from 'aws-amplify/auth'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { AromiAuthError, AuthErrorCode, toConfirmSignUpError, toResendSignUpError, toLogInError, toSignUpError, toGetUserInfoError, toConfirmResetPasswordError, toResetPasswordError, toSocialSignInError } from './utils/AuthErrors'
import useResolver from './useResolver'
import createUserMutation, { CreateUserMutationArgs, CreateUserMutationResult } from '../graphql/mutations/createUser'
import { User } from '@/aromi-backend/src/graphql/types/userTypes'

export enum AuthState {
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  AUTHENTICATED = 'AUTHENTICATED'
}

export interface AuthOutput<T = null> {
  success: boolean

  error: AromiAuthError | null

  data?: T | undefined
}

export interface AuthUserInfo {
  user?: User | null

  state: AuthState
}

const useAromiAuth = () => {
  const [userInfo, setUserInfo] = useState<AuthUserInfo>({ user: null, state: AuthState.UNAUTHENTICATED })
  const [initialized, setInitialized] = useState(false)

  const {
    execute: createUser,
    error: createUserError
  } = useResolver<CreateUserMutationResult, CreateUserMutationArgs>(
    {
      resolver: createUserMutation,
      type: 'mutation',
      authMode: 'userPool'
    }
  )

  const userGetInfo = useCallback(async (): Promise<AuthOutput<AuthUserInfo>> => {
    const err = new AromiAuthError('Something went wrong getting this user', AuthErrorCode.USER_NOT_FOUND)

    try {
      const { userId, signInDetails } = await getCurrentUser()

      const email = signInDetails?.loginId
      if (!email) return { success: false, error: err }

      const user = await createUser({ cognitoId: userId, email })

      const userData = user?.createUser || null
      if (!userData) return { success: false, error: err }

      const newUserInfo = { user: userData, state: AuthState.AUTHENTICATED }

      setUserInfo(newUserInfo)

      return { success: true, error: null, data: newUserInfo }
    } catch (error: AuthError | any) {
      const authError = toGetUserInfoError(error)

      return { success: false, error: authError }
    }
  }, [createUser])

  const socialSignIn = useCallback(async (provider: 'Google' | 'Apple'): Promise<AuthOutput> => {
    try {
      await signInWithRedirect({ provider })

      const { success, error } = await userGetInfo()

      return { success, error }
    } catch (error: AuthError | any) {
      const authError = toSocialSignInError(error)

      return { success: false, error: authError }
    }
  }, [userGetInfo])

  const userSignUp = useCallback(async (email: string, password: string): Promise<AuthOutput> => {
    try {
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email
          },
          autoSignIn: true
        }
      })

      userGetInfo()

      return { success: true, error: null }
    } catch (error: AuthError | any) {
      const authError = toSignUpError(error)

      return { success: false, error: authError }
    }
  }, [userGetInfo])

  const userConfirmSignUp = useCallback(async (email: string, confirmationCode: string): Promise<AuthOutput> => {
    try {
      await confirmSignUp({
        username: email,
        confirmationCode
      })

      return { success: true, error: null }
    } catch (error: AuthError | any) {
      const authError = toConfirmSignUpError(error)

      return { success: false, error: authError }
    }
  }, [])

  const userResendConfirmCode = useCallback(async (email: string): Promise<AuthOutput> => {
    try {
      await resendSignUpCode({
        username: email
      })

      return { success: true, error: null }
    } catch (error: AuthError | any) {
      const authError = toResendSignUpError(error)

      return { success: false, error: authError }
    }
  }, [])

  const userLogIn = useCallback(async (email: string, password: string): Promise<AuthOutput> => {
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password
      })

      await userGetInfo()

      if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
        const authError = new AromiAuthError("You haven't finished signing up yet.", AuthErrorCode.SIGN_UP_INCOMPLETE)
        return { success: false, error: authError }
      }

      return { success: isSignedIn, error: null }
    } catch (error: AuthError | any) {
      const authError = toLogInError(error)

      return { success: false, error: authError }
    }
  }, [userGetInfo])

  const userSignOut = useCallback(async (): Promise<AuthOutput> => {
    try {
      await signOut()

      setUserInfo({ user: null, state: AuthState.UNAUTHENTICATED })

      return { success: true, error: null }
    } catch (error) {
      const authError = new AromiAuthError('Something went wrong signing you out. Please try again.', AuthErrorCode.UNKNOWN_ERROR)

      return { success: false, error: authError }
    }
  }, [])

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    const valid = emailRegex.test(email.toLowerCase())

    return valid
  }, [])

  const validatePassword = useCallback((password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
    const valid = passwordRegex.test(password)

    return valid
  }, [])

  const validateConfirmPassword = useCallback((password1: string, password2: string): boolean => {
    return password1 === password2
  }, [])

  const sendResetPasswordCode = useCallback(async (email: string) => {
    try {
      await resetPassword({ username: email })

      return { success: true, error: null }
    } catch (error: AuthError | any) {
      const authError = toResetPasswordError(error)

      return { success: false, error: authError }
    }
  }, [])

  const userResetPassword = useCallback(async (email: string, password: string, code: string): Promise<AuthOutput> => {
    try {
      await confirmResetPassword({
        username: email,
        newPassword: password,
        confirmationCode: code
      })

      return { success: true, error: null }
    } catch (error: AuthError | any) {
      const authError = toConfirmResetPasswordError(error)

      return { success: false, error: authError }
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      await userGetInfo()
      setInitialized(true)
    }

    !initialized && init()
  }, [initialized, userGetInfo])

  return {
    userInfo,
    initialized,

    userGetInfo,
    socialSignIn,
    userSignUp,
    userConfirmSignUp,
    userResendConfirmCode,
    userLogIn,
    userSignOut,
    sendResetPasswordCode,
    userResetPassword,

    validateEmail,
    validatePassword,
    validateConfirmPassword
  }
}

export default useAromiAuth
