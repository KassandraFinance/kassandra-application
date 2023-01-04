import React from 'react'
import FundImage from './FundImage'
import PrivacySetting from './PrivacySetting'

import * as S from './styles'

export type IPrivateAddressListProps = {
  address: string
}

export type IPoolImageProps = {
  image_preview: string,
  image_file: any
}

const PoolSettings = () => {
  const [inputAddress, setInputAddress] = React.useState<string>('')
  const [privateAddressList, setPrivateAddressList] = React.useState<
    IPrivateAddressListProps[]
  >([])
  const [poolPrivacySettings, setPoolPrivacySettings] =
    React.useState<string>('public')
  const [uploadPoolImage, setuploadPoolImage] = React.useState<IPoolImageProps>(
    {
      image_preview: '',
      image_file: null
    }
  )

  function handleAddPrivateAddress() {
    if (privateAddressList.some(wallet => wallet.address === inputAddress))
      return
    setPrivateAddressList([
      ...privateAddressList,
      {
        address: inputAddress
      }
    ])
  }

  return (
    <S.PoolSettings>
      <FundImage
        uploadPoolImage={uploadPoolImage}
        setuploadPoolImage={setuploadPoolImage}
      />

      <PrivacySetting
        inputAddress={inputAddress}
        setInputAddress={setInputAddress}
        privateAddressList={privateAddressList}
        setPrivateAddressList={setPrivateAddressList}
        poolPrivacySettings={poolPrivacySettings}
        setPoolPrivacySettings={setPoolPrivacySettings}
        handleAddPrivateAddress={handleAddPrivateAddress}
      />
    </S.PoolSettings>
  )
}

export default PoolSettings
