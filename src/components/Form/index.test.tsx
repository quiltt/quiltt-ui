import * as React from 'react'

import { render } from '@testing-library/react'

import Button from '../Button'

import Form from '.'

const FormExample: React.FC = () => (
  <Form
    onSubmit={async (values) => {
      const returnedValue = (await Promise.resolve(values)) as Promise<Record<string, any>>
      // eslint-disable-next-line no-console
      console.log(returnedValue)
    }}
  >
    <Form.Input label="Email" name="email" type="text" placeholder="Enter your Email" />
    <Form.Textarea label="Text Area" name="textarea" placeholder="Start typing here..." />

    <Button block variant="primary" type="submit">
      Next
    </Button>
  </Form>
)

const formComponent: React.ReactElement = <FormExample />

it('renders form component', () => {
  render(formComponent)
  expect(formComponent).toBeTruthy()
})
