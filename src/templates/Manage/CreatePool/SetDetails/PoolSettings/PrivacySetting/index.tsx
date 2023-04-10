import React from 'react'
import Image from 'next/image'
import Tippy from '@tippyjs/react'
import { isAddress } from 'web3-utils'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import {
  setPoolData,
  removePrivateAddress
} from '@/store/reducers/poolCreationSlice'

import substr from '@/utils/substr'

import InputRadio from '../../../../../../components/Inputs/InputRadio'

import closeIcon from '../../../../../../../public/assets/utilities/close-icon.svg'

import * as S from './styles'

interface IPoolSettingsProps {
  inputAddress: string;
  setInputAddress: React.Dispatch<React.SetStateAction<string>>;
  handleAddPrivateAddress: () => void;
}

const PoolSettings = ({
  handleAddPrivateAddress,
  inputAddress,
  setInputAddress
}: IPoolSettingsProps) => {
  const dispatch = useAppDispatch()
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const InputRef = React.useRef<HTMLInputElement>(null)

  const poolData = useAppSelector(state => state.poolCreation.createPoolData)

  function handlePrivateAddress(event: React.ChangeEvent<HTMLInputElement>) {
    setInputAddress(event.target.value)
  }

  function handleClickInput(event: React.ChangeEvent<HTMLInputElement>) {
    const privacy = event.target.value

    dispatch(
      setPoolData({
        privacy: privacy
      })
    )
  }

  React.useEffect(() => {
    if (isAddress(inputAddress) && buttonRef.current !== null) {
      buttonRef.current.focus()
    }
  }, [inputAddress, buttonRef])

  return (
    <S.PrivacySetting
      isOpen={poolData.privacy === 'private'}
      height={
        poolData.privateAddressList && poolData.privateAddressList.length > 0
          ? Math.ceil(poolData.privateAddressList.length / 2) * 4.4 + 3
          : 0
      }
    >
      <S.PoolSettingTitle>Privacy Setting</S.PoolSettingTitle>
      <S.PoolSettingParagraph>
        Choose who can invest in the managed pool you are creating.
      </S.PoolSettingParagraph>

      <S.InputsRadioContainer>
        <S.InputsRadioContent>
          <InputRadio
            text="Public"
            inputId="public"
            value="public"
            inputChecked={poolData.privacy === 'public'}
            handleClickInput={handleClickInput}
          />
          <p>Anyone can invest in the pool.</p>
        </S.InputsRadioContent>
        <S.InputsRadioContent>
          <InputRadio
            text="Private"
            inputId="private"
            value="private"
            inputChecked={poolData.privacy === 'private'}
            handleClickInput={handleClickInput}
          />
          <p>
            Manually select the addresses which can invest in the managed pool.
          </p>
        </S.InputsRadioContent>
      </S.InputsRadioContainer>

      <S.PrivateAddressContainer isShow={poolData.privacy === 'private'}>
        <p>inform the addresses that can invest</p>

        <S.InputAddressContainer
          isValid={isAddress(inputAddress)}
          hasValue={inputAddress.length > 0}
        >
          <input
            form="poolCreationForm"
            id="inputAddress"
            name="inputAddress"
            placeholder="Enter address..."
            value={inputAddress}
            onChange={event => handlePrivateAddress(event)}
            ref={InputRef}
            required={
              poolData.privateAddressList &&
              poolData?.privateAddressList?.length < 1 === true
            }
          />

          {isAddress(inputAddress) && (
            <S.HasAddress>
              {poolData.privateAddressList?.some(
                wallet => wallet.address === inputAddress
              ) ? (
                <p>Wallet address already exists.</p>
              ) : (
                <button
                  ref={buttonRef}
                  onClick={() => {
                    handleAddPrivateAddress(), InputRef.current?.focus()
                  }}
                  onBlur={() => setInputAddress('')}
                >
                  <strong>add:</strong> &quot;{inputAddress}&quot;
                </button>
              )}
            </S.HasAddress>
          )}
        </S.InputAddressContainer>

        <S.Error
          isValid={inputAddress.length > 0 ? isAddress(inputAddress) : true}
        >
          Invalid address.
        </S.Error>
        {poolData.privateAddressList?.length !== 0 && (
          <>
            <S.PrivateAddressList>
              {poolData.privateAddressList &&
                poolData.privateAddressList.map((wallet, index) => {
                  return (
                    <S.PrivateAddress key={wallet.address + index}>
                      <Tippy content={wallet.address}>
                        <p>{substr(wallet.address)}</p>
                      </Tippy>
                      <span
                        onClick={() =>
                          dispatch(removePrivateAddress(wallet.address))
                        }
                      >
                        <Image src={closeIcon} alt="" width={10} height={10} />
                      </span>
                    </S.PrivateAddress>
                  )
                })}
            </S.PrivateAddressList>
            <S.ClosePrivateAddress>
              <button
                onClick={() =>
                  dispatch(setPoolData({ privateAddressList: [] }))
                }
              >
                Clear All
              </button>
            </S.ClosePrivateAddress>
          </>
        )}
      </S.PrivateAddressContainer>
    </S.PrivacySetting>
  )
}

export default PoolSettings
