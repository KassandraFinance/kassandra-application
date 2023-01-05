import React from 'react'

import { useAppDispatch } from '../../../../../store/hooks'
import { setPrivateAddress } from '../../../../../store/reducers/poolCreationSlice'

import FundImage from './FundImage'
import PrivacySetting from './PrivacySetting'

import * as S from './styles'

export type IPrivateAddressListProps = {
  address: string
}

const PoolSettings = () => {
  const dispatch = useAppDispatch()

  const [inputAddress, setInputAddress] = React.useState<string>('')

  function handleAddPrivateAddress() {
    dispatch(
      setPrivateAddress({
        address: inputAddress
      })
    )
  }

  return (
    <S.PoolSettings>
      <FundImage />

      <PrivacySetting
        inputAddress={inputAddress}
        setInputAddress={setInputAddress}
        handleAddPrivateAddress={handleAddPrivateAddress}
      />
    </S.PoolSettings>
  )
}

export default PoolSettings
