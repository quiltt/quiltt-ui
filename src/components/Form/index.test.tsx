import * as React from 'react'

import { render } from '@testing-library/react'

import Button from '../Button'

import Form from '.'

const FormExample: React.FC = () => {
  return (
    <Form>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>

        <Form.Input name="email" type="text" placeholder="Enter your Email" />

        <Form.Input.Feedback type="invalid">Please enter a valid email</Form.Input.Feedback>
      </Form.Group>

      <Button block variant="primary" type="submit">
        Next
      </Button>
    </Form>
  )
}

const formComponent: React.ReactElement = <FormExample />

it('renders form component', () => {
  render(formComponent)
  expect(formComponent).toBeTruthy()
})
