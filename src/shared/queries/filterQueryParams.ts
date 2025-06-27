export const filterQueryParams = (params: {
  [key: string]: string | string[] | undefined | null
}): Record<string, string | string[]> => {
  const filteredParams = Object.entries(params)
    .map((param) => !!param[1] ? param : [])
    .filter((items) => !!items.length)

  return Object.fromEntries(filteredParams)
}