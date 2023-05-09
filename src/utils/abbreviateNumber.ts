export function abbreviateNumber(number: string | number, fix = 0) {
  if (number === 0) return number

  const inter = typeof number === 'string' ? parseInt(number) : number

  function nFormatter(number: number, divisor: number, unit: string) {
    const div = (number / divisor).toFixed(fix)
    return div + unit
  }

  if (inter >= 1e3 && inter < 1e6) {
    return nFormatter(inter, 1e3, 'k')
  } else if (inter >= 1e6 && inter < 1e9) {
    return nFormatter(inter, 1e6, 'M')
  } else if (inter >= 1e9) {
    return nFormatter(inter, 1e9, 'B')
  } else {
    return nFormatter(inter, 1, '')
  }
}
