/* eslint-disable max-len */
export default {
  base: 'bg-primary relative inline-flex flex-shrink-0 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
  checked: 'opacity-100 hover:opacity-90',
  unchecked: 'opacity-50 hover:opacity-75',
  size: {
    sm: 'h-4 w-8',
    md: 'h-6 w-12',
    lg: 'h-8 w-16',
  },
  switch: {
    base: 'border bg-white rounded-full shadow-sm transform-gpu transition-translate duration-150',
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
    },
    translate: {
      sm: 'translate-x-4',
      md: 'translate-x-6',
      lg: 'translate-x-8',
    },
  },
}
