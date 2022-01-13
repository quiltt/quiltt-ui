import * as React from 'react'
import { useFormContext } from 'react-hook-form'

import { ErrorMessage } from '@hookform/error-message'
import classNames from 'classnames'

import styles from './styles'

export type FormErrorMessageProps = {
  name: string
}

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ name }) => {
  const {
    formState: { errors },
  } = useFormContext()

  const errorFeedbackCls = classNames(styles.feedback.base, styles.feedback.invalid)

  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <div role="alert" className={errorFeedbackCls}>
          {message}
        </div>
      )}
    />
  )
}

export default FormErrorMessage
