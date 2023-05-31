import React from 'react'
import Big from 'big.js'
import useSWR from 'swr'
import { getAddress } from 'ethers'
import { useRouter } from 'next/router'
import { request } from 'graphql-request'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'

import { GET_INVESTORS_AMOUNT } from './graphql'
import { BACKEND_KASSANDRA, networks } from '@/constants/tokenAddresses'

import usePoolInfo from '@/hooks/usePoolInfo'
import useManagePool from '@/hooks/useManagePoolEthers'

import Button from '@/components/Button'
import InputSearch from '@/components/Inputs/InputSearch'
import Modal from '@/components/Modals/Modal'
import Overlay from '@/components/Overlay'
import ImageProfile from '@/components/Governance/ImageProfile'
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

  const { data } = useSWR([GET_INVESTORS_AMOUNT], query =>
    request(BACKEND_KASSANDRA, query, {
      id: poolId,
      investorsAddresses: addressesList
    })
  )

  const [{ wallet }] = useConnectWallet()
  const [{ connectedChain }, setChain] = useSetChain()
  const { poolInfo } = usePoolInfo(
    wallet ? getAddress(wallet.accounts[0].address) : '',
    poolId
  )
  const { removeAllowedAddresses } = useManagePool(poolInfo?.controller ?? '')

  const chainId = parseInt(connectedChain?.id ?? '0x89', 16)

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
                ? data.investors.find(
                    (wallet: any) => wallet?.wallet === address
                  )
                : 0

              return (
                <S.InvestorContainer key={address}>
                  <Checkbox
                    name={address}
                    label={address}
                    showLabel={false}
                    checked={investorsList.includes(address)}
                    onChange={handleCheckbox}
                  />

                  <ImageProfile
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

          {poolInfo?.chain_id === chainId ? (
            <>
              {!isTransaction ? (
                <Button
                  text="Remove Investors"
                  backgroundSecondary
                  fullWidth
                  disabledNoEvent={investorsList.length < 1}
                  onClick={() => handleRemoveInvestors(investorsList)}
                />
              ) : (
                <Button
                  text="Waiting transaction"
                  type="button"
                  backgroundPrimary
                  disabled
                  fullWidth
                />
              )}
            </>
          ) : (
            <>
              {poolInfo?.chain_id && (
                <Button
                  text={`Connect to ${networks[poolInfo.chain_id].chainName}`}
                  backgroundPrimary
                  fullWidth
                  type="button"
                  onClick={() =>
                    setChain({ chainId: `0x${poolInfo.chain_id.toString(16)}` })
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
