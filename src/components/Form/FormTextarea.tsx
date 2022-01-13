import * as React from 'react'
import { useFormContext, UseFormRegisterReturn } from 'react-hook-form'

import classNames from 'classnames'

import FormErrorMessage from './FormErrorMessage'
import styles from './styles'

export type FormTextareaProps = React.PropsWithoutRef<JSX.IntrinsicElements['textarea']> & {
  name: string
  label?: string
  customRegister?: UseFormRegisterReturn
  outerProps?: React.PropsWithoutRef<JSX.IntrinsicElements['div']>
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
  disabled,
  className,
  children,
  customRegister,
  outerProps,
  ...otherProps
}) => {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext()
  const error = Array.isArray(errors[name])
    ? errors[name].join(', ')
    : errors[name]?.message || errors[name]

  const isDisabled = disabled || isSubmitting

  const isValid = !error && !disabled && isSubmitting

  const textareaProps = customRegister ? { ...customRegister } : { ...register(name) }

  const labelCls = classNames(styles.label.base, isDisabled && styles.label.disabled)

  const cls = classNames(
    styles.textarea.base,
    !isValid && !disabled && styles.textarea.active, // No activeStyle if has valid or disabled
    !isValid && disabled && styles.textarea.disabled, // No disabledStyle if has valid
    isValid ? styles.textarea.valid : styles.textarea.invalid,
    className
  )

  return (
    <div {...outerProps} className="relative">
      <label className={labelCls} htmlFor={name}>
        {label ? (
          <span className="text-sm text-gray-700">{label}</span>
        ) : (
          <span className="sr-only">{name}</span>
        )}
        <textarea className={cls} disabled={disabled} {...textareaProps} {...otherProps}>
          {children}
        </textarea>
      </label>
      <FormErrorMessage name={name} />
    </div>
  )
}

export default FormTextarea
