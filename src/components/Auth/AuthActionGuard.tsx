import { useAuthGuardContext } from '@/src/hooks/useAuthGuardContext'
import React, { cloneElement, ReactElement, useCallback } from 'react'

interface AuthActionGuardProps {
  children: ReactElement
}

const AuthActionGuard: React.FC<AuthActionGuardProps> = (props: AuthActionGuardProps) => {
  const { children } = props
  const { checkAuth } = useAuthGuardContext()
  const childPressEvent = children.props.onPress

  const authAction = useCallback(() => {
    return checkAuth(childPressEvent)
  }, [checkAuth, childPressEvent])

  return cloneElement(children, { onPress: authAction })
}

export default AuthActionGuard
