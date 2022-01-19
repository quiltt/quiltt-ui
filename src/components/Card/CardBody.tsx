import * as React from 'react'

import classNames from 'classnames'

import styles from './styles'

export type CardBodyProps = React.HTMLAttributes<HTMLDivElement>

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>((props, ref) => {
  const { className = '', children, ...otherProps } = props

  const cardBodyStyles = className || styles.cardBody.base

  const cls = classNames('card-body', cardBodyStyles)

  return (
    <div className={cls} ref={ref} {...otherProps}>
      {children}
    </div>
  )
})

export default CardBody
