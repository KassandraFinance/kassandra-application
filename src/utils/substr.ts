function substr(address: string, length = 4) {
  return (
    address.substring(0, length) +
    '....' +
    address.substring(address.length - length, address.length)
  )
}

export default substr
