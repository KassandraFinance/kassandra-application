import Tippy from '@tippyjs/react'
import React from 'react'
import { isAddress } from 'web3-utils'

import {
  IDepositAndManagementFeesProps,
  IIsActiveTogglesProps,
  IRefferalCommissionProps
} from '..'

import InputRange from '../../../../../components/Inputs/InputRange'
import InputText from '../../../../../components/Inputs/InputText'
import InputToggle from '../../../../../components/Inputs/InputToggle'

import * as S from './styles'

type IFeeConfigProps = {
  isActiveToggles: IIsActiveTogglesProps,
  setisActiveToggles: React.Dispatch<
    React.SetStateAction<IIsActiveTogglesProps>
  >,
  depositFee: IDepositAndManagementFeesProps,
  setDepositFee: React.Dispatch<
    React.SetStateAction<IDepositAndManagementFeesProps>
  >,
  refferalCommission: IRefferalCommissionProps,
  setRefferalCommission: React.Dispatch<
    React.SetStateAction<IRefferalCommissionProps>
  >,
  managementFee: IDepositAndManagementFeesProps,
  setManagementFee: React.Dispatch<
    React.SetStateAction<IDepositAndManagementFeesProps>
  >
}
const FeeConfig = ({
  isActiveToggles,
  setisActiveToggles,
  depositFee,
  setDepositFee,
  managementFee,
  setManagementFee,
  refferalCommission,
  setRefferalCommission
}: IFeeConfigProps) => {
  function handleDepositFee(event: React.ChangeEvent<HTMLInputElement>) {
    const inputName = event.target.name
    const inputValue = event.target.value
    const { address, rate } = depositFee

    if (inputName === 'rate') {
      setDepositFee({
        address,
        rate: Number(inputValue)
      })

      isActiveToggles.refferalCommission &&
        setRefferalCommission({
          broker: Number(inputValue) / 2,
          share: Number(inputValue) / 2
        })
    } else {
      setDepositFee({
        address: inputValue,
        rate
      })
    }
  }

  function handleManagementFee(event: React.ChangeEvent<HTMLInputElement>) {
    const { address, rate } = managementFee
    const name = event.target.name
    const value = event.target.value

    let _managementFee = managementFee
    if (name === 'rate') {
      _managementFee = {
        address,
        rate: Number(value)
      }
    } else {
      _managementFee = {
        address: value,
        rate
      }
    }

    setManagementFee(_managementFee)
  }

  // eslint-disable-next-line prettier/prettier
  function handlerefferalCommission(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name
    const value = Number(event.target.value)
    const { rate } = depositFee

    let _refferalCommission = refferalCommission
    if (name === 'broker') {
      _refferalCommission = {
        broker: value,
        share: rate - value
      }
    } else {
      _refferalCommission = {
        broker: rate - value,
        share: value
      }
    }

    setRefferalCommission(_refferalCommission)
  }

  function handleClickToggle(event: React.ChangeEvent<HTMLInputElement>) {
    const inputName = event.target.name
    const { depositFee, managementFee, refferalCommission } = isActiveToggles

    switch (inputName) {
      case 'depositFee':
        setisActiveToggles({
          depositFee: !depositFee,
          refferalCommission: refferalCommission && false,
          managementFee
        })
        break
      case 'refferalCommission':
        setisActiveToggles({
          depositFee,
          managementFee,
          refferalCommission: !refferalCommission
        })
        break
      case 'ManagementFee':
        setisActiveToggles({
          depositFee,
          managementFee: !managementFee,
          refferalCommission
        })
        break
      default:
        break
    }
  }

  return (
    <S.FeeConfig>
      <S.CardWrapper>
        <S.DepositFeeHeader>
          <h3>Deposit fee</h3>
          <InputToggle
            toggleName="depositFee"
            handleToggleChange={handleClickToggle}
          />
        </S.DepositFeeHeader>
        <S.CardWrapperParagraph>
          Receive a percentage of each new deposit in the pool at the selected
          address.
        </S.CardWrapperParagraph>
        {isActiveToggles.depositFee && (
          <>
            <S.WrapperInputFee isAddress={isAddress(depositFee.address)}>
              <InputText
                name="rate"
                type="number"
                placeholder=""
                required
                value={String(depositFee.rate)}
                minLength={0}
                maxLength={50}
                lable="Deposit fee rate (%)"
                error="50% is higher than average and may prevent potential investors. Consider setting a lower fee."
                onChange={event => handleDepositFee(event)}
              />
              <InputText
                name="address"
                type="text"
                placeholder=""
                required
                value={depositFee.address}
                minLength={0}
                maxLength={42}
                lable="recipient address"
                error="Invalid address"
                onChange={event => handleDepositFee(event)}
              />
            </S.WrapperInputFee>
            <hr />
            <S.RefferalCommissionWrapper>
              <S.CardWrapperTitle>Refferal commission</S.CardWrapperTitle>
              <InputToggle
                toggleName="refferalCommission"
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
        {isActiveToggles.refferalCommission && (
          <>
            <S.RefferalCommissionContainer>
              <S.WrapperInputRange>
                <S.InputRangeContent>
                  <p>Broker Commission</p>
                  <InputRange
                    name="broker"
                    InputRangeValue={refferalCommission.broker}
                    handleInputRate={handlerefferalCommission}
                    min={0}
                    max={depositFee.rate}
                    step={0.01}
                  />
                </S.InputRangeContent>
                <S.InputRangeContent>
                  <p>Manager Share</p>
                  <InputRange
                    name="manager"
                    InputRangeValue={refferalCommission.share}
                    handleInputRate={handlerefferalCommission}
                    min={0}
                    max={depositFee.rate}
                    step={0.01}
                  />
                </S.InputRangeContent>
              </S.WrapperInputRange>
            </S.RefferalCommissionContainer>
            <hr />
            <S.TotalDepositFeeContainer>
              <S.TotalDepositFeeTitle>Total Deposit Fee</S.TotalDepositFeeTitle>
              <S.TotalDepositFeePercentage>
                {String(depositFee.rate)}%
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
                {refferalCommission.broker.toFixed(2)}%
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
                {refferalCommission.share.toFixed(2)}%
              </S.BrokerAndManagerPercentage>
            </S.TotalDepositFeeContainer>
          </>
        )}
      </S.CardWrapper>

      <S.CardWrapper>
        <S.ManagementHeader>
          <S.CardWrapperTitle>Management fee</S.CardWrapperTitle>
          <InputToggle
            toggleName="ManagementFee"
            handleToggleChange={handleClickToggle}
          />
        </S.ManagementHeader>
        <S.CardWrapperParagraph>
          Receive a flat fee measured as an annual percent of total assets under
          management. The management fee accrues continuously.
        </S.CardWrapperParagraph>
        {isActiveToggles.managementFee && (
          <>
            <S.WrapperInput isAddress={isAddress(managementFee.address)}>
              <InputText
                name="rate"
                type="number"
                placeholder=""
                required
                value={String(managementFee.rate)}
                minLength={0}
                maxLength={95}
                lable="recipient address"
                error="The rate must be less than 95%"
                onChange={event => handleManagementFee(event)}
              />
              <InputText
                name="address"
                type="text"
                placeholder=""
                required
                value={managementFee.address}
                minLength={42}
                maxLength={42}
                lable="recipient address"
                error="Invalid address"
                onChange={event => handleManagementFee(event)}
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
