import { useCallback } from 'react'
import { useAromiAuthContext } from './useAromiAuthContext'
import { AuthState } from './useAromiAuth'
import { useCoreContext } from './useCoreContext'
import { useRouter } from 'expo-router'

const useAuthGuard = () => {
  const { currentPage } = useCoreContext()
  const { userInfo } = useAromiAuthContext()
  const router = useRouter()

  const checkAuth = useCallback((authorizedCB?: () => void, unAuthorizedCB?: () => void): void | undefined => {
    if (userInfo.state === AuthState.UNAUTHENTICATED) {
      switch (currentPage) {
        case 'home':
          unAuthorizedCB?.()
          router.push('/(core)/home/(auth)/AuthCheck')
          break
      }

      return unAuthorizedCB?.()
    }

    return authorizedCB?.()
  }, [userInfo, currentPage, router])

  return { checkAuth }
}

export default useAuthGuard
