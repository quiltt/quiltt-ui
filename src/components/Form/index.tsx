import * as React from 'react'
import { FormProvider, useForm, UseFormProps } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { z } from 'zod'

import Button from '../Button'
import Spinner from '../Spinner'

import FormInput from './FormInput'
import FormSelect from './FormSelect'
import FormTextarea from './FormTextarea'

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<React.PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  /** All your form fields as children */
  children?: React.ReactNode
  schema?: S
  initialValues?: UseFormProps<z.infer<S>>['defaultValues']
  /** Text to display in the submit button (Defaults to 'Submit') */
  submitText?: string
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
}

interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: any
}

export const FORM_ERROR = 'FORM_ERROR'

const Form = <S extends z.ZodType<any, any>>({
  children,
  schema,
  initialValues,
  submitText = 'Submit',
  className = '',
  onSubmit,
  ...props
}: FormProps<S>) => {
  const ctx = useForm<z.infer<S>>({
    mode: 'onBlur',
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: initialValues,
  })
  const [formError, setFormError] = React.useState<string | null>(null)

  const cls = classNames('form', className)

  return (
    <FormProvider {...ctx}>
      <form
        onSubmit={ctx.handleSubmit(async (values) => {
          const result = (await onSubmit(values)) || {}
          // eslint-disable-next-line no-restricted-syntax
          for (const [key, value] of Object.entries(result)) {
            if (key === FORM_ERROR) {
              setFormError(value)
            } else {
              ctx.setError(key as any, {
                type: 'submit',
                message: value,
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

        {submitText && (
          <Button type="submit" disabled={ctx.formState.isSubmitting} block>
            {ctx.formState.isSubmitting ? <Spinner /> : submitText}
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
})
