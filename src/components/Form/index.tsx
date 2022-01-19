import * as React from 'react'
import { FormProvider, Path, useForm, UseFormProps, ValidationMode } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { TypeOf, z } from 'zod'

import Button from '../Button'
import Spinner from '../Spinner'

import FormErrorMessage from './FormErrorMessage'
import FormInput from './FormInput'
import FormSelect from './FormSelect'
import FormTextarea from './FormTextarea'

interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: any
}

export const FORM_ERROR = 'FORM_ERROR'

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<React.PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  /** Form fields as children */
  children?: React.ReactNode
  /** Zod form schema for validations */
  schema?: S
  initialValues?: UseFormProps<z.infer<S>>['defaultValues']
  /** Text to display in the submit button (Defaults to 'Submit') */
  submitText?: string
  /** Disables the submit button if needs manual control */
  disabled?: boolean
  /** Use a custom submit button (for instance in a multi-step form) */
  useCustomSubmitButton?: boolean
  mode?: keyof ValidationMode
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
}

const Form = <S extends z.ZodType<any, any>>({
  children,
  schema,
  initialValues,
  className = '',
  submitText = 'Submit',
  disabled = false,
  useCustomSubmitButton = false,
  mode = 'onBlur' as keyof ValidationMode,
  onSubmit,
  ...props
}: FormProps<S>) => {
  const ctx = useForm<z.infer<S>>({
    mode,
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: initialValues,
  })
  const [formError, setFormError] = React.useState<string | null>(null)

  const cls = classNames('form', className)

  const { isValid, isSubmitting } = ctx.formState
  const isLoading = isSubmitting
  const isDisabled = mode === 'onChange' ? disabled || isLoading || !isValid : disabled || isLoading

  return (
    <FormProvider {...ctx}>
      <form
        onSubmit={ctx.handleSubmit(async (values) => {
          const result = (await onSubmit(values)) || {}
          for (const [key, value] of Object.entries(result)) {
            if (key === FORM_ERROR) {
              setFormError(value as string)
            } else {
              ctx.setError(key as Path<TypeOf<S>>, {
                type: 'submit',
                message: value as string,
              })
            }
          }
        })}
        className={className ? cls : 'form space-y-6'}
        {...props}
      >
        {/* Form fields supplied as children are rendered here */}
        {children}

        {formError && (
          <div role="alert" className="text-sm text-red-600">
            {formError}
          </div>
        )}

        {!useCustomSubmitButton && submitText && (
          <Button type="submit" disabled={isDisabled} block>
            {isLoading ? <Spinner size="sm" color="light" /> : submitText}
          </Button>
        )}
      </form>
    </FormProvider>
  )
}

Form.displayName = 'Form'

export default Object.assign(Form, {
  Input: FormInput,
  Select: FormSelect,
  Textarea: FormTextarea,
  ErrorMessage: FormErrorMessage,
})
