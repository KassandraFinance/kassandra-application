import Big from 'big.js'

/**
 * @brief Pretty print number
 *
 * Pretty prints a number in ISO-30 format with dot as decimal sign, or simply:
 *  - Decimal sign is a dot (.)
 *  - The thousand separator is a non-breaking space
 *
 * @params value: Numeric value in Big to display
 * @params maximumPrecision: Maximum number of decimals `value` should have.
 *         Any digits beyond maximum are gone, needed for cutting decimals
 *         that show up after divisions
 * @params maximumNonZero: Maximum number of non-zero decimal digits to display.
 *         Rightmost zeroes are always removed so the amount of decimal digits
 *         may be less than specified.
 *
 *         - If `value` is _below 1_ this defines the amount of non-zero digits
 *           from the first non-zero from left to right.
 *         - If `value` is _above 1_ this defines the exact amount of decimals
 *           to display, except rightmost zeroes.
 *         - maximumNonZero changes according to the length of the integer part
 *           of the number following the formula `maximumNonZero - int.length + 1`.
 *           This removes decimals because integer part is so big that decimals
 *           start to be irrelevant.
 *
 *         E.g. with maximumNonZero = 4
 *
 *         - `0.0000054321 => 0.000005432`
 *         - `0.000005002  => 0.000005002`
 *         - `0.0000050002 => 0.000005`
 *         - `1.0000054321 => 1`
 *         - `1.2030054321 => 1.203`
 *         - `1.2031       => 1.2031`
 *         - `10.2031      => 10.203`
 *         - `100.2031     => 100.2`
 *         - `1000.2031    => 1 000.2`
 *         - `10000.2031   => 10 000`
 * @params minimumPrecision: Minimum amount of decimal places to show, useful
 *         for always displaying 2 decimal digits for USD (e.g. 2.00)
 *
 * @returns String with the pretty printed number
 */
export function BNtoDecimal(
  value: Big,
  maximumPrecision: number,
  maximumNonZero?: number,
  minimumPrecision?: number
): string {
  const fullNumber = Big(value).toFixed(maximumPrecision)
  const maxPrecision = maximumNonZero || 6
  const minPrecision = minimumPrecision || 0

  let [integer, decimal] = fullNumber.split('.')
  decimal = decimal || ''
  const precision = Math.max(0, maxPrecision + 1 - integer.length)
  const firstNonZero = decimal.length - decimal.replace(/^0+/, '').length

  integer = integer.replace(/(\d)(?=(\d{3})+\b)/g, '$1\u00a0')
  decimal = decimal
    .substring(0, precision ? firstNonZero + precision : minPrecision)
    .replace(/0+$/, '')
    .padEnd(minPrecision, '0')

  return `${integer}${decimal.length > 0 ? '.' : ''}${decimal}`
}

export const wei = Big('10').pow(18)

export function calcChange(
  newPrice: number | string,
  oldPrice: number | string
) {
  const calc = ((Number(newPrice) - Number(oldPrice)) / Number(oldPrice)) * 100
  return calc ? calc.toFixed(2) : '0'
}
