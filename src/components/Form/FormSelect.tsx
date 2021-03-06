import * as React from 'react'

import { Controller, useFormContext } from 'react-hook-form'
import { Listbox, Transition } from '@headlessui/react'
import classNames from 'classnames'

import DynamicHeroIcon from '../DynamicHeroIcon'
import { SizeVariants } from '../../types'
import { parseError } from '../../utils'

import FormErrorMessage from './FormErrorMessage'
import styles from './styles'

export type SelectOption = {
  label: string
  value: string
  disabled?: boolean
}

type FormSelectProps = Omit<React.PropsWithoutRef<JSX.IntrinsicElements['button']>, 'onChange'> & {
  name: string
  size?: SizeVariants
  options: SelectOption[]
  defaultValue?: string | undefined
  label?: string
  disabled?: boolean
  outerProps?: React.PropsWithoutRef<JSX.IntrinsicElements['div']>
  onChange?: (value: string) => void
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  size = 'md',
  options,
  defaultValue = undefined,
  label = 'Select an option',
  disabled = false,
  outerProps = undefined,
  onChange = undefined,
  ...otherProps
}) => {
  const [selectedOption, setSelectedOption] = React.useState(defaultValue)
  const {
    setValue,
    control,
    formState: { isSubmitting, errors },
  } = useFormContext()

  const error = parseError(errors, name)

  const isDisabled = disabled || isSubmitting

  const isValid = !error && !disabled && isSubmitting

  const cls = classNames(
    styles.select.base,
    styles.select[size],
    styles.input.active,
    isDisabled && styles.input.disabled,
    isValid && styles.input.valid
  )

  const labelCls = classNames(styles.label.base, disabled && styles.label.disabled)
  const iconCls = classNames(styles.select.icon)
  const optionListCls = classNames(styles.select.options.list)
  const optionItemCls = classNames(styles.select.options.item)

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={() => {
        const handleChange = (e: string) => {
          setSelectedOption(e)
          setValue(name, e, {
            shouldDirty: false,
            shouldTouch: true,
            shouldValidate: true,
          })
          if (onChange) {
            onChange(e)
          }
        }
        return (
          <Listbox value={selectedOption} onChange={handleChange}>
            {({ open }) => {
              const current = options.find((option) => option.value === selectedOption)

              return (
                <div {...outerProps} className="relative">
                  <Listbox.Label className={labelCls}>
                    {label}
                    <Listbox.Button className={cls} {...otherProps}>
                      <span className="block px-2 text-left truncate">
                        {current && current.label}
                      </span>
                      <span className={iconCls}>
                        <DynamicHeroIcon icon="SelectorIcon" className="w-5 h-5 text-gray-400" />
                      </span>
                    </Listbox.Button>
                  </Listbox.Label>
                  <Transition
                    show={open}
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className={optionListCls}>
                      {options.map((option) => (
                        <Listbox.Option
                          key={option.value}
                          className={({ active }) =>
                            classNames(
                              active && !option.disabled
                                ? 'text-white bg-primary-400'
                                : 'text-gray-900',
                              option.disabled
                                ? 'cursor-not-allowed text-gray-500'
                                : 'cursor-default',
                              'select-none relative py-2 pl-3 pr-9'
                            )
                          }
                          value={option.value}
                          disabled={option.disabled}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={classNames(
                                  selected ? 'font-semibold' : 'font-normal',
                                  optionItemCls
                                )}
                              >
                                {option.label}
                              </span>
                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? 'text-white' : 'text-primary-400',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                  )}
                                >
                                  <DynamicHeroIcon className="w-5 h-5" icon="CheckIcon" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                  <FormErrorMessage name={name} />
                </div>
              )
            }}
          </Listbox>
        )
      }}
    />
  )
}

export default FormSelect
