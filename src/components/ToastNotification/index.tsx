import * as React from 'react'
import { toast, ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

type ToastTypes = 'info' | 'error' | 'warn' | 'success' | 'default'

export const notify = (message: string, type: ToastTypes = 'default', options = undefined) => {
  switch (type) {
    case 'default':
      toast(message, options)
      break
    case 'error':
      toast.error(message, options)
      break
    case 'info':
      toast.info(message, options)
      break
    case 'warn':
      toast.warn(message, options)
      break
    case 'success':
      toast.success(message, options)
      break
    default:
      toast(message, options)
      break
  }
}

const ToastNotification: React.FC = () => {
  return <ToastContainer />
}

export default ToastNotification
