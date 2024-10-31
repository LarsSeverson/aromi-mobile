import { ErrorNotify } from './Notify'

const showError = (message: string) => ({
  Component: ErrorNotify,
  componentProps: { message },
  duration: 4000
})

export const showNotifaction = {
  error: (message: string) => showError(message)
}
