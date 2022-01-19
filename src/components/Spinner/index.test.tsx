import * as React from 'react'

import { render } from '@testing-library/react'

import Spinner from '.'

const SpinnerExamples: React.FC = () => (
  <>
    <Spinner size="lg" />
    <Spinner size="md" />
    <Spinner size="sm" />
  </>
)

const spinnerComponent: React.ReactElement = <SpinnerExamples />

it('renders Spinner component', () => {
  render(spinnerComponent)
  expect(spinnerComponent).toBeTruthy()
})
