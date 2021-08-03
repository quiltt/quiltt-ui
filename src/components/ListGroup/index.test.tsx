import * as React from 'react'

import { render } from '@testing-library/react'

import ListGroup from '.'

const listGroupComponent: React.ReactElement = (
  <ListGroup>
    <ListGroup.Item>Lorem ipsum</ListGroup.Item>
    <ListGroup.Item>Lorem ipsum</ListGroup.Item>
    <ListGroup.Item>Lorem ipsum</ListGroup.Item>
    <ListGroup.Item>Lorem ipsum</ListGroup.Item>
    <ListGroup.Item>Lorem ipsum</ListGroup.Item>
  </ListGroup>
)

it('renders list group component', () => {
  render(listGroupComponent)
  expect(listGroupComponent).toBeTruthy()
})
