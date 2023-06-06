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
  const [
    {
      chains, // the list of chains that web3-onboard was initialized with
      settingChain // boolean indicating if the chain is in the process of being set
    },
    setChain // function to call to initiate user to switch chains in their wallet
  ] = useSetChain()

  function handleCloseModal() {
    setIsChooseNetwork(false)
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
                onClick={() =>
                  setChain({
                    chainId: chain.id,
                    chainNamespace: chain.namespace
                  })
                }
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
