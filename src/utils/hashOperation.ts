import { AES, mode, pad, format, enc } from 'crypto-js'

// const options = {
//   format: format.Hex
// }

const handleEncrypt = (walletAddress: string, privateHash: string) => {
  const encryptHash = AES.encrypt(walletAddress, privateHash)

  return encryptHash.toString()
}

const handleDecrypt = (hash: string, privateHash: string) => {
  const decryptHash = AES.decrypt(hash, privateHash)

  return decryptHash.toString(enc.Utf8).replaceAll('"', '')
}

export { handleEncrypt, handleDecrypt }
