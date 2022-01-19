import * as React from 'react'

import { ChevronDownIcon } from '@heroicons/react/outline'

import { ColorVariants } from '../../types'
import Button from '../Button'
import Dropdown from '../Dropdown'

type Option = {
  description: string
  sortFunction: (a: any, b: any) => number
}

type SortDropdownProps = {
  layout?: 'outline' | 'link' | 'solid'
  variant?: ColorVariants // The color variant of the button
  label: string
  options: Option[]
  reorder: React.Dispatch<React.SetStateAction<Option>>
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  variant = 'dark',
  layout = 'outline',
  label,
  options,
  reorder,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <Button
        iconRight={ChevronDownIcon}
        onClick={toggleDropdown}
        aria-label={`Sort by ${label}`}
        aria-haspopup="true"
        variant={variant}
        layout={layout}
      >
        {`Sort by ${label}`}
      </Button>
      <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {options.map((option) => (
          <Dropdown.Item
            className="justify-between"
            onClick={() => reorder(option)}
            key={option.description}
          >
            {option.description}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  )
}

export default SortDropdown
