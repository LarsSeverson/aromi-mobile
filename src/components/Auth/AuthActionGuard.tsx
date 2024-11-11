import { AuthState } from '@/src/hooks/useAromiAuth'
import { useAromiAuthContext } from '@/src/hooks/useAromiAuthContext'
import React, { cloneElement, ReactElement, useCallback } from 'react'
import { AuthActions } from './Utils/AuthActions'

interface AuthActionGuardProps extends AuthActions {
  children: ReactElement
}

const AuthActionGuard: React.FC<AuthActionGuardProps> = (props: AuthActionGuardProps) => {
  const { userInfo } = useAromiAuthContext()
  const { onUnAuth, children } = props
  const childPressEvent = children.props.onPress

  const authAction = useCallback((...args: any[]) => {
    if (userInfo.state !== AuthState.AUTHENTICATED) {
      return onUnAuth()
    }

    if (childPressEvent) {
      childPressEvent(...args)
    }
  }, [childPressEvent, onUnAuth, userInfo])

  return cloneElement(children, { onPress: authAction })
}

export default AuthActionGuard
