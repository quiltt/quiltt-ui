import * as React from 'react'

import classNames from 'classnames'
import { ColorVariants, SizeVariants } from 'types'

import styles from './styles'

export type SpinnerKind = 'centered' | 'overlay' | 'inline'

type SpinnerProps = {
  color?: ColorVariants
  size?: SizeVariants
  kind?: SpinnerKind
  style?: React.CSSProperties
  className?: string
}

const WrappedSpinner: React.FC<SpinnerProps> = ({
  color = 'dark',
  kind = 'centered',
  size = 'lg',
  children,
  style = {},
  className = '',
}) => {
  const baseStyles = styles.base
  // Use the theme spinner color for overlays, otherwise used passed in color
  const colorStyles = kind === 'overlay' ? styles.color.dark : styles.color[color]
  const sizeStyles = styles.size[size]

  const cls = classNames(baseStyles, colorStyles, sizeStyles)

  return (
    <div
      className={`spinner-wrapper spinner-wrapper-${kind} hide-in-percy ${className}`}
      style={style}
    >
      <div className={`spinner ${cls}`} />
      {children}
    </div>
  )
}

export default WrappedSpinner
