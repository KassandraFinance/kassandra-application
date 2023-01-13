import Tippy from '@tippyjs/react'
import React from 'react'
import { isAddress } from 'web3-utils'

import { useAppSelector, useAppDispatch } from '../../../../../store/hooks'
import {
  setToggle,
  setFee,
  setRefferalFee
} from '../../../../../store/reducers/poolCreationSlice'

import InputRange from '../../../../../components/Inputs/InputRange'
import InputText from '../../../../../components/Inputs/InputText'
import InputToggle from '../../../../../components/Inputs/InputToggle'

import * as S from './styles'

const FeeConfig = () => {
  const dispatch = useAppDispatch()
  const feesData = useAppSelector(
    state => state.poolCreation.createPoolData.fees
  )
  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  function handleFeeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputName = event.target.name
    const inputValue = event.target.value

    dispatch(setFee({ inputName: inputName, inputValue: Number(inputValue) }))
  }

  function handlerefferalCommission(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const name = event.target.name
    const value = parseFloat(event.target.value)

    dispatch(
      setRefferalFee({
        inputName: name,
        inputValue: value
      })
    )
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
        {feesData?.depositFee?.isChecked && (
          <>
            <S.WrapperInputFee
              className="depositFee"
              isAddress={isAddress(userWalletAddress)}
              value={
                feesData.depositFee.feeRate ? feesData.depositFee.feeRate : 0
              }
            >
              <InputText
                name="depositFee"
                type="number"
                placeholder=""
                required
                value={
                  feesData.depositFee.feeRate
                    ? feesData.depositFee.feeRate.toString()
                    : '0'
                }
                minLength={0}
                maxLength={95}
                lable="Deposit fee rate (%)"
                error="50% is higher than average and may prevent potential investors. Consider setting a lower fee."
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
          </>
        )}
        {feesData?.refferalFee?.isChecked && (
          <>
            <S.RefferalCommissionContainer>
              <S.WrapperInputRange>
                <S.InputRangeContent>
                  <p>Broker Commission</p>
                  <InputRange
                    name="brokerCommision"
                    InputRangeValue={
                      feesData.refferalFee.brokerCommision
                        ? feesData.refferalFee.brokerCommision
                        : 0
                    }
                    handleInputRate={handlerefferalCommission}
                    min={0}
                    max={feesData ? feesData.depositFee.feeRate : 0}
                    step={0.01}
                  />
                </S.InputRangeContent>
                <S.InputRangeContent>
                  <p>Manager Share</p>
                  <InputRange
                    name="managerShare"
                    InputRangeValue={
                      feesData.refferalFee.managerShare
                        ? feesData.refferalFee.managerShare
                        : 0
                    }
                    handleInputRate={handlerefferalCommission}
                    min={0}
                    max={feesData ? feesData.depositFee.feeRate : 0}
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
          </>
        )}
      </S.CardWrapper>

      <S.CardWrapper>
        <S.ManagementHeader>
          <S.CardWrapperTitle>Management fee</S.CardWrapperTitle>
          <InputToggle
            toggleName="managementFee"
            isChecked={feesData?.managementFee?.isChecked ?? false}
            handleToggleChange={handleClickToggle}
          />
        </S.ManagementHeader>
        <S.CardWrapperParagraph>
          Receive a flat fee measured as an annual percent of total assets under
          management. The management fee accrues continuously.
        </S.CardWrapperParagraph>
        {feesData?.managementFee?.isChecked && (
          <>
            <S.WrapperInput
              isAddress={isAddress(userWalletAddress)}
              value={
                feesData.depositFee.feeRate ? feesData.depositFee.feeRate : 0
              }
            >
              <InputText
                name="managementFee"
                type="number"
                placeholder=""
                required
                value={
                  feesData.managementFee.feeRate
                    ? feesData.managementFee.feeRate.toString()
                    : '0'
                }
                minLength={0}
                maxLength={95}
                lable="recipient address"
                error="The rate must be less than 95%"
                onChange={event => handleFeeChange(event)}
              />
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
          </>
        )}
      </S.CardWrapper>

      <S.CardWrapper>
        <S.WithdrawFeeTitle>
          Withdraw fee | <strong>Always enabled</strong>
        </S.WithdrawFeeTitle>
        <S.CardWrapperParagraph>
          Kassandra DAO charges withdrawal fees with every redemption.
        </S.CardWrapperParagraph>
      </S.CardWrapper>
    </S.FeeConfig>
  )
}

export default FeeConfig
