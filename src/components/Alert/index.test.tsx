import * as React from 'react'

import { render } from '@testing-library/react'

import Alert from '.'

const alertComponent: React.ReactElement = (
  <Alert type="success" hasIcon>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
  </Alert>
)

it('renders alert component', () => {
  render(alertComponent)
  expect(alertComponent).toBeTruthy()
})
