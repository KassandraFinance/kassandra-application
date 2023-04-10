import React from 'react'
import Image from 'next/image'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useRouter } from 'next/router'
import { AbiItem } from 'web3-utils'

import { useAppSelector } from '@/store/hooks'
import usePoolInfo from '@/hooks/usePoolInfo'

import PrivateInvestors from '@/constants/abi/PrivateInvestors.json'
import { networks } from '@/constants/tokenAddresses'
import web3 from '@/utils/web3'

import Button from '@/components/Button'
import ImageProfile from '@/components/Governance/ImageProfile'
import AddInvestorModal from './AddInvestorModal'
import RemoveInvestorModal from './RemoveInvestorModal'
import PrivacySettingsModal from './PrivacySettingsModal'

import editIcon from '@assets/utilities/edit-icon.svg'

import * as S from './styles'

const PrivacySettings = () => {
  const [privateInvestors, setPrivateInvestors] = React.useState<Array<string>>(
    []
  )
  const [isPrivacyModal, setIsPrivacyModal] = React.useState(false)
  const [isAddInvestorModal, setIsAddInvestorModal] = React.useState(false)
  const [isRemoveInvestorModal, setIsRemoveInvestorModal] =
    React.useState(false)

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  const router = useRouter()
  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  function handleEditClick() {
    setIsPrivacyModal(true)
  }

  const { poolInfo } = usePoolInfo(userWalletAddress, poolId)

  React.useEffect(() => {
    if (!poolInfo) return
    const setAddressesOfPrivateInvestors = async (privateInvestorAddr: string, pool: string) => {
      const privateInvestorsContract = new web3.eth.Contract((PrivateInvestors as unknown) as AbiItem, privateInvestorAddr)
      const addresses = await privateInvestorsContract.methods.getInvestors(pool, 0, 100).call()
      if (addresses) {
        setPrivateInvestors(addresses)
      }
    }

    setAddressesOfPrivateInvestors(networks[poolInfo.chainId].privateInvestor, poolInfo.address)
  }, [userWalletAddress, poolInfo])

  return (
    <S.PrivacySettings>
      <S.TitleContainer>
        <S.Title>Private Pool</S.Title>

        <S.ButtonEdit onClick={handleEditClick}>
          <Image src={editIcon} />
        </S.ButtonEdit>
      </S.TitleContainer>

      <S.Line />

      <S.SubTitle>addresses that can invest</S.SubTitle>

      <S.AddressesContainer>
        {privateInvestors.length > 0 && privateInvestors.map(investor => (
          <S.Address key={investor}>
            <ImageProfile
              address={investor}
              diameter={20}
              hasAddress
              isLink={false}
            />

            <S.LinksContainer>
              <CopyToClipboard text={investor}>
                <S.Link>
                  <svg
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.44986 11.9993H1.45056C1.2915 12.0048 1.13301 11.9776 0.984934 11.9192C0.83686 11.8609 0.702372 11.7727 0.589834 11.6602C0.477295 11.5476 0.389113 11.4131 0.33077 11.2651C0.272428 11.117 0.245173 10.9585 0.2507 10.7994L0.2507 4.80014C0.245173 4.64108 0.272428 4.48259 0.33077 4.33451C0.389113 4.18644 0.477295 4.05195 0.589834 3.93941C0.702372 3.82687 0.83686 3.73869 0.984934 3.68035C1.13301 3.62201 1.2915 3.59475 1.45056 3.60028H3.85028V1.20056C3.84475 1.0415 3.87201 0.883009 3.93035 0.734934C3.98869 0.58686 4.07687 0.452372 4.18941 0.339834C4.30195 0.227295 4.43644 0.139113 4.58451 0.0807702C4.73259 0.0224277 4.89108 -0.00482733 5.05014 0.000699973L11.0494 0.000699973C11.2085 -0.00482733 11.367 0.0224277 11.5151 0.0807702C11.6631 0.139113 11.7976 0.227295 11.9102 0.339834C12.0227 0.452372 12.1109 0.58686 12.1692 0.734934C12.2276 0.883009 12.2548 1.0415 12.2493 1.20056V7.19986C12.2547 7.35889 12.2274 7.51735 12.169 7.66538C12.1107 7.81342 12.0225 7.94787 11.91 8.06039C11.7974 8.17291 11.663 8.26109 11.515 8.31947C11.3669 8.37784 11.2085 8.40516 11.0494 8.39972H8.64972V10.7994C8.65516 10.9585 8.62784 11.1169 8.56947 11.265C8.51109 11.413 8.42291 11.5474 8.31039 11.66C8.19787 11.7725 8.06342 11.8607 7.91538 11.919C7.76735 11.9774 7.60889 12.0047 7.44986 11.9993ZM1.45056 4.80014V10.7994H7.44986V8.39972H5.05014C4.89111 8.40516 4.73265 8.37784 4.58462 8.31947C4.43658 8.26109 4.30213 8.17291 4.18961 8.06039C4.07709 7.94787 3.98891 7.81342 3.93053 7.66538C3.87216 7.51735 3.84484 7.35889 3.85028 7.19986V4.80014H1.45056ZM5.05014 1.20056V7.19986H11.0494V1.20056H5.05014Z"
                      fill="white"
                    />
                  </svg>
                </S.Link>
              </CopyToClipboard>

              <S.Link
                href={`${poolInfo?.chain.blockExplorerUrl}address/${investor}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.30469 0.934974C7.30469 0.634338 7.56826 0.390625 7.8934 0.390625L11.4257 0.390625C11.7508 0.390625 12.0144 0.634338 12.0144 0.934974V4.20107C12.0144 4.50171 11.7508 4.74542 11.4257 4.74542C11.1005 4.74542 10.837 4.50171 10.837 4.20107V2.35839L4.77453 7.96398C4.54462 8.17656 4.17187 8.17656 3.94196 7.96398C3.71205 7.7514 3.71205 7.40673 3.94196 7.19415L10.1225 1.47932H7.8934C7.56826 1.47932 7.30469 1.23561 7.30469 0.934974ZM2.00442 3.44026C1.84829 3.44026 1.69854 3.49761 1.58814 3.5997C1.47773 3.70178 1.41571 3.84024 1.41571 3.98461L1.41571 9.97245C1.41571 10.1168 1.47773 10.2553 1.58814 10.3574C1.69854 10.4594 1.84829 10.5168 2.00442 10.5168H8.48027C8.63641 10.5168 8.78615 10.4594 8.89656 10.3574C9.00696 10.2553 9.06899 10.1168 9.06899 9.97245V6.70636C9.06899 6.40572 9.33256 6.16201 9.6577 6.16201C9.98284 6.16201 10.2464 6.40572 10.2464 6.70636V9.97245C10.2464 10.4056 10.0603 10.8209 9.72912 11.1272C9.39791 11.4334 8.94868 11.6055 8.48027 11.6055H2.00442C1.53601 11.6055 1.08679 11.4334 0.755572 11.1272C0.424356 10.8209 0.238281 10.4056 0.238281 9.97245L0.238281 3.98461C0.238281 3.5515 0.424356 3.13613 0.755572 2.82987C1.08679 2.52362 1.53601 2.35156 2.00442 2.35156H5.5367C5.86184 2.35156 6.12542 2.59528 6.12542 2.89591C6.12542 3.19655 5.86184 3.44026 5.5367 3.44026H2.00442Z"
                    fill="white"
                  />
                </svg>
              </S.Link>
            </S.LinksContainer>
          </S.Address>
        ))}
      </S.AddressesContainer>

      <S.ButtonContainer>
        <Button
          text="Add Investor"
          onClick={() => setIsAddInvestorModal(true)}
        />

        <Button
          text="Remove Investor"
          onClick={() => setIsRemoveInvestorModal(true)}
        />
      </S.ButtonContainer>

      {isAddInvestorModal && (
        <AddInvestorModal onClose={() => setIsAddInvestorModal(false)} />
      )}

      {isRemoveInvestorModal && (
        <RemoveInvestorModal onClose={() => setIsRemoveInvestorModal(false)} />
      )}

      {isPrivacyModal && (
        <PrivacySettingsModal onClose={() => setIsPrivacyModal(false)} />
      )}
    </S.PrivacySettings>
  )
}

export default PrivacySettings
