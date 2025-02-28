import { Notifier, ShowNotificationParams } from 'react-native-notifier'
import ErrorNotify from './ErrorNotify'
import SuccessNotify from './SuccessNotify'

const showError = (message: string) => ({
  Component: ErrorNotify,
  componentProps: { message },
  duration: 4000
})

const showSuccess = (message: string): ShowNotificationParams => ({
  Component: SuccessNotify,
  componentProps: { message },
  duration: 4000
})

export const showNotifaction = {
  error: (message: string) => Notifier.showNotification(showError(message)),
  success: (message: string) => Notifier.showNotification(showSuccess(message))
}
