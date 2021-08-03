import * as React from 'react'

import { render } from '@testing-library/react'

import Badge from '.'

const badgeComponent: React.ReactElement = <Badge type="success">Lorem ipsum</Badge>

it('renders badge component', () => {
  render(badgeComponent)
  expect(badgeComponent).toBeTruthy()
})
