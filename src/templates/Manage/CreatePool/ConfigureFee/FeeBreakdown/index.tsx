import Link from 'next/link'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'

import { useAppSelector } from '@/store/hooks'
import { kassandraManagementFee } from '@/constants/tokenAddresses'

import substr from '@/utils/substr'

import * as S from './styles'

const FeeBreakdown = () => {
  const [{ wallet }] = useConnectWallet()

  const feesData = useAppSelector(
    state => state.poolCreation.createPoolData.fees
  )

  return (
    <S.FeeBreakdown>
      <S.FeeBreakdownContainer>
        <h3>Fee Breakdown</h3>
        <hr />
        <S.ReviewListContainer>
          <S.ReviewListContent>
            <S.FeeBreakdownTitle>Deposit fee</S.FeeBreakdownTitle>
            <S.FeeBreakdownPorcentage>
              {feesData?.depositFee.feeRate ? feesData.depositFee.feeRate : 0}%
            </S.FeeBreakdownPorcentage>
          </S.ReviewListContent>
          {feesData?.refferalFee.isChecked && (
            <>
              <S.ReviewListContent>
                <S.FeeBreakdownParagraph>
                  Broker commission
                </S.FeeBreakdownParagraph>
                <S.FeeBreakdownParagraph>
                  {feesData.refferalFee.brokerCommision?.toFixed(2)}%
                </S.FeeBreakdownParagraph>
              </S.ReviewListContent>
              <S.ReviewListContent>
                <S.FeeBreakdownParagraph>Manager share</S.FeeBreakdownParagraph>
                <S.FeeBreakdownParagraph>
                  {feesData.refferalFee.managerShare?.toFixed(2)}%
                </S.FeeBreakdownParagraph>
              </S.ReviewListContent>
            </>
          )}
          {feesData?.depositFee.isChecked && (
            <S.ReviewListContent>
              <S.FeeBreakdownParagraph>
                Recipient address
              </S.FeeBreakdownParagraph>
              {wallet?.provider ? (
                <Link
                  href={`https://polygonscan.com/address/${wallet?.accounts[0].address}`}
                  passHref
                >
                  <S.FeeBreakdownAdress target="_blank">
                    {substr(wallet?.accounts[0].address)}
                    <img
                      src="/assets/utilities/go-to-site.svg"
                      alt=""
                      width={15}
                      height={15}
                    />
                  </S.FeeBreakdownAdress>
                </Link>
              ) : (
                <p>-</p>
              )}
            </S.ReviewListContent>
          )}
        </S.ReviewListContainer>
        <hr />
        <S.ReviewListContainer>
          <S.ReviewListContent>
            <S.FeeBreakdownTitle>Management Fee</S.FeeBreakdownTitle>
            <S.FeeBreakdownPorcentage>
              {Big(feesData?.managementFee.feeRate || 0)
                .add(kassandraManagementFee)
                .toFixed(2)}
              %
            </S.FeeBreakdownPorcentage>
          </S.ReviewListContent>
          {feesData?.managementFee && (
            <S.ReviewListContent>
              <S.FeeBreakdownParagraph>
                Recipient address
              </S.FeeBreakdownParagraph>
              {wallet?.provider ? (
                <Link
                  href={`https://polygonscan.com/address/${wallet.accounts[0].address}`}
                  passHref
                >
                  <S.FeeBreakdownAdress target="_blank">
                    {substr(wallet.accounts[0].address)}
                    <img
                      src="/assets/utilities/go-to-site.svg"
                      alt=""
                      width={15}
                      height={15}
                    />
                  </S.FeeBreakdownAdress>
                </Link>
              ) : (
                <p>-</p>
              )}
            </S.ReviewListContent>
          )}
        </S.ReviewListContainer>
        {/* <hr />
        <S.ReviewListContainer>
          <S.ReviewListContent>
            <S.FeeBreakdownTitle>
              withdraw Fee{' '}
              <Tippy content="#">
                <img
                  src="/assets/utilities/tooltip.svg"
                  alt=""
                  width={15}
                  height={15}
                />
              </Tippy>
            </S.FeeBreakdownTitle>
            <S.FeeBreakdownPorcentage>3.0%</S.FeeBreakdownPorcentage>
          </S.ReviewListContent>
          <S.ReviewListContent>
            <S.FeeBreakdownParagraph>Recipient address</S.FeeBreakdownParagraph>
            <Image
              src="/assets/logos/kacy-96.svg"
              alt=""
              width={20}
              height={20}
            />
          </S.ReviewListContent>
        </S.ReviewListContainer> */}
      </S.FeeBreakdownContainer>
      <S.WarningContainer>
        <img
          src="/assets/utilities/warning-yellow.svg"
          alt=""
          width={24}
          height={24}
        />
        <p>
          You <strong>can&apos;t</strong> change the{' '}
          <strong>management fee</strong> after publishing the pool to the
          network.
        </p>
      </S.WarningContainer>
    </S.FeeBreakdown>
  )
}

export default FeeBreakdown
