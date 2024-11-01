import { AuthError, autoSignIn, confirmSignUp, getCurrentUser, resendSignUpCode, signIn, signUp } from 'aws-amplify/auth'
import { useCallback, useMemo, useState } from 'react'
import { AromiAuthError, AuthErrorCode, toConfirmSignUpError, toResendSignUpError, toLogInError, toSignUpError, toGetUserInfoError } from './Utils/AuthErrors'

export enum AuthState {
  GUEST = 0,
  SIGNED_UP,
  LOGGED_IN,

  AWAITING_CONFIRMATION,
  AWAITING_LOGIN
}

export interface AuthOutput {
  success: boolean
  error: AromiAuthError | null
}

export interface AuthUserInfo {
  email: string
  password?: string
}

const useAromiAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(AuthState.GUEST)
  const [userInfo, setUserInfo] = useState<AuthUserInfo | null>(null)

  const userGetInfo = useCallback(async (): Promise<AuthOutput> => {
    try {
      const { userId } = await getCurrentUser()

      setUserInfo({ email: userId })
      setAuthState(AuthState.LOGGED_IN)

      return { success: true, error: null }
    } catch (error: AuthError | any) {
      const authError = toGetUserInfoError(error)

      return { success: false, error: authError }
    }
  }, [])

  const userSignUp = useCallback(async (email: string, password: string): Promise<AuthOutput> => {
    setUserInfo({ email })

    try {
      const { nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email
          },
          autoSignIn: true
        }
      })

      switch (nextStep.signUpStep) {
        case 'CONFIRM_SIGN_UP': {
          setAuthState(AuthState.AWAITING_CONFIRMATION)
          break
        }
        case 'COMPLETE_AUTO_SIGN_IN': {
          setAuthState(AuthState.SIGNED_UP)
          break
        }
      }

      return { success: true, error: null }
    } catch (error: AuthError | any) {
      const authError = toSignUpError(error)

      return { success: false, error: authError }
    }
  }, [])

  const userConfirmSignUp = useCallback(async (confirmationCode: string, userId: string | undefined = userInfo?.email): Promise<AuthOutput> => {
    if (!userId) {
      const authError = new AromiAuthError('You are not authorized to perform this action.', AuthErrorCode.SERVICE_EXCEPTION)

      return { success: false, error: authError }
    }

    setUserInfo({ email: userId })
    setAuthState(AuthState.AWAITING_CONFIRMATION)

    try {
      await confirmSignUp({
        username: userId,
        confirmationCode
      })

      setAuthState(AuthState.SIGNED_UP)

      return { success: true, error: null }
    } catch (error: AuthError | any) {
      const authError = toConfirmSignUpError(error)

      return { success: false, error: authError }
    }
  }, [userInfo?.email])

  const userResendConfirmCode = useCallback(async (userId: string | undefined = userInfo?.email): Promise<AuthOutput> => {
    if (!userId) {
      const authError = new AromiAuthError('You are not authorized to perform this action.', AuthErrorCode.SERVICE_EXCEPTION)

      return { success: false, error: authError }
    }

    setUserInfo({ email: userId })
    setAuthState(AuthState.AWAITING_CONFIRMATION)

    try {
      await resendSignUpCode({
        username: userId
      })

      return { success: true, error: null }
    } catch (error: AuthError | any) {
      const authError = toResendSignUpError(error)

      return { success: false, error: authError }
    }
  }, [userInfo?.email])

  const userAutoLogIn = useCallback(async (): Promise<AuthOutput> => {
    setAuthState(AuthState.AWAITING_LOGIN)

    try {
      const { isSignedIn, nextStep } = await autoSignIn()

      switch (nextStep.signInStep) {
        case 'CONFIRM_SIGN_UP': {
          const authError = new AromiAuthError("You haven't finished signing up yet.", AuthErrorCode.SIGN_UP_INCOMPLETE)

          setAuthState(AuthState.AWAITING_CONFIRMATION)

          return { success: false, error: authError }
        }
        default:
          break
      }

      if (isSignedIn && nextStep.signInStep === 'DONE') {
        setAuthState(AuthState.LOGGED_IN)
        return { success: true, error: null }
      }

      return { success: isSignedIn, error: null }
    } catch (error: AuthError | any) {
      const authError = toLogInError(error)

      return { success: false, error: authError }
    }
  }, [])

  const userLogIn = useCallback(async (email: string, password: string): Promise<AuthOutput> => {
    setUserInfo({ email })
    setAuthState(AuthState.AWAITING_LOGIN)

    try {
      const { nextStep } = await signIn({
        username: email,
        password
      })

      switch (nextStep.signInStep) {
        case 'CONFIRM_SIGN_UP': {
          const authError = new AromiAuthError("You haven't finished signing up yet.", AuthErrorCode.SIGN_UP_INCOMPLETE)

          setAuthState(AuthState.AWAITING_CONFIRMATION)

          return { success: false, error: authError }
        }
        default:
          break
      }

      setAuthState(AuthState.LOGGED_IN)
      return { success: true, error: null }
    } catch (error: AuthError | any) {
      const authError = toLogInError(error)

      return { success: false, error: authError }
    }
  }, [])

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    const valid = emailRegex.test(email.toLowerCase())
    return valid
  }, [])

  const validatePassword = useCallback((password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const valid = passwordRegex.test(password)
    return valid
  }, [])

  const validateConfirmPassword = useCallback((password1: string, password2: string): boolean => {
    return password1 === password2
  }, [])

  const state = useMemo(() => ({ authState, userInfo }), [authState, userInfo])

  const actions = useMemo(() => (
    { userGetInfo, userSignUp, userConfirmSignUp, userResendConfirmCode, userAutoLogIn, userLogIn }
  ), [userGetInfo, userSignUp, userConfirmSignUp, userResendConfirmCode, userAutoLogIn, userLogIn])

  const validators = useMemo(() => (
    { validateEmail, validatePassword, validateConfirmPassword }
  ), [validateEmail, validatePassword, validateConfirmPassword])

  const aromiAuthValue = useMemo(() => ({ ...state, ...actions, ...validators }), [state, actions, validators])

  return aromiAuthValue
}

export default useAromiAuth
