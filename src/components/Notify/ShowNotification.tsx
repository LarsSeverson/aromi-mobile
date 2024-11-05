import ErrorNotify from './ErrorNotify'
import SuccessNotify from './SuccessNotify'

const showError = (message: string) => ({
  Component: ErrorNotify,
  componentProps: { message },
  duration: 4000
})

const showSuccess = (message: string) => ({
  Component: SuccessNotify,
  componentProps: { message },
  duration: 4000
})

export const showNotifaction = {
  error: (message: string) => showError(message),
  success: (message: string) => showSuccess(message)
}
