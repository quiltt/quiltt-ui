import * as React from 'react'

import { act, render } from '@testing-library/react'

import Dropdown from '.'

const options = [
  { name: 'One', description: 'Item One' },
  { name: 'Two', description: 'Item Two' },
  { name: 'Three', description: 'Item Three' },
]

const DropdownExample: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)}>
      {options.map((option) => (
        <Dropdown.Item className="justify-between" key={option.name}>
          {option.description}
        </Dropdown.Item>
      ))}
    </Dropdown>
  )
}

const dropdownComponent: React.ReactElement = <DropdownExample />

it('renders dropdown component', () => {
  act(() => {
    render(dropdownComponent)
  })

  expect(dropdownComponent).toBeTruthy()
})
