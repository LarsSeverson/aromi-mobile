import type React from 'react'

interface AuthActionGuardProps {
  children: React.ReactNode
}

const AuthActionGuard = (props: AuthActionGuardProps) => {
  // const { children } = props
  // const { checkAuth } = useAuthGuardContext()
  // const childPressEvent = children.props.onPress

  // const authAction = useCallback(() => {
  //   return checkAuth(childPressEvent)
  // }, [checkAuth, childPressEvent])

  // return cloneElement(children, { onPress: authAction })
  return null
}

export default AuthActionGuard
