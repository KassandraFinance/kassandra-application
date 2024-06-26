import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useConnectWallet } from '@web3-onboard/react'
import { getAddress } from 'ethers'
import Big from 'big.js'
import ReactMarkdown from 'react-markdown'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import { useProposal } from '@/hooks/query/useProposal'
import { GovernorAlpha, Staking } from '@/constants/tokenAddresses'

import { BNtoDecimal } from '@/utils/numerals'

import useGov from '@/hooks/useGov'
import useVotingPower from '@/hooks/useVotings'
import { useVotingPower as useVotingPowerQuery } from '@/hooks/query/useVotingPower'

import ModalVotes from '@/components/Governance/ModalVotes'
import TitleSection from '@/components/TitleSection'
import VoteCard from '@/components/Governance/VoteCard'
import VotingPower from '@/components/VotingPower'
import Breadcrumb from '@/components/Breadcrumb'
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem'
import ImageProfile from '@/components/Governance/ImageProfile'

import externalLink from '@assets/utilities/external-link.svg'
import proposalDetailsIcon from '@assets/iconGradient/details.svg'
import proposalInfoIcon from '@assets/iconGradient/info-gradient.svg'
import proposalCompleteIcon from '@assets/statusProposal/proposal-complete.svg'
import proposalWaitingIcon from '@assets/statusProposal/proposal-waiting.svg'
import proposalStatusHistory from '@assets/iconGradient/timer-grandient.svg'
import tooltip from '@assets/utilities/tooltip.svg'

import * as S from './styles'

export interface ModalProps {
  voteType: string
  percentage: string
  totalVotingPower: string
  checkAllVoterModal: boolean
}

export interface IUserVotedProps {
  voted: boolean
  support: boolean | null
  userWalletAddress: string
  yourVotingPowerInProposal: Big
}

export interface IVotesProps {
  support: boolean | null
  voter: {
    id: string
  }
}

export interface IProposalProps {
  forVotes: Big
  againstVotes: Big
  proposer: string
  number: number
  quorum: string
  description: string
  votingPower: Big
  values: string[]
  calldatas: string[]
  signatures: string[]
  targets: string[]
  created: string
  eta: string
  executed: string
  votingClose: string
  votingOpen: string
  nickname?: string | null
  is_nft?: boolean | null
  image?: string | null
}

const statslibColor: { [key: string]: string } = {
  'voting open': '#E843C4',
  approved: '#26DBDB',
  succeeded: '#26DBDB',
  queued: '#FFBF00',
  executed: '#2CE878',
  failed: '#EA3224',
  canceled: '#BDBDBD'
}

