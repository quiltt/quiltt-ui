import * as React from 'react'

import { render } from '@testing-library/react'

import Heading from '.'

const HeadingExamples: React.FC = () => {
  return (
    <>
      <Heading as="h1" size="2xl">
        h1: Lorem ipsum
      </Heading>
      <Heading as="h2" size="xl">
        h2: Lorem ipsum
      </Heading>
      <Heading as="h3" size="lg">
        h3: Lorem ipsum
      </Heading>
      <Heading as="h4" size="md">
        h4: Lorem ipsum
      </Heading>
      <Heading as="h5" size="sm">
        h5: Lorem ipsum
      </Heading>
      <Heading as="h6" size="xs">
        h6: Lorem ipsum
      </Heading>
    </>
  )
}

const headingComponent: React.ReactElement = <HeadingExamples />

it('renders heading component', () => {
  render(headingComponent)
  expect(headingComponent).toBeTruthy()
})
