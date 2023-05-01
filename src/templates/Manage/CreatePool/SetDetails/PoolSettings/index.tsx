import React from 'react'

import { useAppDispatch } from '../../../../../store/hooks'
import { setPrivateAddress } from '../../../../../store/reducers/poolCreationSlice'

import PoolImage from './PoolImage'
import PrivacySetting from './PrivacySetting'

import * as S from './styles'

export type IPrivateAddressListProps = {
  address: string
}

const PoolSettings = () => {
  const [inputAddress, setInputAddress] = React.useState<string>('')
  const dispatch = useAppDispatch()

  function handleAddPrivateAddress() {
    dispatch(
      setPrivateAddress({
        address: inputAddress
      })
    )
  }

  return (
    <S.PoolSettings>
      <PoolImage />

      <PrivacySetting
        inputAddress={inputAddress}
        setInputAddress={setInputAddress}
        handleAddPrivateAddress={handleAddPrivateAddress}
      />
    </S.PoolSettings>
  )
}

export default PoolSettings
