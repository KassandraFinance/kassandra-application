import Big from 'big.js'

export function BNtoDecimal(
  value: Big,
  maximumPrecision: number,
  maximumNonZero?: number,
  minimumPrecision?: number
) {
  const fullNumber = Big(value).toFixed(maximumPrecision)
  const maxPrecision = maximumNonZero || 6
  const minPrecision = minimumPrecision || 0

  let [integer, decimal] = fullNumber.split('.')
  decimal = decimal || ''
  const precision = Math.max(0, maxPrecision + 1 - integer.length)
  const firstNonZero = decimal.length - decimal.replace(/^0+/, '').length

  integer = integer.replace(/(\d)(?=(\d{3})+\b)/g, '$1\u00a0')
  decimal = decimal
    .substring(0, precision ? firstNonZero + precision : 0)
    .replace(/0+$/, '')
    .padEnd(precision ? minPrecision : 0, '0')

  return `${integer}${decimal.length > 0 ? '.' : ''}${decimal}`
}

export const wei = Big('10').pow(18)

export function calcChange(newPrice: number, oldPrice: number) {
  const calc = ((newPrice - oldPrice) / oldPrice) * 100
  return calc ? calc.toFixed(2) : '0'
}
