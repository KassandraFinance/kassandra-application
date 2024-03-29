import React from 'react'
import { useRouter } from 'next/router'
import CopyToClipboard from 'react-copy-to-clipboard'
import Image from 'next/image'
import { useConnectWallet } from '@web3-onboard/react'
import { ZeroAddress } from 'ethers'

import { networks } from '@/constants/tokenAddresses'

import useManagePoolController, {
  managePoolController
} from '@/hooks/useManagePoolController'
import { useManagerPoolInfo } from '@/hooks/query/useManagerPoolInfo'
import useTransaction from '@/hooks/useTransaction'

import substr from '@/utils/substr'
import { registerToken } from '../../../utils/registerToken'

import Strategy from './Strategy'
import PoolImage from './PoolImage'
import PrivacySettings from './PrivacySettings'
import TitleSection from '@/components/TitleSection'
import PoolStrategyControl from './PoolStrategyControl'
import TransferOwnership from './TransferOwnership'

import privacyIcon from '@assets/iconGradient/product-bar.svg'
import notFound from '@assets/icons/coming-soon.svg'

import * as S from './styles'

const Details = () => {
  const [currentCandidate, setcurrentCandidate] = React.useState('')

  const router = useRouter()
  const [{ wallet }] = useConnectWallet()

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { data: poolInfo } = useManagerPoolInfo({
    manager: wallet?.accounts[0].address,
    id: poolId
  })

  const poolControllerAddress = poolInfo ? poolInfo[0].controller : ZeroAddress
  const chainId = poolInfo ? poolInfo[0].chain_id : 0

  const { txNotification, transactionErrors } = useTransaction()
  const { setStrategist, transferOwnership } = useManagePoolController(
    poolControllerAddress,
    networks[chainId]?.rpc
  )

  async function handleChangeStrategy(address: string) {
    const transactionText = {
      success: 'New strategist added!'
    }

    return await setStrategist(address, transactionText)
  }

  async function handleTransferOwnership(address: string) {
    const response = await handleChangeStrategy(address)

    function handleSuccess() {
      setcurrentCandidate(address)
    }

    const transactionSuccess = 1
    if (response?.status === transactionSuccess) {
      const transactionText = {
        success: 'New manager added!'
      }

      await transferOwnership(address, transactionText, handleSuccess)
    }
  }

  async function getCurrentManagerCandidate() {
    const poolController = await managePoolController(
      poolControllerAddress,
      networks[chainId]?.rpc,
      { wallet, txNotification, transactionErrors }
    )

    const currentCandidate = await poolController.getManagerCandidate()
    setcurrentCandidate(currentCandidate)
  }

  React.useEffect(() => {
    if (poolControllerAddress === ZeroAddress) return

    getCurrentManagerCandidate()
  }, [poolInfo])

  return (
    <S.Details>
      <S.Wrapper1>
        <Strategy />

        {poolInfo && (
          <S.Contract>
            <S.Title>Contract</S.Title>

            <S.ContractInfoContainer>
              <Image
                src={poolInfo[0]?.chain?.logo || notFound}
                width={17}
                height={17}
              />

              <S.ChainName>{poolInfo[0]?.chain?.name}</S.ChainName>

              <CopyToClipboard text={poolInfo[0]?.address}>
                <S.Address>
                  {substr(poolInfo[0]?.address || '')}

                  <svg
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.00068 12.3334H1.16735C1.01269 12.3387 0.858581 12.3122 0.714603 12.2555C0.570625 12.1988 0.439858 12.113 0.330432 12.0036C0.221007 11.8942 0.135264 11.7634 0.0785358 11.6194C0.0218072 11.4755 -0.00469379 11.3214 0.000680608 11.1667L0.000680608 5.33336C-0.00469379 5.17871 0.0218072 5.0246 0.0785358 4.88062C0.135264 4.73664 0.221007 4.60587 0.330432 4.49645C0.439858 4.38702 0.570625 4.30128 0.714603 4.24455C0.858581 4.18782 1.01269 4.16132 1.16735 4.1667H3.50068V1.83336C3.49531 1.67871 3.52181 1.5246 3.57854 1.38062C3.63526 1.23664 3.72101 1.10587 3.83043 0.996448C3.93986 0.887023 4.07063 0.80128 4.2146 0.744551C4.35858 0.687823 4.51269 0.661322 4.66735 0.666696L10.5007 0.666696C10.6553 0.661322 10.8094 0.687823 10.9534 0.744551C11.0974 0.80128 11.2282 0.887023 11.3376 0.996448C11.447 1.10587 11.5328 1.23664 11.5895 1.38062C11.6462 1.5246 11.6727 1.67871 11.6673 1.83336V7.6667C11.6726 7.82133 11.6461 7.9754 11.5893 8.11934C11.5326 8.26328 11.4468 8.39401 11.3374 8.50342C11.228 8.61283 11.0973 8.69857 10.9533 8.75533C10.8094 8.81209 10.6553 8.83865 10.5007 8.83336H8.16735V11.1667C8.17264 11.3213 8.14608 11.4754 8.08932 11.6193C8.03256 11.7633 7.94681 11.894 7.8374 12.0034C7.728 12.1128 7.59726 12.1986 7.45333 12.2553C7.30939 12.3121 7.15532 12.3387 7.00068 12.3334ZM1.16735 5.33336V11.1667H7.00068V8.83336H4.66735C4.51271 8.83865 4.35864 8.81209 4.2147 8.75533C4.07076 8.69857 3.94003 8.61283 3.83062 8.50342C3.72122 8.39401 3.63547 8.26328 3.57871 8.11934C3.52195 7.9754 3.49539 7.82133 3.50068 7.6667V5.33336H1.16735ZM4.66735 1.83336V7.6667H10.5007V1.83336H4.66735Z"
                      fill="#bdbdbd"
                    />
                  </svg>
                </S.Address>
              </CopyToClipboard>

              <S.AddToken
                type="button"
                onClick={() => {
                  registerToken(
                    poolInfo[0]?.address,
                    poolInfo[0]?.symbol?.toLocaleUpperCase(),
                    Number(18)
                  )
                }}
              >
                <Image
                  src="/assets/logos/metamask.svg"
                  alt="metamask logo"
                  width={14}
                  height={14}
                />
              </S.AddToken>
            </S.ContractInfoContainer>

            <S.Text>Contract responsible for...</S.Text>
          </S.Contract>
        )}
      </S.Wrapper1>

      <S.Wrapper2>
        <PoolImage />

        {poolInfo && poolInfo[0]?.is_private_pool && (
          <>
            <S.TitleWrapper>
              <TitleSection title="Privacy settings" image={privacyIcon} />
            </S.TitleWrapper>

            <PrivacySettings />
          </>
        )}

        <PoolStrategyControl
          chainId={chainId}
          currentStrategy={poolInfo ? poolInfo[0].strategy : ''}
          handleChangeStrategy={handleChangeStrategy}
        />

        <TransferOwnership
          poolId={poolId}
          currentCandidate={currentCandidate.toLowerCase()}
          onTransferOwnership={handleTransferOwnership}
        />
      </S.Wrapper2>
    </S.Details>
  )
}

export default Details
