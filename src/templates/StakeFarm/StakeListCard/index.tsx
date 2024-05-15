import { useConnectWallet, useSetChain } from '@web3-onboard/react'
import { useState } from 'react'
import Image from 'next/image'
import Big from 'big.js'

import useStakingInfo from '@/hooks/useStakingInfo'
import { ERC20 } from '@/hooks/useERC20'

import { PoolDetails } from '@/constants/pools'
import { networks } from '@/constants/tokenAddresses'

import { registerToken } from '@/utils/registerToken'
import { BNtoDecimal } from '@/utils/numerals'

import ExternalLink from '@/components/ExternalLink'
import ModalBuyKacyOnPangolin from '@/components/Modals/ModalBuyKacyOnPangolin'
import ModalStakeAndWithdraw from '@/components/Modals/ModalStakeAndWithdraw'
import ModalCancelUnstake, {
  typeTransaction
} from '@/components/Modals/ModalCancelUnstake'
import ModalRequestUnstake from '@/components/Modals/ModalRequestUnstake'
import Button from '@/components/Button'
import Label from '@/components/Labels/Label'
import SkeletonLoading from '@/components/SkeletonLoading'
import GradientLabel from '@/components/Labels/GradientLabel'
import { PoolMetrics, UserInfo } from '@/templates/StakeFarm/utils'

import arrowDownThin from '@assets/utilities/arrow-down-thin.svg'

import * as S from './styles'

interface StaleListViewSectionProps {
  pool: PoolDetails
  userInfo: UserInfo
  poolDataMetrics: PoolMetrics
  poolPrice: Big
  kacyPrice: Big
}

const rightArrowIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
      stroke="#FCFCFC"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 10.8002L10.8 8.0002L8 5.2002"
      stroke="#FCFCFC"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.2002 8H10.8002"
      stroke="#FCFCFC"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function StakeListCard({
  pool,
  poolDataMetrics,
  userInfo,
  poolPrice,
  kacyPrice
}: StaleListViewSectionProps) {
  const [isExpandToggle, setIsExpandToggle] = useState<boolean>(false)
  const [isOpenModalPangolin, setIsOpenModalPangolin] = useState<boolean>(false)

  const [isModalStake, setIsModalStake] = useState<boolean>(false)
  const [isModalCancelUnstake, setIsModalCancelUnstake] =
    useState<boolean>(false)
  const [isModalRequestUnstake, setIsModalRequestUnstake] =
    useState<boolean>(false)
  const [amountApproveKacyStaking, setAmountApproveKacyStaking] = useState<Big>(
    Big(0)
  )
  const [stakeTransaction, setStakeTransaction] = useState<typeTransaction>(
    typeTransaction.NONE
  )

  const [{ settingChain }, setChain] = useSetChain()
  const [{ wallet }, connect] = useConnectWallet()
  const stakingInfo = useStakingInfo(pool.chain.id, pool.pid)

  const productCategories = [
    'Stake',
    process.env.NEXT_PUBLIC_MASTER === '1' ? 'Avalanche' : 'Fuji',
    pool.stakeWithVotingPower ? 'VotingStake' : 'OtherStake'
  ]

  function handleRegisterToken(
    stakingToken: string,
    symbol: string,
    tokenDecimals: string
  ) {
    registerToken(
      stakingToken,
      symbol.toLocaleUpperCase(),
      Number(tokenDecimals)
    )
  }

  function openStakeAndWithdraw(transaction: typeTransaction) {
    setIsModalStake(true)
    setStakeTransaction(transaction)
  }

  async function updateAllowance() {
    const erc20 = await ERC20(poolDataMetrics.stakingToken, pool.chain.id)

    const allowance = await erc20.allowance(
      pool.stakingContract,
      wallet?.accounts[0].address || ''
    )

    setAmountApproveKacyStaking(Big(allowance))
  }

  async function handleApproveKacy(value: Big) {
    const allowance = await stakingInfo.handleApprove(
      poolDataMetrics.stakingToken,
      pool?.symbol ?? '',
      value
    )

    setAmountApproveKacyStaking(Big(allowance))
  }

  return (
    <S.Content>
      <S.TopContent>
        <S.TopContentMobile>
          <S.PoolNameAndImageContent>
            <S.PoolNameAndImage>
              <S.Imagecontainer>
                <S.ImageWrapper>
                  <Image src={pool.properties.logo.src} layout="fill" />
                </S.ImageWrapper>

                <S.ChainLogoWrapper>
                  <Image src={pool.chain.logo} layout="fill" />
                </S.ChainLogoWrapper>
              </S.Imagecontainer>
              <S.PoolText>
                <S.PoolTitle>{pool.symbol}</S.PoolTitle>
                <S.LabelsContainer>
                  {poolDataMetrics.apr.lt(0) ? (
                    <SkeletonLoading height={2.4} width={10} />
                  ) : (
                    <>
                      <GradientLabel
                        img={{
                          url: '/assets/iconGradient/lightning.svg',
                          width: 12,
                          height: 12
                        }}
                        text="STAKE & EARN"
                      />
                      <Label
                        text={
                          BNtoDecimal(
                            poolDataMetrics.hasExpired
                              ? Big(0)
                              : poolDataMetrics.apr,
                            0
                          ) + '%'
                        }
                      />
                    </>
                  )}
                </S.LabelsContainer>
              </S.PoolText>
            </S.PoolNameAndImage>

            <S.IconWrapperMobile
              isExpanded={isExpandToggle}
              onClick={() => setIsExpandToggle(!isExpandToggle)}
            >
              <Image src={arrowDownThin} width={24} height={14} />
            </S.IconWrapperMobile>
          </S.PoolNameAndImageContent>
        </S.TopContentMobile>

        <S.RegularContent stakeGrid={pool.stakeWithVotingPower}>
          {pool.stakeWithVotingPower ? (
            <>
              <S.RegularColumn>
                <h3>Voting Power</h3>
                {Big(poolDataMetrics.votingMultiplier).lte(0) ? (
                  <SkeletonLoading width={6} />
                ) : (
                  <p>
                    {poolDataMetrics.votingMultiplier}
                    <span>/${pool.symbol}</span>
                  </p>
                )}
              </S.RegularColumn>
              <S.RegularColumn>
                <h3>Withdraw Delay</h3>
                {poolDataMetrics.withdrawDelay < 0 ? (
                  <SkeletonLoading width={6} />
                ) : (
                  <p>
                    {poolDataMetrics.withdrawDelay / 60 / 60 / 24 < 1
                      ? poolDataMetrics.withdrawDelay / 60
                      : poolDataMetrics.withdrawDelay / 60 / 60 / 24}{' '}
                    <span>
                      {poolDataMetrics.withdrawDelay / 60 / 60 / 24 < 1
                        ? ' min'
                        : ' days'}
                    </span>
                  </p>
                )}
              </S.RegularColumn>
            </>
          ) : (
            <>
              <S.RegularColumn>
                <h3>Daily KACY</h3>
                {poolDataMetrics.kacyRewards.lte(0) ? (
                  <SkeletonLoading width={6} />
                ) : (
                  <p>
                    {poolDataMetrics.hasExpired
                      ? '0/day'
                      : BNtoDecimal(
                          poolDataMetrics.kacyRewards
                            .mul(userInfo?.yourStake ?? Big(0))
                            .div(
                              poolDataMetrics?.totalStaked.eq(0)
                                ? 1
                                : poolDataMetrics?.totalStaked
                            ),
                          18,
                          2
                        ) + '/day'}
                  </p>
                )}
              </S.RegularColumn>
            </>
          )}
          <S.RegularColumn>
            <h3>Your Stake</h3>
            {userInfo.yourStake.lt(0) ? (
              <SkeletonLoading width={6} />
            ) : (
              <span>
                <p>
                  {BNtoDecimal(userInfo.yourStake.div(Big(10).pow(18)), 18)}
                  {/* <span>{pool.symbol}</span> */}
                </p>
                ≈{' '}
                {BNtoDecimal(
                  userInfo.yourStake.mul(poolPrice).div(Big(10).pow(18)),
                  2,
                  2,
                  2
                )}{' '}
                USD
              </span>
            )}
          </S.RegularColumn>
          <S.RegularColumn>
            <h3>Earned</h3>
            {userInfo.kacyEarned.lt(0) ? (
              <SkeletonLoading width={6} />
            ) : (
              <span>
                <p>
                  {BNtoDecimal(userInfo.kacyEarned.div(Big(10).pow(18)), 18, 2)}{' '}
                  {/* <span>KACY</span> */}
                </p>
                ≈{' '}
                {BNtoDecimal(
                  userInfo.kacyEarned.mul(kacyPrice).div(Big(10).pow(18)),
                  6,
                  2,
                  2
                )}{' '}
                USD
              </span>
            )}
          </S.RegularColumn>
          <S.BoldColumn>
            <h3>APR</h3>
            {poolDataMetrics.apr.lte(0) ? (
              <SkeletonLoading width={5} />
            ) : (
              <p>
                {BNtoDecimal(
                  poolDataMetrics.hasExpired ? Big(0) : poolDataMetrics.apr,
                  0
                )}
                %
              </p>
            )}
          </S.BoldColumn>
        </S.RegularContent>

        <S.WrapperButton>
          {wallet?.accounts[0].address ? (
            pool.chain.id !== Number(wallet?.chains[0].id) ? (
              <Button
                type="button"
                className="chnageChainButton"
                text={`Connect to ${pool.chain.name}`}
                size="large"
                fullWidth
                background="secondary"
                image="/assets/icons/rebalance.svg"
                disabledNoEvent={settingChain}
                onClick={() =>
                  setChain({
                    chainId: `0x${pool.chain.id.toString(16)}`
                  })
                }
              />
            ) : pool.stakeWithLockPeriod ? null : poolDataMetrics.withdrawDelay !==
                0 &&
              userInfo.withdrawable &&
              userInfo.yourStake.gt(0) ? (
              <Button
                type="button"
                text={`Stake ${pool.symbol}`}
                fullWidth
                size="large"
                background="secondary"
                onClick={() => setIsModalCancelUnstake(true)}
              />
            ) : (
              <Button
                type="button"
                text={`Stake ${pool.symbol}`}
                fullWidth
                size="large"
                background="secondary"
                onClick={() => openStakeAndWithdraw(typeTransaction.STAKING)}
              />
            )
          ) : (
            <Button
              rightIcon
              text="Connect Wallet"
              background="secondary"
              fullWidth
              size="large"
              icon={rightArrowIcon}
              onClick={() => connect()}
            />
          )}

          <S.IconWrapperDesktop
            isExpanded={isExpandToggle}
            onClick={() => setIsExpandToggle(!isExpandToggle)}
          >
            <Image src={arrowDownThin} width={24} height={14} />
          </S.IconWrapperDesktop>
        </S.WrapperButton>
      </S.TopContent>

      {isExpandToggle && (
        <S.ExpandedWrapper>
          <S.ExpandedContent>
            <S.ExpandedTextContent>
              <S.BlocksWrapper>
                <S.ExpandedContentBlock>
                  <p>
                    <span>Total Staked:</span>{' '}
                    {poolDataMetrics.totalStaked.lte(0) ? (
                      <SkeletonLoading width={10} />
                    ) : (
                      <>
                        {BNtoDecimal(
                          poolDataMetrics.totalStaked.div(Big(10).pow(18)),
                          18
                        )}{' '}
                        {pool.symbol}
                      </>
                    )}
                  </p>

                  {poolDataMetrics.totalStaked.lte(0) ? (
                    <SkeletonLoading width={10} />
                  ) : (
                    <span>
                      &#8776;{' '}
                      {BNtoDecimal(
                        Big(`${poolDataMetrics.totalStaked}`)
                          .mul(poolPrice)
                          .div(Big(10).pow(18)),
                        6,
                        2,
                        2
                      )}{' '}
                      USD
                    </span>
                  )}
                </S.ExpandedContentBlock>
                <S.ExpandedContentBlock>
                  <p>
                    <span>Pool Reward:</span>{' '}
                    {poolDataMetrics.kacyRewards.lte(0) ? (
                      <SkeletonLoading width={10} />
                    ) : (
                      <>
                        {poolDataMetrics.hasExpired
                          ? '0'
                          : BNtoDecimal(
                              poolDataMetrics.kacyRewards.div(Big(10).pow(18)),
                              18,
                              2,
                              2
                            )}
                        /day
                      </>
                    )}
                  </p>

                  {poolDataMetrics.kacyRewards.lte(0) ? (
                    <SkeletonLoading width={10} />
                  ) : (
                    <span>
                      &#8776;{' '}
                      {poolDataMetrics.hasExpired
                        ? '0'
                        : BNtoDecimal(
                            poolDataMetrics.kacyRewards
                              .mul(kacyPrice)
                              .div(Big(10).pow(18)),
                            6,
                            2,
                            2
                          )}{' '}
                      USD
                    </span>
                  )}
                </S.ExpandedContentBlock>
                <S.ExpandedContentBlock>
                  <p>
                    <span>Start Date:</span>
                    {!poolDataMetrics.startDate ? (
                      <SkeletonLoading width={8} />
                    ) : (
                      poolDataMetrics.startDate
                    )}
                  </p>
                  <p>
                    <span>Reward Update:</span>
                    {!poolDataMetrics.endDate ? (
                      <SkeletonLoading width={8} />
                    ) : (
                      poolDataMetrics.endDate
                    )}
                  </p>
                </S.ExpandedContentBlock>
              </S.BlocksWrapper>
              <S.ExpandedFooter>
                <S.ExpandedFooterButton>
                  {pool.symbol === 'KACY' ? (
                    <S.AddToken onClick={() => setIsOpenModalPangolin(true)}>
                      Buy {pool.symbol}{' '}
                      <Image
                        src={pool.properties.logo.src}
                        layout="fixed"
                        width={16}
                        height={16}
                      />
                    </S.AddToken>
                  ) : (
                    <ExternalLink
                      hrefLink={pool.properties.link ?? ''}
                      text={`Get ${pool.symbol}`}
                    />
                  )}
                  <S.AddToken
                    type="button"
                    onClick={() =>
                      handleRegisterToken(
                        poolDataMetrics.stakingToken,
                        pool.symbol,
                        poolDataMetrics.tokenDecimals
                      )
                    }
                  >
                    Add to Metamask{' '}
                    <img src="/assets/logos/metamask.svg" alt="" />
                  </S.AddToken>
                </S.ExpandedFooterButton>
                <ExternalLink
                  hrefLink={`${networks[pool.chain.id].blockExplorer}/address/${
                    poolDataMetrics.stakingToken
                  }`}
                  text="See contract"
                />
              </S.ExpandedFooter>
            </S.ExpandedTextContent>
            <S.ExpandedContentButtons>
              <Button
                size="large"
                text="Claim"
                background="secondary"
                disabledNoEvent={
                  userInfo.kacyEarned?.lte(Big(0)) ||
                  pool.chain.id !== Number(wallet?.chains[0].id)
                }
                onClick={() => stakingInfo.handleClain(pool.symbol)}
              />
              {userInfo.withdrawable ? (
                <Button
                  type="button"
                  text="Withdraw"
                  size="large"
                  background="black"
                  disabledNoEvent={
                    userInfo.yourStake.lte(0) ||
                    (pool.stakeWithLockPeriod &&
                      Big(userInfo.currentAvailableWithdraw).lte(0)) ||
                    pool.chain.id !== Number(wallet?.chains[0].id)
                  }
                  fullWidth
                  onClick={() =>
                    openStakeAndWithdraw(typeTransaction.UNSTAKING)
                  }
                />
              ) : (
                <Button
                  type="button"
                  text="Request withdraw"
                  size="large"
                  background="black"
                  disabledNoEvent={
                    userInfo.yourStake.lte(0) ||
                    pool.chain.id !== Number(wallet?.chains[0].id)
                  }
                  fullWidth
                  onClick={() => setIsModalRequestUnstake(true)}
                />
              )}
            </S.ExpandedContentButtons>
          </S.ExpandedContent>
        </S.ExpandedWrapper>
      )}

      {isModalStake && (
        <ModalStakeAndWithdraw
          pool={{
            pid: pool.pid,
            type: pool.type,
            symbol: pool.symbol,
            chainId: pool.chain.id,
            properties: pool.properties,
            stakingContract: pool.stakingContract
          }}
          setModalOpen={setIsModalStake}
          decimals={poolDataMetrics.tokenDecimals}
          stakingToken={poolDataMetrics.stakingToken}
          productCategories={productCategories}
          stakeTransaction={stakeTransaction}
          setStakeTransaction={setStakeTransaction}
          amountApproved={amountApproveKacyStaking}
          handleApprove={handleApproveKacy}
          updateAllowance={updateAllowance}
          // getUserInfoAboutPool={userInfoAboutPool}
        />
      )}
      {isModalCancelUnstake && (
        <ModalCancelUnstake
          pool={pool}
          setModalOpen={setIsModalCancelUnstake}
          stakingContract={pool.stakingContract}
          openStakeAndWithdraw={openStakeAndWithdraw}
          // getUserInfoAboutPool={userInfoAboutPool}
          isStaking={
            poolDataMetrics.withdrawDelay === -1 && !!userInfo.withdrawable
          }
        />
      )}
      {isModalRequestUnstake && (
        <ModalRequestUnstake
          pool={pool}
          modalOpen={isModalRequestUnstake}
          setModalOpen={setIsModalRequestUnstake}
          votingMultiplier={poolDataMetrics.votingMultiplier}
          yourStake={userInfo.yourStake}
          // getUserInfoAboutPool={userInfoAboutPool}
        />
      )}
      {isOpenModalPangolin && (
        <ModalBuyKacyOnPangolin
          modalOpen={isOpenModalPangolin}
          setModalOpen={setIsOpenModalPangolin}
        />
      )}

      {isOpenModalPangolin && (
        <ModalBuyKacyOnPangolin
          modalOpen={isOpenModalPangolin}
          setModalOpen={setIsOpenModalPangolin}
        />
      )}
    </S.Content>
  )
}
