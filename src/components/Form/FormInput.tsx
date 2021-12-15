import * as React from 'react'
import { useFormContext } from 'react-hook-form'

import classNames from 'classnames'
import { IconNames, SizeVariants } from 'types'

import DynamicHeroIcon from '../DynamicHeroIcon'

import styles from './styles'

export type FormInputProps = React.PropsWithoutRef<JSX.IntrinsicElements['input']> & {
  name: string
  label?: string
  size?: SizeVariants
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'checkbox' | 'radio'
  leftIcon?: IconNames
  rightIcon?: IconNames
  disabled?: boolean
  outerProps?: React.PropsWithoutRef<JSX.IntrinsicElements['div']>
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      name,
      label,
      size = 'md',
      type = 'text',
      leftIcon = undefined,
      rightIcon = undefined,
      disabled = false,
      outerProps,
      ...otherProps
    },
    ref
  ) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()
    const error = Array.isArray(errors[name])
      ? errors[name].join(', ')
      : errors[name]?.message || errors[name]

    const hasIcon = leftIcon || rightIcon
    const iconClasses =
      'flex items-center justify-center p-2 bg-gray-100 border border-gray-300 appearance-none'
    const leftIconClasses = classNames(
      iconClasses,
      styles.input[size],
      `border-r-0 rounded-l-${size}`
    )
    const rightIconClasses = classNames(
      iconClasses,
      styles.input[size],
      `border-l-0 rounded-r-${size}`
    )

    const isDisabled = disabled || isSubmitting

    const isValid = !error && !disabled && isSubmitting

    const isText =
      type === 'text' ||
      type === 'email' ||
      type === 'number' ||
      type === 'tel' ||
      type === 'url' ||
      type === 'password'

    const isCheckboxOrRadio = type === 'checkbox' || type === 'radio'

    const baseStyles = isText ? 'base' : type
    const labelBaseStyles = isCheckboxOrRadio ? 'check' : `base`

    const labelCls = classNames(styles.input[labelBaseStyles], isDisabled && styles.label.disabled)

    const errorFeedbackCls = classNames(styles.feedback.base, styles.feedback.invalid)

    const cls = classNames(
      styles.input[baseStyles],
      isCheckboxOrRadio && styles.input.radioCheckboxBase,
      styles.input[size],
      styles.input.active,
      isDisabled && styles.input.disabled,
      isValid && styles.input.valid
    )

    return (
      <div {...outerProps} className="relative" ref={ref}>
        <label className={labelCls} htmlFor={name}>
          {label ? (
            <span className="text-sm text-gray-700">{label}</span>
          ) : (
            <span className="sr-only">{name}</span>
          )}
          {hasIcon ? (
            <div className="flex w-full">
              {leftIcon && (
                <div className={leftIconClasses}>
                  <DynamicHeroIcon icon={leftIcon} />
                </div>
              )}
              <input
                className={classNames(
                  cls,
                  leftIcon && `border-l-0 rounded-l-none rounded-r-${size}`,
                  rightIcon && `border-r-0 rounded-r-none rounded-l-${size}`
                )}
                disabled={isDisabled}
                {...register(name)}
                {...otherProps}
              />
              {rightIcon && (
                <div className={rightIconClasses}>
                  <DynamicHeroIcon icon={rightIcon} />
                </div>
              )}
            </div>
          ) : (
            <input
              className={classNames(cls, `rounded-${size}`)}
              disabled={isDisabled}
              {...register(name)}
              {...otherProps}
            />
          )}
        </label>

        {error && (
          <div role="alert" className={errorFeedbackCls}>
            {error}
          </div>
        )}
      </div>
    )
  }
)

export default FormInput
