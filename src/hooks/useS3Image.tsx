import { useCallback, useEffect, useState } from 'react'
import { getUrl } from 'aws-amplify/storage'

const useS3Image = (key: string | undefined) => {
  const [path, setPath] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const getImage = useCallback(async (key: string) => {
    if (!key) return null

    setLoading(true)

    try {
      const s3Url = await getUrl({
        path: key,
        options: { validateObjectExistence: true }
      })

      return s3Url.url.toString()
    } catch (error) {
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const updatePath = useCallback(async (key?: string | undefined) => {
    if (!key) return
    const path = await getImage(key)
    setPath(path)
  }, [getImage])

  useEffect(() => { updatePath(key) }, [key, updatePath])

  return {
    path,
    loading
  }
}

export default useS3Image
