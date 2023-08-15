import React from 'react'
import Big from 'big.js'
import { useRouter } from 'next/router'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'

import { networks } from '@/constants/tokenAddresses'
import { useInvestorsAmount } from '@/hooks/query/useInvestorsAmount'

import { useManagerPoolInfo } from '@/hooks/query/useManagerPoolInfo'
import useManagePoolController from '@/hooks/useManagePoolController'

import Button from '@/components/Button'
import InputSearch from '@/components/Inputs/InputSearch'
import Modal from '@/components/Modals/Modal'
import Overlay from '@/components/Overlay'
import ImageProfileWithQuery from '@/components/Governance/ImageProfileWithQuery'
import Checkbox from '@/components/Inputs/Checkbox'

import * as S from './styles'

interface IRemoveInvestorModal {
  onClose: () => void
  addressesList: Array<string>
  setAddressesOfPrivateInvestors: () => Promise<void>
}

const RemoveInvestorModal = ({
  onClose,
  addressesList,
  setAddressesOfPrivateInvestors
}: IRemoveInvestorModal) => {
  const [searchValue, setSearchValue] = React.useState('')
  const [investorsList, setInvestorsList] = React.useState<string[]>([])
  const [isTransaction, setIsTransaction] = React.useState(false)

  const router = useRouter()

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { data } = useInvestorsAmount({
    id: poolId,
    investorsAddresses: addressesList
  })

  const [{ wallet }] = useConnectWallet()
  const [{ connectedChain }, setChain] = useSetChain()
  const { data: poolInfo } = useManagerPoolInfo({
    manager: wallet?.accounts[0].address,
    id: poolId
  })

  const chainId = Number(connectedChain?.id ?? '0x89')

  const { removeAllowedAddresses } = useManagePoolController(
    (poolInfo && poolInfo[0]?.controller) ?? '',
    networks[chainId].rpc
  )

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    if (investorsList.includes(e.target.name)) {
      setInvestorsList(prev => prev.filter(item => item !== e.target.name))
    } else {
      setInvestorsList(prev => [...prev, e.target.name])
    }
  }

  async function handleRemoveInvestors(investorsList: string[]) {
    setIsTransaction(true)

    async function handleSuccess() {
      setIsTransaction(false)
      setInvestorsList([])
      onClose()
      await setAddressesOfPrivateInvestors()
    }

    function handleFail() {
      setIsTransaction(false)
    }

    await removeAllowedAddresses(investorsList, handleSuccess, handleFail, {
      sucess: 'Investors removed!'
    })
  }

  return (
    <S.RemoveInvestorModal>
      <Overlay onClick={onClose} />

      <Modal title="Remove Investor" onCloseModal={onClose}>
        <S.Content>
          <S.Title>inform the addresses you want to add as an investor</S.Title>

          <S.InputWrapper>
            <InputSearch
              name="searchAddress"
              placeholder="Search for address or name"
              value={searchValue}
              onChange={handleSearch}
            />
          </S.InputWrapper>

          <S.Investors>
            <S.TableHeader>
              <S.TableTitle>Investor</S.TableTitle>

              <S.TableTitle>Deposits</S.TableTitle>
            </S.TableHeader>

            {addressesList.map(address => {
              const value = data
                ? data.find(wallet => wallet?.wallet === address)
                : {
                    wallet: '',
                    amount: 0
                  }

              return (
                <S.InvestorContainer key={address}>
                  <Checkbox
                    name={address}
                    label={address}
                    showLabel={false}
                    checked={investorsList.includes(address)}
                    onChange={handleCheckbox}
                  />

                  <ImageProfileWithQuery
                    address={address}
                    diameter={20}
                    hasAddress
                    isLink={false}
                  />

                  <S.Value>$ {Big(value?.amount ?? 0).toFixed(2)}</S.Value>
                </S.InvestorContainer>
              )
            })}
          </S.Investors>

          {poolInfo && poolInfo[0]?.chain_id === chainId ? (
            <>
              {!isTransaction ? (
                <Button
                  text="Remove Investors"
                  background="secondary"
                  fullWidth
                  disabledNoEvent={investorsList.length < 1}
                  onClick={() => handleRemoveInvestors(investorsList)}
                />
              ) : (
                <Button
                  text="Waiting transaction"
                  type="button"
                  background="primary"
                  disabled
                  fullWidth
                />
              )}
            </>
          ) : (
            <>
              {poolInfo && poolInfo[0]?.chain_id && (
                <Button
                  text={`Connect to ${
                    networks[poolInfo[0].chain_id].chainName
                  }`}
                  background="primary"
                  fullWidth
                  type="button"
                  onClick={() =>
                    setChain({
                      chainId: `0x${poolInfo[0].chain_id.toString(16)}`
                    })
                  }
                />
              )}
            </>
          )}
        </S.Content>
      </Modal>
    </S.RemoveInvestorModal>
  )
}

export default RemoveInvestorModal
