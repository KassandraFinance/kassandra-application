function substr(address: string, value = 4) {
  return (
    address.substring(0, value) +
    '....' +
    address.substring(address.length - value, address.length)
  )
}

export default substr
