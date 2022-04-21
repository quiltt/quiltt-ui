export const parseError = (errors: { [x: string]: any }, name: string) => {
  const error = Array.isArray(errors[name])
    ? (errors[name] as string[]).join(', ')
    : // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (errors[name]?.message as string) || (errors[name] as string)
  return error
}
