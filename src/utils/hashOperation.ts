import { AES, mode, pad, format, enc } from 'crypto-js'

const options = {
  mode: mode.ECB,
  padding: pad.Pkcs7
}

const handleEncrypt = (walletAddress: string, privateHash: string) => {
  const privateKey = enc.Hex.parse(privateHash)

  const encryptHash = AES.encrypt(walletAddress, privateKey, {
    ...options,
    format: format.Hex
  })

  return encryptHash.toString()
}

const handleDecrypt = (hash: string, privateHash: string) => {
  const privateKey = enc.Hex.parse(privateHash)
  const cypher = enc.Base64.stringify(enc.Hex.parse(hash))

  const decryptHash = AES.decrypt(cypher, privateKey, options)

  return decryptHash.toString(enc.Utf8)
}

export { handleEncrypt, handleDecrypt }
