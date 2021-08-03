import * as React from 'react'

import { render } from '@testing-library/react'

import ToggleSwitch from '.'

const toggleSwitchComponent: React.ReactElement = <ToggleSwitch label="Enable" />

it('renders toggle switch component', () => {
  render(toggleSwitchComponent)
  expect(toggleSwitchComponent).toBeTruthy()
})
