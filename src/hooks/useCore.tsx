import { useState } from 'react'

export type PageState = 'home' | 'search' | 'communites' | 'profile'

const useCore = () => {
  const [currentPage, setCurrentPage] = useState<PageState>('home')

  return { currentPage, setCurrentPage }
}

export default useCore
