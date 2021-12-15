/* eslint-disable max-len */
export default {
  label: {
    base: 'flex flex-col w-full font-medium block text-sm text-gray-700 dark:text-gray-400',
    // check and radio get this same style
    check: 'inline-flex items-center',
    disabled: 'opacity-50 cursor-not-allowed',
  },
  input: {
    base: 'block w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-300 leading-5 p-2 appearance-none border-gray-300 dark:border-gray-600',
    radioCheckboxBase: 'focus:ring-primary-300 focus:ring-offset-0 dark:focus:ring-gray-300',
    radio: 'form-radio',
    checkbox: 'form-checkbox',
    sm: 'h-8 text-sm rounded-sm',
    md: 'h-10 text-base rounded-md',
    lg: 'h-12 text-lg rounded-lg',
    active: 'focus:outline-none focus:ring focus:ring-primary-300 dark:focus:ring-gray-300',
    disabled: 'cursor-not-allowed opacity-50 bg-gray-300 dark:bg-gray-800',
    valid: 'border-green-600 focus:ring-green-200 dark:focus:ring-green-200',
    invalid: 'border-red-600 focus:ring-red-200 dark:focus:ring-red-200',
  },
  textarea: {
    base: 'block w-full text-sm dark:text-gray-300 rounded-md focus:outline-none border-gray-300 dark:border-gray-600',
    active: 'focus:ring focus:ring-primary-300 dark:bg-gray-700 dark:focus:ring-gray-300',
    disabled: 'cursor-not-allowed opacity-50 bg-gray-300 dark:bg-gray-800',
    valid: 'border-green-600 dark:bg-gray-700 focus:ring-green-200 dark:focus:ring-green-200',
    invalid: 'border-red-600 dark:bg-gray-700 focus:ring-red-200 dark:focus:ring-red-200',
  },
  // Select
  select: {
    base: 'block w-full dark:text-gray-300 focus:outline-none leading-5 border-gray-300 dark:border-gray-600',
    sm: 'h-8 text-sm rounded-sm',
    md: 'h-10 text-base rounded-md',
    lg: 'h-12 text-lg rounded-lg',
    icon: 'absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none',
    active: 'dark:bg-gray-700 focus:ring focus:ring-primary-300 dark:focus:ring-gray-300',
    disabled: 'cursor-not-allowed opacity-50 bg-gray-300 dark:bg-gray-800',
    valid: 'border-green-600 dark:bg-gray-700 focus:ring-green-200 dark:focus:ring-green-200',
    invalid: 'border-red-600 dark:bg-gray-700 focus:ring-red-200 dark:focus:ring-red-200',
    options: {
      list: 'absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
      item: 'block truncate',
    },
  },
  feedback: {
    base: 'absolute text-xs -bottom-4',
    valid: 'text-green-600',
    invalid: 'text-red-600',
  },
}
