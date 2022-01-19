import * as React from 'react'

import { render } from '@testing-library/react'

import Checkbox from '.'

const CheckboxExamples: React.FC = () => (
  <>
    <Checkbox isChecked />
    <Checkbox isChecked={false} />
  </>
)

const checkboxComponent: React.ReactElement = <CheckboxExamples />

it('renders checkbox component', () => {
  render(checkboxComponent)
  expect(checkboxComponent).toBeTruthy()
})
