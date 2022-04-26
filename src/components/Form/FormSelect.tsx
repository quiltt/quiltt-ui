import * as React from 'react'

import { Controller, useForm, useFormContext } from 'react-hook-form'
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

type FormSelectProps = React.PropsWithoutRef<JSX.IntrinsicElements['button']> & {
  name: string
  size?: SizeVariants
  options: SelectOption[]
  defaultValue?: SelectOption
  label?: string
  disabled?: boolean
  outerProps?: React.PropsWithoutRef<JSX.IntrinsicElements['div']>
  onChange?: (e: SelectOption) => void
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  size = 'md',
  options,
  defaultValue = options[0],
  label = 'Select an option',
  disabled = false,
  outerProps,
  onChange = (e) => {
    // eslint-disable-next-line no-console
    console.log(e)
  },
  ...otherProps
}) => {
  const [selectedOption, setSelectedOption] = React.useState(options[0])
  const { control } = useForm()
  const {
    // Not calling `register` again `Controller` component handles the registration process
    formState: { isSubmitting, errors },
  } = useFormContext()

  const error = parseError(errors, name)

  const isDisabled = disabled || isSubmitting

  const isValid = !error && !disabled && isSubmitting

  React.useEffect(() => {
    if (defaultValue) {
      const current = options.find((option) => option === defaultValue)
      if (current) {
        setSelectedOption(current)
      }
    }
  }, [options, defaultValue])

  const handleChange = (e: SelectOption) => {
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
      defaultValue={selectedOption.value}
      name={name}
      render={() => (
        <Listbox value={selectedOption} onChange={handleChange}>
          {({ open }) => (
            <div {...outerProps} className="relative">
              <Listbox.Label className={labelCls}>
                {label}
                <Listbox.Button className={cls} {...otherProps}>
                  <span className="block px-2 text-left truncate">{selectedOption.label}</span>
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
                          option.disabled ? 'cursor-not-allowed text-gray-500' : 'cursor-default',
                          'select-none relative py-2 pl-3 pr-9'
                        )
                      }
                      value={option}
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
          )}
        </Listbox>
      )}
    />
  )
}

export default FormSelect
