import React from 'react'
import Image from 'next/image'
import Tippy from '@tippyjs/react'
import { isAddress } from 'web3-utils'
import Big from 'big.js'

import { useAppSelector, useAppDispatch } from '../../../../../store/hooks'
import {
  setToggle,
  setFee,
  setRefferalFee
} from '../../../../../store/reducers/poolCreationSlice'
import { kassandraManagementFee } from '@/constants/tokenAddresses'

import InputRange from '../../../../../components/Inputs/InputRange'
import InputText from '../../../../../components/Inputs/InputText'
import InputToggle from '../../../../../components/Inputs/InputToggle'

import limiterIcon from '../../../../../../public/assets/utilities/limiter.svg'

import * as S from './styles'

const FeeConfig = () => {
  const dispatch = useAppDispatch()
  const feesData = useAppSelector(
    state => state.poolCreation.createPoolData.fees
  )
  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

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

  function handlerefferalCommission(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const name = event.target.name
    const value = parseFloat(event.target.value ? event.target.value : '0')

    dispatch(
      setRefferalFee({
        inputName: name,
        inputValue: value
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

      if (Number(inputValue) > 100) inputValue = '100'
    }

    dispatch(setFee({ inputName: inputName, inputValue: inputValue }))
  }

  function handleClickToggle(event: React.ChangeEvent<HTMLInputElement>) {
    const inputName = event.target.name

    dispatch(setToggle(inputName))
  }

  return (
    <S.FeeConfig>
      <S.CardWrapper>
        <S.DepositFeeHeader>
          <h3>Deposit fee</h3>
          <InputToggle
            toggleName="depositFee"
            isChecked={feesData?.depositFee?.isChecked ?? false}
            handleToggleChange={handleClickToggle}
          />
        </S.DepositFeeHeader>
        <S.CardWrapperParagraph>
          Receive a percentage of each new deposit in the pool at the selected
          address.
        </S.CardWrapperParagraph>
        {feesData?.depositFee && (
          <S.FeeContainer isFeeChecked={feesData.depositFee.isChecked}>
            <S.WrapperInputFee
              className="depositFee"
              isAddress={isAddress(userWalletAddress)}
              value={
                feesData.depositFee.feeRate
                  ? Number(feesData.depositFee.feeRate)
                  : 0
              }
            >
              <InputText
                form="poolCreationForm"
                name="depositFee"
                type="number"
                placeholder=""
                required={feesData.depositFee.isChecked}
                value={
                  feesData.depositFee.feeRate
                    ? feesData.depositFee.feeRate.toString()
                    : '0'
                }
                minLength={0}
                maxLength={94}
                lable="Deposit fee rate (%)"
                error={
                  feesData.depositFee.feeRate &&
                  Number(feesData.depositFee.feeRate) > 50 &&
                  Number(feesData.depositFee.feeRate) < 95
                    ? '50% is higher than average and may prevent potential investors. Consider setting a lower fee.'
                    : 'The rate must be less than 95%'
                }
                onChange={event => handleFeeChange(event)}
              />
              <InputText
                name="address"
                type="text"
                placeholder={userWalletAddress}
                required
                value={userWalletAddress}
                minLength={0}
                maxLength={42}
                lable="recipient address"
                error="Invalid address"
                readonly
                onChange={() => {
                  return
                }}
              />
            </S.WrapperInputFee>
            <hr />
            <S.RefferalCommissionWrapper>
              <S.CardWrapperTitle>Refferal commission</S.CardWrapperTitle>
              <InputToggle
                toggleName="refferalFee"
                isChecked={feesData.refferalFee.isChecked}
                handleToggleChange={handleClickToggle}
              />
            </S.RefferalCommissionWrapper>
            <S.CardWrapperParagraph>
              Allow brokers to receive a share of the deposit fee when they
              complete a sale. If a deposit is made without a refferal, the
              deposit fee goes entirely to the manager.
            </S.CardWrapperParagraph>
          </S.FeeContainer>
        )}
        {feesData?.refferalFee && (
          <S.FeeContainer isFeeChecked={feesData.refferalFee.isChecked}>
            <S.RefferalCommissionContainer>
              <S.WrapperInputRange>
                <S.InputRangeContent>
                  <p>Broker Commission</p>
                  <InputRange
                    form="poolCreationForm"
                    name="brokerCommision"
                    InputRangeValue={
                      feesData.refferalFee.brokerCommision
                        ? feesData.refferalFee.brokerCommision
                        : 0
                    }
                    handleInputRate={handlerefferalCommission}
                    min={0}
                    max={feesData ? Number(feesData.depositFee.feeRate) : 0}
                    step={0.01}
                  />
                </S.InputRangeContent>
                <S.InputRangeContent>
                  <p>Manager Share</p>
                  <InputRange
                    form="poolCreationForm"
                    name="managerShare"
                    InputRangeValue={
                      feesData.refferalFee.managerShare
                        ? feesData.refferalFee.managerShare
                        : 0
                    }
                    handleInputRate={handlerefferalCommission}
                    min={0}
                    max={feesData ? Number(feesData.depositFee.feeRate) : 0}
                    step={0.01}
                  />
                </S.InputRangeContent>
              </S.WrapperInputRange>
            </S.RefferalCommissionContainer>
            <hr />
            <S.TotalDepositFeeContainer>
              <S.TotalDepositFeeTitle>Total Deposit Fee</S.TotalDepositFeeTitle>
              <S.TotalDepositFeePercentage>
                {feesData.depositFee.feeRate}%
              </S.TotalDepositFeePercentage>
              <S.BrokerAndManagerTitle>
                Broker commission
                <Tippy content="#">
                  <img
                    src="/assets/utilities/tooltip.svg"
                    width={15}
                    height={15}
                  />
                </Tippy>
              </S.BrokerAndManagerTitle>
              <S.BrokerAndManagerPercentage>
                {feesData.refferalFee.brokerCommision?.toFixed(2)}%
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
                {feesData.refferalFee.managerShare?.toFixed(2)}%
              </S.BrokerAndManagerPercentage>
            </S.TotalDepositFeeContainer>
          </S.FeeContainer>
        )}
      </S.CardWrapper>

      <S.CardWrapper>
        <S.ManagementHeader>
          <S.CardWrapperTitle>Management fee</S.CardWrapperTitle>
          {
            // <InputToggle
            //   toggleName="managementFee"
            //   isChecked={feesData?.managementFee?.isChecked ?? false}
            //   handleToggleChange={handleClickToggle}
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
              isAddress={isAddress(userWalletAddress)}
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
              <InputText
                name="address"
                type="text"
                placeholder=""
                required
                value={userWalletAddress}
                minLength={42}
                maxLength={42}
                lable="recipient address"
                error="Invalid address"
                readonly
                onChange={() => {
                  return
                }}
              />
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

      {/* <S.CardWrapper>
        <S.WithdrawFeeTitle>
          Withdraw fee | <strong>Always enabled</strong>
        </S.WithdrawFeeTitle>
        <S.CardWrapperParagraph>
          Kassandra DAO charges withdrawal fees with every redemption.
        </S.CardWrapperParagraph>
      </S.CardWrapper> */}
    </S.FeeConfig>
  )
}

export default FeeConfig
