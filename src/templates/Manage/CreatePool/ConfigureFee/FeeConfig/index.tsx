import React from 'react'
import Image from 'next/image'
import Tippy from '@tippyjs/react'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'
import { isAddress } from 'ethers'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import {
  setToggle,
  setFee,
  setRefferalFee
} from '@/store/reducers/poolCreationSlice'
import { kassandraManagementFee } from '@/constants/tokenAddresses'

import InputRange from '@/components/Inputs/InputRange'
import InputText from '@/components/Inputs/InputText'
import DepositFee from '@/components/DepositFee'

import limiterIcon from '@assets/utilities/limiter.svg'

import * as S from './styles'

const FeeConfig = () => {
  const [{ wallet }] = useConnectWallet()

  const dispatch = useAppDispatch()
  const feesData = useAppSelector(
    state => state.poolCreation.createPoolData.fees
  )

  function handleFeeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputName = event.target.name
    let inputValue = event.target.value

    if (inputValue.length > 0) {
      inputValue = inputValue.replace(/^0+/, '')

      const [value, decimals] = inputValue.split('.')
      if (decimals && decimals.length > 1) {
        inputValue = `${value}.${decimals.slice(0, 1)}`
      }

      if (Number(inputValue) > 100) inputValue = '100'
    }

    dispatch(setFee({ inputName: inputName, inputValue: inputValue }))
  }

  function handleRefferalCommission(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const name = event.target.name
    const value = parseFloat(event.target.value ? event.target.value : '0')

    dispatch(
      setRefferalFee({
        inputName: name,
        inputValue: parseFloat(value.toFixed(2))
      })
    )
  }

  function handleManagementFee(event: React.ChangeEvent<HTMLInputElement>) {
    const inputName = event.target.name
    let inputValue = event.target.value

    if (inputValue.length > 0) {
      inputValue = inputValue.replace(/^0+/, '')

      const [value, decimals] = inputValue.split('.')
      if (decimals && decimals.length > 1) {
        inputValue = `${value}.${decimals.slice(0, 1)}`
      }

      if (Number(inputValue) > 9.5) inputValue = '9.5'
    }

    dispatch(setFee({ inputName: inputName, inputValue: inputValue }))
  }

  function handleToggleClick(event: React.ChangeEvent<HTMLInputElement>) {
    const inputName = event.target.name

    dispatch(setToggle(inputName))
  }

  return (
    <S.FeeConfig>
      <DepositFee
        feesData={feesData}
        handleFeeChange={handleFeeChange}
        handleToggleClick={handleToggleClick}
        handleReferralCommission={handleRefferalCommission}
      />

      <S.CardWrapper>
        <S.ManagementHeader>
          <S.CardWrapperTitle>Management fee</S.CardWrapperTitle>
          {
            // <InputToggle
            //   toggleName="managementFee"
            //   isChecked={feesData?.managementFee?.isChecked ?? false}
            //   handleToggleChange={handleToggleClick}
            // />
          }
        </S.ManagementHeader>
        <S.CardWrapperParagraph>
          Receive a flat fee measured as an annual percent of total assets under
          management. The management fee accrues continuously.
        </S.CardWrapperParagraph>
        {feesData?.managementFee && (
          <S.FeeContainer>
            <S.WrapperInput
              isAddress={isAddress(wallet?.accounts[0].address)}
              value={
                feesData.managementFee.feeRate
                  ? Number(feesData.managementFee.feeRate)
                  : 0
              }
            >
              <div>
                <S.FeeTitleContainer>
                  <S.FeeTitle>Kassandra Share</S.FeeTitle>
                  <S.FeeTitle>Manager Share</S.FeeTitle>
                </S.FeeTitleContainer>
                <S.ManagementFeeWrapper>
                  <InputText
                    name="kassandraShare"
                    type="text"
                    placeholder="Kassandra Share"
                    required
                    value={kassandraManagementFee}
                    minLength={42}
                    maxLength={42}
                    lable=""
                    error="Invalid address"
                    readonly
                    onChange={() => {
                      return
                    }}
                  />

                  <S.Wrapper>
                    <S.LimiterWrapper>
                      <Image src={limiterIcon} />
                    </S.LimiterWrapper>
                    <InputRange
                      form="poolCreationForm"
                      name="managementFee"
                      min={0}
                      max={9.5}
                      step={0.01}
                      InputRangeValue={
                        feesData.managementFee.feeRate
                          ? Number(feesData.managementFee.feeRate)
                          : 0
                      }
                      handleInputRate={handleManagementFee}
                    />
                  </S.Wrapper>
                </S.ManagementFeeWrapper>
              </div>
              {wallet?.provider ? (
                <InputText
                  name="address"
                  type="text"
                  placeholder=""
                  required
                  value={wallet?.accounts[0].address}
                  minLength={42}
                  maxLength={42}
                  lable="recipient address"
                  error="Invalid address"
                  readonly
                  onChange={() => {
                    return
                  }}
                />
              ) : null}
            </S.WrapperInput>

            <hr />

            <S.TotalDepositFeeContainer>
              <S.TotalDepositFeeTitle>
                Total Management Fee
              </S.TotalDepositFeeTitle>
              <S.TotalDepositFeePercentage>
                {Big(feesData?.managementFee?.feeRate || 0)
                  .add(kassandraManagementFee)
                  .toFixed(2)}
                %
              </S.TotalDepositFeePercentage>
              <S.BrokerAndManagerTitle>
                Kassandra Share
                <Tippy content="#">
                  <img
                    src="/assets/utilities/tooltip.svg"
                    width={15}
                    height={15}
                  />
                </Tippy>
              </S.BrokerAndManagerTitle>
              <S.BrokerAndManagerPercentage>
                {Big(kassandraManagementFee).toFixed(2)}%
              </S.BrokerAndManagerPercentage>
              <S.BrokerAndManagerTitle>
                Manager share
                <Tippy content="#">
                  <img
                    src="/assets/utilities/tooltip.svg"
                    width={15}
                    height={15}
                  />
                </Tippy>
              </S.BrokerAndManagerTitle>
              <S.BrokerAndManagerPercentage>
                {Big(feesData?.managementFee?.feeRate || 0).toFixed(2)}%
              </S.BrokerAndManagerPercentage>
            </S.TotalDepositFeeContainer>
          </S.FeeContainer>
        )}
      </S.CardWrapper>
    </S.FeeConfig>
  )
}

export default FeeConfig
