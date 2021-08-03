import * as React from 'react'

import { render } from '@testing-library/react'

import Button from '.'

const buttonComponent: React.ReactElement = <Button>Lorem ipsum</Button>

it('renders button component', () => {
  render(buttonComponent)
  expect(buttonComponent).toBeTruthy()
})
