export const schema = obj => Object.keys(obj).reduce(
  (acc, key) => ({ ...acc, [key]: { type: obj[key] } }), {},
)