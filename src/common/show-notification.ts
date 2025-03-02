import { Notifier, type ShowNotificationParams } from 'react-native-notifier'
import ErrorNotify from '../components/common/notify/ErrorNotify'
import SuccessNotify from '../components/common/notify/SuccessNotify'

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
  error: (message: string) => { Notifier.showNotification(showError(message)) },
  success: (message: string) => { Notifier.showNotification(showSuccess(message)) }
}
