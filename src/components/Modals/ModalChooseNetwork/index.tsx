import Image from 'next/image'
import { useSetChain } from '@web3-onboard/react'

import Modal from '../Modal'
import Overlay from '../../Overlay'

import * as S from './styles'

interface IChooseNetworkProps {
  isOpen: boolean
  setIsChooseNetwork: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalChooseNetwork = ({
  isOpen,
  setIsChooseNetwork
}: IChooseNetworkProps) => {
  const [{ chains, settingChain }, setChain] = useSetChain()

  function handleCloseModal() {
    setIsChooseNetwork(false)
  }

  async function handleChangeChain(chainId: string, chainNamespace?: string) {
    const response = await setChain({ chainId, chainNamespace })

    if (response) return handleCloseModal()
  }

  return (
    <S.ModalChooseNetwork>
      <Overlay onClick={handleCloseModal} isOpen={isOpen} />

      <Modal title="Choose Network" onCloseModal={handleCloseModal}>
        <S.ModalContent>
          {chains.map(chain => {
            const svgStr = chain?.icon || '<svg></svg>'
            const svg = new Blob([svgStr], { type: 'image/svg+xml' })
            const url = URL.createObjectURL(svg)

            return (
              <S.WrapperIconsBackGround
                key={chain.id}
                disabled={settingChain}
                onClick={() => handleChangeChain(chain?.id, chain?.namespace)}
              >
                <S.WrapperIcons>
                  <Image src={url} width={24} height={24} />

                  <span>{chain.label}</span>
                </S.WrapperIcons>
              </S.WrapperIconsBackGround>
            )
          })}
        </S.ModalContent>
      </Modal>
    </S.ModalChooseNetwork>
  )
}

export default ModalChooseNetwork
