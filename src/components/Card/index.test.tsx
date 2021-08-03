import * as React from 'react'

import { render } from '@testing-library/react'

import Card from '.'

const cardComponent: React.ReactElement = (
  <Card>
    <Card.Header>Lorem ipsum</Card.Header>
    <Card.Body>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, aut incidunt deserunt ducimus
      nihil distinctio! Architecto eum nostrum illum rerum ut exercitationem fugiat odit facilis
      voluptate facere, dolore magni eligendi?
    </Card.Body>
    <Card.Footer>Lorem ipsum</Card.Footer>
  </Card>
)

it('renders card component', () => {
  render(cardComponent)
  expect(cardComponent).toBeTruthy()
})
