import * as React from 'react'

import * as HIcons from '@heroicons/react/outline'

import { IconNames } from '../../types'

type DynamicHeroIconProps = { icon: IconNames; className?: string }

const DynamicHeroIcon: React.FC<DynamicHeroIconProps> = ({ icon, className = '' }) => {
  const { ...icons } = HIcons
  const TheIcon: JSX.Element = icons[icon] as JSX.Element

  const cls = className || 'w-6 h-6 text-gray-600'
  // @ts-ignore
  return <TheIcon className={cls} aria-hidden="true" />
}

export default DynamicHeroIcon
