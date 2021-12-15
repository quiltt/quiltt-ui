import * as React from 'react'

import classNames from 'classnames'

import styles from './styles'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  type?: 'success' | 'danger' | 'warning' | 'neutral' | 'primary' | 'secondary'
}

const Badge: React.FC<BadgeProps> = ({ className, children, type = 'neutral', ...otherProps }) => {
  const baseStyle = styles.base
  const typeStyles = {
    success: styles.success,
    danger: styles.danger,
    warning: styles.warning,
    neutral: styles.neutral,
    primary: styles.primary,
    secondary: styles.secondary,
  }

  const cls = classNames(baseStyle, typeStyles[type], className)

  return (
    <span className={cls} {...otherProps}>
      {children}
    </span>
  )
}

export default Badge
