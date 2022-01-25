import * as React from 'react'

import { Switch } from '@headlessui/react'
import classNames from 'classnames'
import { SizeVariants } from '../../types'

import styles from './styles'

export type ToggleSwitchProps = React.HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean
  size?: SizeVariants
  defaultChecked?: boolean
  label?: string
  onChange?: (e?: any) => void | React.Dispatch<any>
}

const ToggleSwitch = React.forwardRef<HTMLButtonElement, ToggleSwitchProps>((props, ref) => {
  const {
    defaultChecked = false,
    size = 'md',
    disabled = false,
    label,
    onChange,
    ...otherProps
  } = props
  const [enabled, setEnabled] = React.useState(defaultChecked)

  const sizeStyles = styles.size[size]
  const checkedStyles = enabled ? styles.checked : styles.unchecked
  const switchSizeStyles = styles.switch.size[size]
  const switchTranslateStyles = styles.switch.translate[size]
  const switchEnabledStyles = enabled ? switchTranslateStyles : 'translate-x-0'

  const baseStyles = classNames(styles.base, sizeStyles, checkedStyles)
  const switchStyles = classNames(styles.switch.base, switchSizeStyles, switchEnabledStyles)

  const handleChange = (e: any) => {
    if (onChange) {
      onChange(e)
    }
    setEnabled(!enabled)
  }

  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      disabled={disabled}
      className={baseStyles}
      ref={ref}
      {...otherProps}
    >
      <span className="sr-only">{label}</span>
      <span className={switchStyles}>
        <span className="sr-only">{enabled ? 'Yes' : 'No'}</span>
      </span>
    </Switch>
  )
})

export default ToggleSwitch
