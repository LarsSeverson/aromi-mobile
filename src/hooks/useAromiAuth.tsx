import { AuthError, autoSignIn, confirmResetPassword, confirmSignUp, getCurrentUser, resendSignUpCode, resetPassword, signIn, signInWithRedirect, signOut, signUp } from 'aws-amplify/auth'
import { useCallback, useMemo, useState } from 'react'
import { AromiAuthError, AuthErrorCode, toConfirmSignUpError, toResendSignUpError, toLogInError, toSignUpError, toGetUserInfoError, toConfirmResetPasswordError, toResetPasswordError, toSocialSignInError } from './utils/AuthErrors'
import useMutation from './useMutation'
import createUserMutation, { CreateUserMutationArgs, CreateUserMutationResult } from '../graphql/queries/createUser'
import useQuery from './useQuery'
import userQuery, { UserQueryResult } from '../graphql/queries/user'

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
  id: string | null
  email: string | null

  state: AuthState
}

const useAromiAuth = () => {
  const [userInfo, setUserInfo] = useState<AuthUserInfo>({ id: null, email: null, state: AuthState.UNAUTHENTICATED })

  const {
    data: mutData,
    loading: mutLoading,
    error,
    execute
  } = useMutation<CreateUserMutationResult, CreateUserMutationArgs>({ mutation: createUserMutation, authMode: 'iam' })
  const {
    data: queData,
    loading: queLoading,
    getData
  } = useQuery<UserQueryResult>({ query: userQuery, authMode: 'iam' })

  const userGetInfo = useCallback(async (): Promise<AuthOutput<AuthUserInfo>> => {
    try {
      const { username, userId } = await getCurrentUser()

      const userInfo = { email: username, id: userId, state: AuthState.AUTHENTICATED }

      await execute({ cognitoId: userId })

      setUserInfo(userInfo)

      return { success: true, error: null, data: userInfo }
    } catch (error: AuthError | any) {
      const authError = toGetUserInfoError(error)

      return { success: false, error: authError }
    }
  }, [execute])

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
      const { userId } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email
          },
          autoSignIn: true
        }
      })

      setUserInfo({ id: userId || '', email, state: AuthState.UNAUTHENTICATED })

      return { success: true, error: null }
    } catch (error: AuthError | any) {
      const authError = toSignUpError(error)

      return { success: false, error: authError }
    }
  }, [])

  const userConfirmSignUp = useCallback(async (confirmationCode: string): Promise<AuthOutput> => {
    if (!userInfo.email) {
      const authError = new AromiAuthError('You are not authorized to perform this action.', AuthErrorCode.SERVICE_EXCEPTION)

      return { success: false, error: authError }
    }

    try {
      const { userId } = await confirmSignUp({
        username: userInfo.email,
        confirmationCode
      })

      return { success: true, error: null }
    } catch (error: AuthError | any) {
      const authError = toConfirmSignUpError(error)

      return { success: false, error: authError }
    }
  }, [userInfo.email])

  const userResendConfirmCode = useCallback(async (): Promise<AuthOutput> => {
    if (!userInfo.email) {
      const authError = new AromiAuthError('You are not authorized to perform this action.', AuthErrorCode.SERVICE_EXCEPTION)

      return { success: false, error: authError }
    }

    try {
      await resendSignUpCode({
        username: userInfo.email
      })

      return { success: true, error: null }
    } catch (error: AuthError | any) {
      const authError = toResendSignUpError(error)

      return { success: false, error: authError }
    }
  }, [userInfo.email])

  const userAutoLogIn = useCallback(async (): Promise<AuthOutput> => {
    try {
      const { isSignedIn, nextStep } = await autoSignIn()

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

  const userLogIn = useCallback(async (email: string, password: string): Promise<AuthOutput> => {
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password
      })

      setUserInfo(prev => ({ ...prev, email, state: isSignedIn ? AuthState.AUTHENTICATED : AuthState.UNAUTHENTICATED }))

      if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
        const authError = new AromiAuthError("You haven't finished signing up yet.", AuthErrorCode.SIGN_UP_INCOMPLETE)
        return { success: false, error: authError }
      }

      return { success: isSignedIn, error: null }
    } catch (error: AuthError | any) {
      const authError = toLogInError(error)

      return { success: false, error: authError }
    }
  }, [])

  const userSignOut = useCallback(async (): Promise<AuthOutput> => {
    try {
      await signOut()
      const { success, error } = await userGetInfo()

      setUserInfo({ id: null, email: null, state: AuthState.UNAUTHENTICATED })

      return { success: !success, error }
    } catch (error) {
      const authError = new AromiAuthError('Something went wrong signing you out. Please try again.', AuthErrorCode.UNKNOWN_ERROR)

      return { success: false, error: authError }
    }
  }, [userGetInfo])

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

  const state = useMemo(() => ({ userInfo }), [userInfo])

  const actions = useMemo(() => (
    { userGetInfo, socialSignIn, userSignUp, userConfirmSignUp, userResendConfirmCode, userAutoLogIn, userLogIn, userSignOut, sendResetPasswordCode, userResetPassword }
  ), [userGetInfo, socialSignIn, userSignUp, userConfirmSignUp, userResendConfirmCode, userAutoLogIn, userLogIn, userSignOut, sendResetPasswordCode, userResetPassword])

  const validators = useMemo(() => (
    { validateEmail, validatePassword, validateConfirmPassword }
  ), [validateEmail, validatePassword, validateConfirmPassword])

  const aromiAuthValue = useMemo(() => ({ ...state, ...actions, ...validators }), [state, actions, validators])

  return aromiAuthValue
}

export default useAromiAuth
