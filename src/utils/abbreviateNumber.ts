export function abbreviateNumber(number: string | number, fix = 0) {
  const inter = typeof number === 'string' ? parseFloat(number) : number

  function nFormatter(divisor: number, unit: string) {
    const div = (inter / divisor).toFixed(fix)
    return div + '\u202F' + unit
  }

  if (inter >= 1e3 && inter < 1e6) {
    return nFormatter(1e3, 'k')
  } else if (inter >= 1e6 && inter < 1e9) {
    return nFormatter(1e6, 'M')
  } else if (inter >= 1e9) {
    return nFormatter(1e9, 'B')
  } else if (inter < 1) {
    return inter.toLocaleString('en-US', {
      maximumSignificantDigits: 5
    })
  }
  return nFormatter(1, '')
}
