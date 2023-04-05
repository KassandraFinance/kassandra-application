import React from 'react'
import { useRouter } from 'next/router'
import { AbiItem } from 'web3-utils'

import web3 from '@/utils/web3'
import waitTransaction, { MetamaskError } from '@/utils/txWait'
import changeChain from '@/utils/changeChain'
import { networks } from '@/constants/tokenAddresses'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setModalAlertText } from '@/store/reducers/modalAlertText'
import usePoolInfo from '@/hooks/usePoolInfo'

import KassandraControlerAbi from '@/constants/abi/KassandraController.json'

import Button from '@/components/Button'
import InputSearch from '@/components/Inputs/InputSearch'
import Modal from '@/components/Modals/Modal'
import Overlay from '@/components/Overlay'
import ImageProfile from '@/components/Governance/ImageProfile'
import Checkbox from '@/components/Inputs/Checkbox'
import { ToastSuccess } from '@/components/Toastify/toast'

import * as S from './styles'

interface IRemoveInvestorModal {
  onClose: () => void;
}

const addressesList = [
  '0xb602db4ddaa85b2f8495dbA4Fe6a9950178047cA',
  '0xD581d597dBc574A458d469A62Fb5a07A625Edf73'
]

const RemoveInvestorModal = ({ onClose }: IRemoveInvestorModal) => {
  const [searchValue, setSearchValue] = React.useState('')
  const [investorsList, setInvestorsList] = React.useState<string[]>([])
  const [isTransaction, setIsTransaction] = React.useState(false)

  const dispatch = useAppDispatch()
  const router = useRouter()

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const chainId = useAppSelector(state => state.chainId)

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

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

  async function callBack(error: MetamaskError, txHash: string) {
    if (error) {
      if (error.code === 4001) {
        dispatch(setModalAlertText({ errorText: `Approval cancelled` }))

        setIsTransaction(false)
        return false
      }

      dispatch(
        setModalAlertText({
          errorText: error.message
        })
      )

      setIsTransaction(false)
      return false
    }

    const txReceipt = await waitTransaction(txHash)

    if (txReceipt.status) {
      ToastSuccess("Investors removed!")
      setIsTransaction(false)
      setInvestorsList([])

      return true
    } else {
      dispatch(
        setModalAlertText({
          errorText: 'Transaction reverted'
        })
      )

      setIsTransaction(false)

      return false
    }
  }

  async function handleRemoveInvestors(poolControler: string, investorsList: string[]) {
    setIsTransaction(true)
    // eslint-disable-next-line prettier/prettier
    const controller = new web3.eth.Contract((KassandraControlerAbi as unknown) as AbiItem, poolControler)

      await controller.methods.removeAllowedAddresses(investorsList).send({
        from: userWalletAddress
      }, callBack)
  }

  const { poolInfo } = usePoolInfo(userWalletAddress, poolId)

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

            {addressesList.map(address => (
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

                <S.Value>$ 3,4567</S.Value>
              </S.InvestorContainer>
            ))}
          </S.Investors>

          {poolInfo?.chainId === chainId ? (
            <>
            {!isTransaction ?
              <Button text="Remove Investors"
                backgroundSecondary
                fullWidth
                disabledNoEvent={investorsList.length < 1}
                onClick={() => handleRemoveInvestors(poolInfo.controller, investorsList)}
              />
              :
              <Button
                text='Waiting transaction'
                type='button'
                backgroundPrimary 
                disabled
                fullWidth
              />
            }
            </>
          ) : (
            <>
              {poolInfo?.chainId && (
                <Button
                  text={`Connect to ${networks[poolInfo.chainId].chainName}`}
                  backgroundPrimary
                  fullWidth
                  type="button"
                  onClick={() =>
                    changeChain({
                      chainId: networks[poolInfo.chainId].chainId,
                      chainName: networks[poolInfo.chainId].chainName,
                      rpcUrls: [networks[poolInfo.chainId].rpc]
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
