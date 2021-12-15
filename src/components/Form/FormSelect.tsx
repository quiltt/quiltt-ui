import * as React from 'react'
import { Controller, useForm, useFormContext } from 'react-hook-form'

import { Listbox, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { SizeVariants } from 'types'

import DynamicHeroIcon from '../DynamicHeroIcon'

import styles from './styles'

export type SelectOption = {
  label: string
  value: string
  disabled?: boolean
}

type SelectProps = {
  name: string
  size?: SizeVariants
  options: SelectOption[]
  selectedOption?: SelectOption
  label?: string
  disabled?: boolean
  onChange?: (e: SelectOption) => void
}

const Select: React.FC<SelectProps> = ({
  name,
  size = 'md',
  options,
  selectedOption = options[0],
  label = 'Select an option',
  disabled = false,
  onChange = (e) => {
    // eslint-disable-next-line no-console
    console.log(e)
  },
}) => {
  const [currentSelection, setCurrentSelection] = React.useState(options[0])
  const { control } = useForm()
  const {
    formState: { isSubmitting, errors },
  } = useFormContext()
  const error = Array.isArray(errors[name])
    ? errors[name].join(', ')
    : errors[name]?.message || errors[name]

  const isDisabled = disabled || isSubmitting

  const isValid = !error && !disabled && isSubmitting

  React.useEffect(() => {
    if (selectedOption) {
      const current = options.find((option) => option === selectedOption)
      if (current) {
        setCurrentSelection(current)
      }
    }
  }, [options, selectedOption])

  const handleChange = (e: SelectOption) => {
    setCurrentSelection(e)
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
  const errorFeedbackCls = classNames(styles.feedback.base, styles.feedback.invalid)

  return (
    <Controller
      control={control}
      defaultValue={currentSelection.value}
      name={name}
      render={() => {
        return (
          <Listbox value={currentSelection} onChange={handleChange}>
            {({ open }) => (
              <>
                <Listbox.Label className={labelCls}>{label}</Listbox.Label>
                <div className="relative mt-1">
                  <Listbox.Button className={cls}>
                    <span className="block truncate">{currentSelection.label}</span>
                    <span className={iconCls}>
                      <DynamicHeroIcon icon="SelectorIcon" className="w-5 h-5 text-gray-400" />
                    </span>
                  </Listbox.Button>

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
                </div>
                {error && (
                  <div role="alert" className={errorFeedbackCls}>
                    {error}
                  </div>
                )}
              </>
            )}
          </Listbox>
        )
      }}
    />
  )
}

export default Select
