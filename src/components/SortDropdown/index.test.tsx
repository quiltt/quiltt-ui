import * as React from 'react'

import { render } from '@testing-library/react'

import SortDropdown from '.'

const options = [
  {
    description: 'Due Date',
    sortFunction: (
      a: { nextPaymentDate: string | number | Date },
      b: { nextPaymentDate: string | number | Date }
    ) => Math.abs(new Date(a.nextPaymentDate).getTime() - new Date(b.nextPaymentDate).getTime()),
  },
  {
    description: 'Name',
    sortFunction: (a: { name: number }, b: { name: number }) =>
      a.name < b.name ? -1 : Number(a.name > b.name),
  },
  {
    description: 'Amount',
    sortFunction: (a: { amount: number }, b: { amount: number }) => b.amount - a.amount,
  },
]

const SortDropdownExample: React.FC = () => {
  const [currentSort, setCurrentSort] = React.useState(options[0])
  return <SortDropdown label={currentSort.description} options={options} reorder={setCurrentSort} />
}

const sortDropdownComponent: React.ReactElement = <SortDropdownExample />

it('renders sortable dropdown component', () => {
  render(sortDropdownComponent)
  expect(sortDropdownComponent).toBeTruthy()
})
