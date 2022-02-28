export const removeKeyFromObject = (
  object: Record<string, unknown>,
  keyToRemove: string
) => {
  if (Object.keys(object).length === 0) {
    return null
  }

  return Object.keys(object).reduce((accumulator, key) => {
    if (typeof object[key] === 'object') {
      accumulator[key] = removeKeyFromObject(
        object[key] as Record<string, unknown>,
        keyToRemove
      )
    } else if (key !== keyToRemove) {
      accumulator[key] = object[key]
    }
    return accumulator
  }, {})
}
