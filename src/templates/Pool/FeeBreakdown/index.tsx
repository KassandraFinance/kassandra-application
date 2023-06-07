import React from 'react'
import Image from 'next/image'
import Big from 'big.js'

import iconBar from '@assets/iconGradient/product-bar.svg'

import * as S from './styles'

interface IFeeBreakdownProps {
  feeJoinBroker: string
  feeJoinManager: string
  feeAum: string
  feeAumKassandra: string
  withdrawFee: string
}

const FeeBreakdown = ({
  feeAum,
  feeAumKassandra,
  feeJoinManager,
  feeJoinBroker,
  withdrawFee
}: IFeeBreakdownProps) => {
  const [isDepositFee, setIsDepositFee] = React.useState(false)
  const [isManagementFee, setIsManagementFee] = React.useState(false)

  return (
    <S.FeeBreakdown>
      <S.Title>
        <Image src={iconBar} alt="" width={18} height={18} />
        <h2>Fee Breakdown</h2>
      </S.Title>

      <S.FeesContainer>
        <S.Container>
          <S.FeeContainer>
            <S.TitleWrapper>
              <S.FeeName>Deposit Fee</S.FeeName>

              <S.OpenBtn
                isCollapsed={isDepositFee}
                onClick={() => setIsDepositFee(!isDepositFee)}
              >
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.92479 6.87296C10.2982 7.22499 10.8815 7.22467 11.2545 6.87224C11.6592 6.48996 11.6592 5.84607 11.2545 5.46379L6 0.5L0.745468 5.46379C0.340798 5.84607 0.340798 6.48996 0.745469 6.87224C1.11855 7.22467 1.70175 7.22499 2.07521 6.87296L6 3.17341L9.92479 6.87296Z"
                    fill="#FCFCFC"
                  />
                </svg>
              </S.OpenBtn>
            </S.TitleWrapper>

            <S.FeeValue>
              {Big(feeJoinManager || '0')
                .add(feeJoinBroker || '0')
                .mul(100)
                .toFixed(2)}
              %
            </S.FeeValue>
          </S.FeeContainer>

          <S.FeeSmallContainer isCollapsed={isDepositFee}>
            <S.FeeContainer>
              <S.FeeSmall>Broker commission</S.FeeSmall>

              <S.FeeValueSmall>
                {Big(feeJoinBroker || '0')
                  .mul(100)
                  .toFixed(2)}
                %
              </S.FeeValueSmall>
            </S.FeeContainer>

            <S.FeeContainer>
              <S.FeeSmall>Manager share</S.FeeSmall>

              <S.FeeValueSmall>
                {Big(feeJoinManager || '0')
                  .mul(100)
                  .toFixed(2)}
                %
              </S.FeeValueSmall>
            </S.FeeContainer>
          </S.FeeSmallContainer>
        </S.Container>

        <S.Line />

        <S.Container>
          <S.FeeContainer>
            <S.TitleWrapper>
              <S.FeeName>Management Fee</S.FeeName>

              <S.OpenBtn
                isCollapsed={isManagementFee}
                onClick={() => setIsManagementFee(!isManagementFee)}
              >
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.92479 6.87296C10.2982 7.22499 10.8815 7.22467 11.2545 6.87224C11.6592 6.48996 11.6592 5.84607 11.2545 5.46379L6 0.5L0.745468 5.46379C0.340798 5.84607 0.340798 6.48996 0.745469 6.87224C1.11855 7.22467 1.70175 7.22499 2.07521 6.87296L6 3.17341L9.92479 6.87296Z"
                    fill="#FCFCFC"
                  />
                </svg>
              </S.OpenBtn>
            </S.TitleWrapper>

            <S.FeeValue>
              {Big(feeAum || '0')
                .mul(100)
                .toFixed(2)}
              %
            </S.FeeValue>
          </S.FeeContainer>

          <S.FeeSmallContainer isCollapsed={isManagementFee}>
            <S.FeeContainer>
              <S.FeeSmall>KASSANDRA SHARE</S.FeeSmall>

              <S.FeeValueSmall>
                {Big(feeAumKassandra || '0')
                  .mul(100)
                  .toFixed(2)}
                %
              </S.FeeValueSmall>
            </S.FeeContainer>

            <S.FeeContainer>
              <S.FeeSmall>Manager share</S.FeeSmall>

              <S.FeeValueSmall>
                {Big(feeAum || '0')
                  .sub(feeAumKassandra)
                  .mul(100)
                  .toFixed(2)}
                %
              </S.FeeValueSmall>
            </S.FeeContainer>
          </S.FeeSmallContainer>
        </S.Container>

        <S.Line />

        <S.Container>
          <S.FeeContainer>
            <S.FeeName>Withdrawal Fee</S.FeeName>

            <S.FeeValue>
              {Big(withdrawFee || '0')
                .mul(100)
                .toFixed(2)}
              %
            </S.FeeValue>
          </S.FeeContainer>
        </S.Container>
      </S.FeesContainer>
    </S.FeeBreakdown>
  )
}

export default FeeBreakdown
