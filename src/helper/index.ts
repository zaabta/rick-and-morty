export const getData = async (url: string) => {
  try {
    const res = await fetch(url)
    const json = await res.json()
    return json
  } catch (err) {
    console.log('Error -> ', err)
  }
}

export const removeDuplicates = (array: any[], propertyName: string) => {
  return array.filter(
    (obj, index, self) =>
      index === self.findIndex((o) => o[propertyName] === obj[propertyName]),
  )
}
