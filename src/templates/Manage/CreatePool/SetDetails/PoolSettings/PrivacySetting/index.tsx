import React from 'react'
import Image from 'next/image'
import Tippy from '@tippyjs/react'
import { isAddress } from 'web3-utils'

import substr from '../../../../../../utils/substr'

import InputRadio from '../../../../../../components/Inputs/InputRadio'

import closeIcon from '../../../../../../../public/assets/utilities/close-icon.svg'

import { IPrivateAddressListProps } from '..'

import * as S from './styles'

interface IPoolSettingsProps {
  // eslint-disable-next-line prettier/prettier
  setPrivateAddressList: React.Dispatch<React.SetStateAction<IPrivateAddressListProps[]>>;
  privateAddressList: IPrivateAddressListProps[];
  inputAddress: string;
  setInputAddress: React.Dispatch<React.SetStateAction<string>>;
  poolPrivacySettings: string;
  setPoolPrivacySettings: React.Dispatch<React.SetStateAction<string>>;
  handleAddPrivateAddress: () => void;
}

const PoolSettings = ({
  handleAddPrivateAddress,
  inputAddress,
  poolPrivacySettings,
  setInputAddress,
  setPoolPrivacySettings,
  privateAddressList,
  setPrivateAddressList
}: IPoolSettingsProps) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const InputRef = React.useRef<HTMLInputElement>(null)

  function handlePrivateAddress(event: React.ChangeEvent<HTMLInputElement>) {
    setInputAddress(event.target.value)
  }

  function handleClickInput(event: React.ChangeEvent<HTMLInputElement>) {
    setPoolPrivacySettings(event.target.value)
  }

  React.useEffect(() => {
    if (isAddress(inputAddress) && buttonRef.current !== null) {
      buttonRef.current.focus()
    }
  }, [inputAddress, buttonRef])

  return (
    <S.PrivacySetting>
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
            inputChecked={poolPrivacySettings === 'public'}
            handleClickInput={handleClickInput}
          />
          <p>Anyone can invest in the pool.</p>
        </S.InputsRadioContent>
        <S.InputsRadioContent>
          <InputRadio
            text="Private"
            inputId="private"
            value="private"
            inputChecked={poolPrivacySettings === 'private'}
            handleClickInput={handleClickInput}
          />
          <p>
            Manually select the addresses which can invest in the managed pool.
          </p>
        </S.InputsRadioContent>
      </S.InputsRadioContainer>

      {poolPrivacySettings === 'private' && (
        <S.PrivateAddressContainer>
          <p>inform the addresses that can invest</p>

          <S.InputAddressContainer>
            <input
              placeholder="Enter address..."
              value={inputAddress}
              onChange={event => handlePrivateAddress(event)}
              ref={InputRef}
            />
            {isAddress(inputAddress) && (
              <S.HasAddress>
                {privateAddressList.some(
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
          <S.PrivateAddressList>
            {privateAddressList &&
              privateAddressList.map((wallet, index) => {
                return (
                  <S.PrivateAddress key={wallet.address + index}>
                    <Tippy content={wallet.address}>
                      <p>{substr(wallet.address)}</p>
                    </Tippy>
                    <span
                      onClick={() =>
                        setPrivateAddressList(
                          privateAddressList.filter(
                            wallett => wallett.address !== wallet.address
                          )
                        )
                      }
                    >
                      <Image src={closeIcon} alt="" width={10} height={10} />
                    </span>
                  </S.PrivateAddress>
                )
              })}
          </S.PrivateAddressList>
          {privateAddressList?.length !== 0 && (
            <S.ClosePrivateAddress>
              <button onClick={() => setPrivateAddressList([])}>
                Clear All
              </button>
            </S.ClosePrivateAddress>
          )}
        </S.PrivateAddressContainer>
      )}
    </S.PrivacySetting>
  )
}

export default PoolSettings