const Proposal = () => {
  const [proposal, setProposal] = React.useState<IProposalProps>({
    forVotes: Big(0),
    againstVotes: Big(0),
    proposer: '',
    number: 0,
    quorum: '0',
    description: '',
    votingPower: Big(0),
    calldatas: [],
    signatures: [],
    targets: [],
    values: [],
    created: '',
    eta: '',
    executed: '',
    votingClose: '',
    votingOpen: ''
  })

  const [modalVotes, setModalVotes] = React.useState<ModalProps>({
    voteType: '',
    percentage: '',
    totalVotingPower: '',
    checkAllVoterModal: false
  })
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [percentageVotes, setPercentageVotes] = React.useState({
    for: '0',
    against: '0'
  })
  const [proposalState, setProposalState] = React.useState<string>('')
  const [dataStatus, setDataStatus] = React.useState<any[]>([])
  const [userVoted, setUserVoted] = React.useState<IUserVotedProps>({
    voted: false,
    support: null,
    userWalletAddress: '',
    yourVotingPowerInProposal: Big(0)
  })
  const [yourVotingPowerInProposal, setYourVotingPowerInProposal] =
    React.useState(Big(0))

  const router = useRouter()
  const [{ wallet }] = useConnectWallet()
  const governance = useGov(GovernorAlpha)
  const votingPower = useVotingPower(Staking)

  const idProposal = Number(router?.query?.proposal || 0)

  const walletAddress = wallet ? getAddress(wallet.accounts[0].address) : ''
  const { data } = useProposal({ number: idProposal, voter: walletAddress })
  const { data: votingPowerData } = useVotingPowerQuery({ id: walletAddress })

  async function getProposalState(number: number) {
    governance.stateProposals(number).then(res => setProposalState(res[0]))
  }

  async function getVotingPowerInProposal(startBlock: string) {
    if (wallet && startBlock) {
      const votingPowerAtMoment = await votingPower.getPriorVotes(
        wallet.accounts[0].address,
        startBlock
      )

      setYourVotingPowerInProposal(Big(votingPowerAtMoment.toString()))
    }
  }

  function handleVote(voteType: string) {
    if (
      userVoted.voted ||
      proposalState !== 'Active' ||
      !wallet ||
      yourVotingPowerInProposal.eq(Big(0))
    ) {
      return
    }

    governance.castVote(
      Number(router.query.proposal),
      voteType === 'For' ? true : false
    )

    if (isModalOpen) {
      setTimeout(() => {
        setIsModalOpen(false)
      }, 1200)
    }
  }

  React.useEffect(() => {
    if (data) {
      if (data?.proposal.length === 0) {
        router.push('/404')
        return
      }

      const secondsPerBlock = 2

      const createdProposal = new Date(Number(data.proposal[0].created) * 1000)

      const secondsToEndProposal =
        (Number(data.proposal[0].endBlock) -
          Number(data.proposal[0].startBlock)) *
        secondsPerBlock

      const proposalInfo: IProposalProps = {
        againstVotes: Big(data.proposal[0].againstVotes),
        forVotes: Big(data.proposal[0].forVotes),
        description: data.proposal[0].description,
        number: data.proposal[0].number,
        quorum: data.proposal[0].quorum,
        proposer: data.proposal[0].proposer.id,
        nickname: data.proposal[0].proposer.nickname,
        is_nft: data.proposal[0].proposer.is_nft,
        image: data.proposal[0].proposer.image,
        votingPower: Big(data.proposal[0].forVotes).add(
          Big(data.proposal[0].againstVotes)
        ),
        calldatas: data.proposal[0].calldatas,
        signatures: data.proposal[0].signatures,
        targets: data.proposal[0].targets,
        values: data.proposal[0].values,
        created: createdProposal.toLocaleString(),
        eta: data.proposal[0].eta
          ? new Date(Number(data.proposal[0].eta) * 1000).toLocaleString()
          : data.proposal[0].eta ?? '0',
        executed: data.proposal[0].executed
          ? new Date(Number(data.proposal[0].executed) * 1000).toLocaleString()
          : data.proposal[0].executed ?? '0',
        votingOpen: new Date(
          Number(createdProposal) + secondsPerBlock * 1000
        ).toLocaleString(),
        votingClose: new Date(
          Number(createdProposal) + secondsToEndProposal * 1000
        ).toLocaleString()
      }

      if (proposalInfo.votingPower.gt(0)) {
        const forVotes = BNtoDecimal(
          Big(data.proposal[0].forVotes).div(proposalInfo.votingPower).mul(100),
          18,
          2
        )

        const againstVotes = BNtoDecimal(
          Big(data.proposal[0].againstVotes)
            .div(proposalInfo.votingPower)
            .mul(100),
          18,
          2
        )

        setPercentageVotes({ for: forVotes, against: againstVotes })
      }

      const [userAlreadyVoted] = data.proposal[0].votes

      getVotingPowerInProposal(data.proposal[0].startBlock)
      getProposalState(data.proposal[0].number)
      setProposal(proposalInfo)

      if (wallet) {
        setUserVoted({
          voted: userAlreadyVoted ? true : false,
          support: userAlreadyVoted ? userAlreadyVoted.support : null,
          userWalletAddress: wallet.accounts[0].address,
          yourVotingPowerInProposal: Big(0)
        })
      }
    }
  }, [data, wallet])

  React.useEffect(() => {
    if (data) {
      if (data.proposal.length === 0) {
        return
      }

      const { endBlock, startBlock, created, canceled, executed, queued, eta } =
        data.proposal[0]
      const defeated =
        Number(proposal.forVotes) <= Number(proposal.againstVotes) ||
        Number(proposal.forVotes) < Number(proposal.quorum)
      const votingClosed =
        (Number(endBlock) - Number(startBlock)) * 2 + Number(created)

      const baseArray = [
        {
          title: 'Created',
          completed: true,
          date: new Date(Number(created) * 1000).toLocaleString().split(', ')[0]
        },
        {
          title: 'Voting Open',
          completed: true,
          date: new Date(Number(created) * 1000).toLocaleString().split(', ')[0]
        }
      ]

      const today = Date.now() / 1000

      const generateStatusHistoryArray = () => {
        const isProposalASuccess = canceled === null

        if (!isProposalASuccess) {
          return [
            ...baseArray,
            {
              title: 'Cancelled',
              completed: false,
              date: new Date(Number(canceled) * 1000)
                .toLocaleString()
                .split(', ')[0]
            }
          ]
        }

        if (votingClosed > today) {
          return [
            ...baseArray,
            {
              title: 'Voting Close',
              completed: false,
              date: new Date(Number(votingClosed) * 1000)
                .toLocaleString()
                .split(', ')[0]
            },
            {
              title: 'Queued',
              completed: false
            },
            {
              title: 'Executed',
              completed: false
            }
          ]
        }

        if (defeated) {
          return [
            ...baseArray,
            {
              title: 'Defeated',
              completed: true,
              date: new Date(votingClosed * 1000)
                .toLocaleString()
                .split(', ')[0]
            }
          ]
        }

        if (isProposalASuccess) {
          if (queued !== null) {
            if (executed !== null) {
              return [
                ...baseArray,
                {
                  title: 'Succeeded',
                  completed: true,
                  date: new Date(votingClosed * 1000)
                    .toLocaleString()
                    .split(', ')[0]
                },
                {
                  title: 'Queued',
                  completed: true,
                  date: new Date(Number(queued) * 1000)
                    .toLocaleString()
                    .split(', ')[0]
                },
                {
                  title: 'Executed',
                  completed: true,
                  date: new Date(Number(executed) * 1000)
                    .toLocaleString()
                    .split(', ')[0]
                }
              ]
            }

            if (Number(eta) < today) {
              return [
                ...baseArray,
                {
                  title: 'Succeeded',
                  completed: true,
                  date: new Date(votingClosed * 1000)
                    .toLocaleString()
                    .split(', ')[0]
                },
                {
                  title: 'Queued',
                  completed: true,
                  date: new Date(Number(queued) * 1000)
                    .toLocaleString()
                    .split(', ')[0]
                },
                {
                  title: 'Expired',
                  completed: true,
                  date: new Date(Number(eta) * 1000)
                    .toLocaleString()
                    .split(', ')[0]
                }
              ]
            }

            if (eta === null) {
              return [
                ...baseArray,
                {
                  title: 'Succeeded',
                  completed: true,
                  date: new Date(votingClosed * 1000)
                    .toLocaleString()
                    .split(', ')[0]
                },
                {
                  title: 'Queued',
                  completed: true,
                  date: new Date(Number(queued) * 1000)
                    .toLocaleString()
                    .split(', ')[0]
                },
                {
                  title: 'Executed',
                  completed: false,
                  date: ''
                }
              ]
            }

            return [
              ...baseArray,
              {
                title: 'Succeeded',
                completed: true,
                date: new Date(votingClosed * 1000)
                  .toLocaleString()
                  .split(', ')[0]
              },
              {
                title: 'Queued',
                completed: true,
                date: new Date(Number(queued) * 1000)
                  .toLocaleString()
                  .split(', ')[0]
              },
              {
                title: 'Deadline',
                completed: true,
                date: new Date(Number(eta) * 1000)
                  .toLocaleString()
                  .split(', ')[0]
              }
            ]
          } else {
            if (executed !== null) {
              return [
                ...baseArray,
                {
                  title: 'Succeeded',
                  completed: true,
                  date: new Date(votingClosed * 1000)
                    .toLocaleString()
                    .split(', ')[0]
                },
                {
                  title: 'Queued',
                  completed: false,
                  date: ''
                },
                {
                  title: 'Executed',
                  completed: true,
                  date: new Date(Number(executed) * 1000)
                    .toLocaleString()
                    .split(', ')[0]
                }
              ]
            }

            if (eta === null) {
              return [
                ...baseArray,
                {
                  title: 'Succeeded',
                  completed: true,
                  date: new Date(votingClosed * 1000)
                    .toLocaleString()
                    .split(', ')[0]
                },
                {
                  title: 'Queued',
                  completed: false,
                  date: ''
                },
                {
                  title: 'Executed',
                  completed: false,
                  date: ''
                }
              ]
            }

            if (Number(eta) < today) {
              return [
                ...baseArray,
                {
                  title: 'Succeeded',
                  completed: true,
                  date: new Date(votingClosed * 1000)
                    .toLocaleString()
                    .split(', ')[0]
                },
                {
                  title: 'Queued',
                  completed: false,
                  date: ''
                },
                {
                  title: 'Expired',
                  completed: true,
                  date: new Date(Number(eta) * 1000)
                    .toLocaleString()
                    .split(', ')[0]
                }
              ]
            }

            return [
              ...baseArray,
              {
                title: 'Succeeded',
                completed: true,
                date: new Date(votingClosed * 1000)
                  .toLocaleString()
                  .split(', ')[0]
              },
              {
                title: 'Queued',
                completed: false,
                date: ''
              },
              {
                title: 'Deadline',
                completed: true,
                date: new Date(Number(eta) * 1000)
                  .toLocaleString()
                  .split(', ')[0]
              }
            ]
          }
        }

        return []
      }

      const array = generateStatusHistoryArray()

      setDataStatus(array)
    }
  }, [data, proposal.againstVotes, proposal.forVotes, proposal.quorum])

  return (
    <>
      <>
        <Breadcrumb>
          <BreadcrumbItem href="/">Invest</BreadcrumbItem>
          <BreadcrumbItem href="/gov">Governance</BreadcrumbItem>
          <BreadcrumbItem href={router.asPath} isLastPage>
            Proposal {router.query.proposal}
          </BreadcrumbItem>
        </Breadcrumb>
        <S.VoteContent>
          <S.IntroDesktopScreen>
            <S.TitleWrapper>
              <S.TitleAndAuthor>
                <TitleSection
                  image={proposalDetailsIcon}
                  title={`Proposal ${router.query.proposal}`}
                />
                <S.ProposeAuthorCard>
                  <p>Proposed by</p>
                  <ImageProfile
                    address={proposal.proposer}
                    diameter={32}
                    hasAddress={true}
                    nickname={proposal.nickname}
                    isNFT={!!proposal.is_nft}
                    image={proposal.image}
                    isLink={true}
                    tab="?tab=governance-data"
                  />
                </S.ProposeAuthorCard>
              </S.TitleAndAuthor>
              <S.VotingPower>
                <VotingPower
                  currentVotingPower={Big(
                    votingPowerData?.user?.votingPower ?? '0'
                  )}
                  yourVotingPowerInProposal={yourVotingPowerInProposal}
                />
              </S.VotingPower>
            </S.TitleWrapper>
          </S.IntroDesktopScreen>

          <S.IntroMobileScreen>
            <S.TitleWrapper>
              <TitleSection
                image={proposalDetailsIcon}
                title={`Proposal ${router.query.proposal}`}
              />
              <S.CardTitleWrapper>
                <S.VotingPower>
                  <VotingPower
                    currentVotingPower={Big(
                      votingPowerData?.user?.votingPower ?? '0'
                    )}
                    yourVotingPowerInProposal={yourVotingPowerInProposal}
                  />
                </S.VotingPower>
                <S.ProposeAuthorCard>
                  <p>Proposed by</p>
                  <ImageProfile
                    address={proposal.proposer}
                    diameter={24}
                    hasAddress={true}
                    nickname={proposal.nickname}
                    isNFT={!!proposal.is_nft}
                    image={proposal.image}
                    isLink={true}
                    tab="?tab=governance-data"
                  />
                </S.ProposeAuthorCard>
              </S.CardTitleWrapper>
            </S.TitleWrapper>
          </S.IntroMobileScreen>
          <S.VoteCardWrapper>
            <VoteCard
              yourVotingPowerInProposal={yourVotingPowerInProposal}
              typeVote="For"
              percentage={percentageVotes.for}
              totalVotingPower={BNtoDecimal(Big(proposal.forVotes), 0, 2, 2)}
              proposalState={proposalState}
              userVote={userVoted}
              handleVote={handleVote}
              onClickLink={() => {
                setModalVotes({
                  voteType: 'For',
                  percentage: `${percentageVotes.for}`,
                  totalVotingPower: `${BNtoDecimal(
                    Big(proposal.forVotes),
                    0,
                    2,
                    2
                  )}`,
                  checkAllVoterModal: true
                })
                setIsModalOpen(true)
              }}
            />
            <VoteCard
              yourVotingPowerInProposal={yourVotingPowerInProposal}
              typeVote="Against"
              percentage={percentageVotes.against}
              totalVotingPower={BNtoDecimal(
                Big(proposal.againstVotes),
                0,
                2,
                2
              )}
              proposalState={proposalState}
              userVote={userVoted}
              handleVote={handleVote}
              onClickLink={() => {
                setModalVotes({
                  voteType: 'Against',
                  percentage: `${percentageVotes.against}`,
                  totalVotingPower: `${BNtoDecimal(
                    Big(proposal.againstVotes),
                    0,
                    2,
                    2
                  )}`,
                  checkAllVoterModal: false
                })
                setIsModalOpen(true)
              }}
            />
          </S.VoteCardWrapper>
        </S.VoteContent>
        <S.ProposalInfo>
          <TitleSection image={proposalInfoIcon} title="Proposal Info" />
          <S.CardWrapper>
            <S.DescriptionTable>
              <S.DescriptionProposal>
                <ReactMarkdown skipHtml={true} linkTarget={'_blank'}>
                  {proposal.description.replace('["', '').replace('"]', '')}
                </ReactMarkdown>
              </S.DescriptionProposal>
            </S.DescriptionTable>
            <S.InfoTable>
              <S.Table>
                <S.TableHead>
                  <S.TableTitle>Information</S.TableTitle>
                </S.TableHead>
                <S.TableBody>
                  <S.TableInfoWrapper>
                    <S.DataWrapper>
                      <S.TextKey>State</S.TextKey>
                      {proposalState ? (
                        <S.TextValue
                          style={{
                            color: statslibColor[proposalState.toLowerCase()]
                          }}
                        >
                          {proposalState.charAt(0).toUpperCase() +
                            proposalState.slice(1)}
                        </S.TextValue>
                      ) : (
                        '...'
                      )}
                    </S.DataWrapper>
                    <S.DataWrapper>
                      <S.Quorum>
                        <S.TextKey>Quorum</S.TextKey>
                        <Tippy content="Quorum is the minimal amount of votes that a proposal needs to have to be valid. Proposals that don’t achieve the quorum will fail.">
                          <S.Tooltip tabIndex={0}>
                            <Image
                              src={tooltip}
                              alt="Explanation"
                              width={14}
                              height={14}
                            />
                          </S.Tooltip>
                        </Tippy>
                      </S.Quorum>
                      <S.TextValue>
                        {BNtoDecimal(Big(proposal.quorum), 0, 2)}
                      </S.TextValue>
                    </S.DataWrapper>
                    <S.DataWrapper>
                      <S.TextKey>Total Voted</S.TextKey>
                      <S.TextValue>
                        {BNtoDecimal(proposal.votingPower, 0, 2)}
                      </S.TextValue>
                    </S.DataWrapper>
                    <S.DataWrapper>
                      <S.TextKey>Created</S.TextKey>
                      <S.TextValue>{proposal.created}</S.TextValue>
                    </S.DataWrapper>
                    <S.DataWrapper>
                      <S.TextKey>Voting Open</S.TextKey>
                      <S.TextValue>{proposal.votingOpen}</S.TextValue>
                    </S.DataWrapper>
                    <S.DataWrapper>
                      <S.TextKey>Voting Close</S.TextKey>
                      <S.TextValue>{proposal.votingClose}</S.TextValue>
                    </S.DataWrapper>
                    <S.DataWrapper>
                      <S.TextKey>
                        {proposal.executed
                          ? 'Executed'
                          : proposal.eta
                          ? 'Execution Deadline'
                          : ''}
                      </S.TextKey>
                      <S.TextValue>
                        {proposal.executed ?? proposal.eta ?? ''}
                      </S.TextValue>
                    </S.DataWrapper>
                  </S.TableInfoWrapper>
                </S.TableBody>
              </S.Table>

              <S.LinkForum
                href="https://gov.kassandra.finance/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Discuss the proposals at the Forum</span>
                <Image src={externalLink} alt="" />
              </S.LinkForum>
            </S.InfoTable>
          </S.CardWrapper>

          <S.ProposalDetails>
            <TitleSection image={proposalDetailsIcon} title="Details" />
            <S.DescriptionTable>
              {new Array(3).fill(null).map((_, index) => {
                if (
                  proposal.calldatas[index] ||
                  proposal.signatures[index] ||
                  proposal.targets[index] ||
                  proposal.values[index]
                ) {
                  return (
                    <S.TableDescriptionWrapper key={index}>
                      <S.LinkTargetSnowTrace
                        href={`https://snowtrace.io/address/${proposal.targets[index]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Target:</span>
                        <span>
                          {proposal.targets[index]
                            ? proposal.targets[index]
                            : '-'}
                        </span>
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 17 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.57924 2.78973C9.57924 2.44566 9.85816 2.16675 10.2022 2.16675H13.9401C14.2841 2.16675 14.5631 2.44566 14.5631 2.78973V6.52759C14.5631 6.87165 14.2841 7.15057 13.9401 7.15057C13.596 7.15057 13.3171 6.87165 13.3171 6.52759V4.41832L6.90487 10.8306C6.66158 11.0738 6.26713 11.0738 6.02385 10.8306C5.78056 10.5873 5.78056 10.1928 6.02385 9.94954L12.5607 3.4127H10.2022C9.85816 3.4127 9.57924 3.13379 9.57924 2.78973ZM3.97245 5.65542C3.80722 5.65542 3.64877 5.72106 3.53194 5.83789C3.41511 5.95472 3.34947 6.11317 3.34947 6.2784V13.1312C3.34947 13.2964 3.41511 13.4548 3.53194 13.5717C3.64877 13.6885 3.80722 13.7541 3.97245 13.7541H10.8252C10.9904 13.7541 11.1489 13.6885 11.2657 13.5717C11.3825 13.4548 11.4482 13.2964 11.4482 13.1312V9.39329C11.4482 9.04923 11.7271 8.77031 12.0712 8.77031C12.4152 8.77031 12.6941 9.04923 12.6941 9.39329V13.1312C12.6941 13.6268 12.4972 14.1022 12.1467 14.4527C11.7962 14.8032 11.3209 15.0001 10.8252 15.0001H3.97245C3.47678 15.0001 3.00141 14.8032 2.65091 14.4527C2.30042 14.1022 2.10352 13.6268 2.10352 13.1312L2.10352 6.2784C2.10352 5.78273 2.30042 5.30736 2.65091 4.95686C3.00141 4.60637 3.47678 4.40947 3.97245 4.40947H7.71031C8.05437 4.40947 8.33329 4.68838 8.33329 5.03244C8.33329 5.37651 8.05437 5.65542 7.71031 5.65542H3.97245Z"
                            fill="white"
                          />
                        </svg>
                      </S.LinkTargetSnowTrace>

                      <S.DetailsSubTitle>
                        Value:
                        <S.DetailsText>
                          {proposal.values[index]
                            ? BNtoDecimal(Big(proposal.values[index]), 18, 2)
                            : '-'}
                        </S.DetailsText>
                      </S.DetailsSubTitle>

                      <S.DetailsSubTitle>
                        Signature:
                        <S.DetailsText>
                          {proposal.signatures[index]
                            ? proposal.signatures[index]
                            : '-'}
                        </S.DetailsText>
                      </S.DetailsSubTitle>

                      <S.DetailsSubTitle>
                        Calldata:
                        <S.DetailsText>
                          {proposal.calldatas[index]
                            ? proposal.calldatas[index]
                            : '-'}
                        </S.DetailsText>
                      </S.DetailsSubTitle>
                    </S.TableDescriptionWrapper>
                  )
                }
                return
              })}
            </S.DescriptionTable>
          </S.ProposalDetails>
          <S.ProposalStatus>
            <TitleSection
              image={proposalStatusHistory}
              title="Proposal Status History"
            />
            <S.Steps>
              {dataStatus.map((step, index) => (
                <React.Fragment key={index}>
                  <S.LineBetweenImages
                    isBefore={step.title === 'Created'}
                    isComplete={step.completed === true}
                  />
                  <S.Step>
                    <S.StepImageContainer>
                      {step.completed === true ? (
                        <Image src={proposalCompleteIcon} layout="responsive" />
                      ) : (
                        <Image src={proposalWaitingIcon} layout="responsive" />
                      )}
                    </S.StepImageContainer>
                    <S.StepTitle>{step.title}</S.StepTitle>
                    <S.StepDate>{step.date}</S.StepDate>
                  </S.Step>
                </React.Fragment>
              ))}
            </S.Steps>
          </S.ProposalStatus>
        </S.ProposalInfo>
      </>
      {isModalOpen && (
        <ModalVotes
          voteType={modalVotes.voteType}
          percentage={modalVotes.percentage}
          totalVotingPower={modalVotes.totalVotingPower}
          checkAllVoterModal={modalVotes.checkAllVoterModal}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          userVote={userVoted}
          proposalState={proposalState}
          handleVote={handleVote}
        />
      )}
    </>
  )
}

export default Proposal
