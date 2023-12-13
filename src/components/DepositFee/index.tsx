import React from 'react'
import Tippy from '@tippyjs/react'
import { isAddress } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'

import InputRange from '../Inputs/InputRange'
import InputText from '../Inputs/InputText'
import InputToggle from '../Inputs/InputToggle'

import * as S from './styles'
import Button from '../Button'
import { overflow } from 'html2canvas/dist/types/css/property-descriptors/overflow'

type FeesData = {
  isChecked: boolean
  feeRate?: string
  brokerCommision?: number
  managerShare?: number
}

interface IDepositFeeProps {
  feesData?: Record<string, FeesData>
  disabledNoEvent?: boolean
  handleClickToggle: (event: any) => void
  handleRefferalCommission: (event: any) => void
  handleFeeChange: (event: any) => void
  handleClickUpdateFee: () => void
}

const DepositFee = ({
  feesData,
  disabledNoEvent,
  handleFeeChange,
  handleClickToggle,
  handleRefferalCommission,
  handleClickUpdateFee
}: IDepositFeeProps) => {
  const [{ wallet }] = useConnectWallet()

  return (
    <S.DepositFee>
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
            isAddress={isAddress(wallet?.accounts[0].address)}
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
            {wallet?.provider ? (
              <InputText
                name="address"
                type="text"
                placeholder={wallet?.accounts[0].address}
                required
                value={wallet?.accounts[0].address}
                minLength={0}
                maxLength={42}
                lable="recipient address"
                error="Invalid address"
                readonly
                onChange={() => {
                  return
                }}
              />
            ) : null}
          </S.WrapperInputFee>
          <hr />
          <S.RefferalCommissionWrapper>
            <S.CardWrapperTitle>Refferal commission</S.CardWrapperTitle>
            <InputToggle
              toggleName="refferalFee"
              isChecked={feesData?.refferalFee?.isChecked}
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
        <>
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
                    handleInputRate={handleRefferalCommission}
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
                    handleInputRate={handleRefferalCommission}
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

          <S.ButtonWrapper showButtons={feesData?.depositFee?.isChecked}>
            <Button
              text="Change Fee"
              background="secondary"
              fullWidth
              onClick={handleClickUpdateFee}
              disabledNoEvent={disabledNoEvent}
            />
          </S.ButtonWrapper>
        </>
      )}
    </S.DepositFee>
  )
}

export default DepositFee
