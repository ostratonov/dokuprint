export const isNumber = value => value !== null && !isNaN(value)

export const round = (number, accuracy = 10) => {
  const decimal = isNumber(accuracy) ? accuracy * 10 : 1

  return isNumber(number) ? Math.round(number * decimal) / decimal : 0
}