import React from 'react'
import { isAddress } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'

import Button from '@/components/Button'
import InputRadio from '@/components/Inputs/InputRadio'

import * as S from './styles'

export enum poolStrategyType {
  YOURSELF = 'yourself',
  OTHER = 'other'
}

interface IPoolStrategyControlProps {
  currentStrategy: string
  handleChangeStrategy: (address: string) => void
}

const PoolStrategyControl = ({
  currentStrategy,
  handleChangeStrategy
}: IPoolStrategyControlProps) => {
  const [selected, setselected] = React.useState(poolStrategyType.YOURSELF)
  const [newAddress, setNewAddress] = React.useState('')

  const [{ wallet }] = useConnectWallet()

  function handleChangeInputValue(event: React.ChangeEvent<HTMLInputElement>) {
    if (!wallet) return

    const value = event.target.value as poolStrategyType
    setselected(value)

    if (value === poolStrategyType.YOURSELF) {
      setNewAddress(wallet.accounts[0].address)
    } else {
      setNewAddress('')
    }
  }

  React.useEffect(() => {
    if (!currentStrategy || !wallet) return

    setNewAddress(currentStrategy)
    if (
      currentStrategy.toLowerCase() === wallet.accounts[0].address.toLowerCase()
    ) {
      setselected(poolStrategyType.YOURSELF)
      return
    }

    setselected(poolStrategyType.OTHER)
  }, [currentStrategy, wallet])

  return (
    <S.PoolStrategy>
      <S.PoolStrategyContainer>
        <S.PoolStrategyTitle>Strategy Setting</S.PoolStrategyTitle>
        <S.PoolSettingParagraph>
          Choose who will be the strategist of the pool. The strategist will
          have the ability to add, remove, and rebalance tokens in the pool. It
          can be you or another wallet.
        </S.PoolSettingParagraph>

        <S.InputsRadioContainer>
          <S.InputsRadioContent>
            <InputRadio
              text="Yourself"
              inputId={poolStrategyType.YOURSELF}
              value={poolStrategyType.YOURSELF}
              inputChecked={selected === poolStrategyType.YOURSELF}
              handleClickInput={handleChangeInputValue}
            />
            <p>You&apos;ll be the owner and strategist of the pool.</p>
          </S.InputsRadioContent>
          <S.InputsRadioContent>
            <InputRadio
              text="Other"
              inputId={poolStrategyType.OTHER}
              value={poolStrategyType.OTHER}
              inputChecked={selected === poolStrategyType.OTHER}
              handleClickInput={handleChangeInputValue}
            />
            <p>
              You&apos;ll be the owner of the pool, and whoever you add as an
              address will act as the strategist.
            </p>
          </S.InputsRadioContent>
        </S.InputsRadioContainer>
      </S.PoolStrategyContainer>

      <S.StrategyAddressContainer isShow={selected === poolStrategyType.OTHER}>
        <S.labelInputAddress>inform the addresses</S.labelInputAddress>

        <S.InputAddressContainer
          isValid={isAddress(newAddress)}
          hasValue={
            newAddress.length > 0 &&
            newAddress.toLowerCase() !== currentStrategy.toLowerCase()
          }
        >
          <input
            id="inputAddress"
            name="inputAddress"
            placeholder="Enter address..."
            value={newAddress}
            onChange={event => setNewAddress(event.target.value)}
            required={selected === poolStrategyType.OTHER}
          />
        </S.InputAddressContainer>
        <S.Error isValid={newAddress.length > 0 ? isAddress(newAddress) : true}>
          Invalid wallet address
        </S.Error>
      </S.StrategyAddressContainer>

      <Button
        text="Update"
        background="secondary"
        fullWidth
        className="updateButton"
        onClick={() => handleChangeStrategy(newAddress)}
        disabledNoEvent={
          newAddress.toLowerCase() === currentStrategy.toLowerCase() ||
          !isAddress(newAddress)
        }
      />
    </S.PoolStrategy>
  )
}

export default PoolStrategyControl
