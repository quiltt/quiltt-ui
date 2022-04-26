import * as React from 'react'

import { Controller, useForm, useFormContext } from 'react-hook-form'
import { Combobox, Transition } from '@headlessui/react'
import classNames from 'classnames'

import DynamicHeroIcon from '../DynamicHeroIcon'
import { SizeVariants } from '../../types'
import { parseError } from '../../utils'

import FormErrorMessage from './FormErrorMessage'
import styles from './styles'

type FormComboboxProps = React.PropsWithoutRef<JSX.IntrinsicElements['button']> & {
  label: string
  name: string
  size?: SizeVariants
  options: string[]
  defaultValue?: string | undefined
  disabled?: boolean
  outerProps?: React.PropsWithoutRef<JSX.IntrinsicElements['div']>
  autoComplete?: HTMLInputElement['autocomplete']
  onChange?: React.Dispatch<React.SetStateAction<string>>
}

const FormCombobox: React.FC<FormComboboxProps> = ({
  label,
  options,
  name,
  size = 'md',
  defaultValue = undefined,
  autoComplete = undefined,
  disabled = false,
  outerProps = undefined,
  onChange = (e) => {
    // eslint-disable-next-line no-console
    console.log(e)
  },
  ...otherProps
}) => {
  const { control } = useForm()
  const {
    // Not calling `register` again `Controller` component handles the registration process
    formState: { isSubmitting, errors },
  } = useFormContext()

  const error = parseError(errors, name)

  const isDisabled = disabled || isSubmitting

  const isValid = !error && !disabled && isSubmitting
  const [selectedOption, setSelectedOption] = React.useState(defaultValue)
  const [query, setQuery] = React.useState('')

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  const handleChange = (e: string) => {
    setSelectedOption(e)
    onChange(e)
  }

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
      render={() => (
        <Combobox value={selectedOption} onChange={handleChange}>
          <div {...outerProps} className="relative">
            <Combobox.Label className={labelCls}>
              {label}
              <Combobox.Input
                displayValue={(state: string) => state}
                onChange={(event) => setQuery(event.target.value)}
                autoComplete={autoComplete}
                className="w-full border-none ring-0 focus:ring-0 focus:outline-none"
              />
              <Combobox.Button className={cls} {...otherProps}>
                <span className={iconCls}>
                  <DynamicHeroIcon icon="SelectorIcon" className="w-5 h-5 text-gray-400" />
                </span>
              </Combobox.Button>
            </Combobox.Label>
            <Transition
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery('')}
            >
              <Combobox.Options className={optionListCls}>
                {filteredOptions.length === 0 && query !== '' ? (
                  <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                    Nothing found.
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <Combobox.Option
                      key={option}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-white bg-primary-400' : 'text-gray-900',
                          'select-none relative py-2 pl-3 pr-9'
                        )
                      }
                      value={option}
                    >
                      {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              optionItemCls
                            )}
                          >
                            {option}
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
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
            <FormErrorMessage name={name} />
          </div>
        </Combobox>
      )}
    />
  )
}

export default FormCombobox
