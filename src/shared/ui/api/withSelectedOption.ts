type TOption = {
  value: string
  label: string
  subLabel?: string
}

export const withSelectedOptions = (
  options: Array<TOption>,
  selectedOptions: Array<TOption>
) => {
  const unionOptions = options.concat(selectedOptions)

  const uniqueOptions = unionOptions.reduce((list, item) => {
    list[item.value] = item

    return list
  }
  , <{[key: string]: TOption}>{})

  return Object.values(uniqueOptions)
}