import Image from 'next/image'

import changeChain from '../../../utils/changeChain'
import { networks } from '../../../constants/tokenAddresses'

import Modal from '../Modal'
import Overlay from '../../Overlay'

import avalanche from '../../../../public/assets/logos/avalanche.svg'
import polygon from '../../../../public/assets/logos/polygon.svg'

import * as S from './styles'

interface IChooseNetworkProps {
  isOpen: boolean;
  setIsChooseNetwork: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalChooseNetwork = ({
  isOpen,
  setIsChooseNetwork
}: IChooseNetworkProps) => {
  function handleCloseModal() {
    setIsChooseNetwork(false)
  }

  const avalancheNetwork = networks[43114]
  const polygonNetwork = networks[137]

  return (
    <S.ModalChooseNetwork>
      <Overlay onClick={handleCloseModal} isOpen={isOpen} />

      <Modal title="Choose Network" onCloseModal={handleCloseModal}>
        <S.ModalContent>
          <S.WrapperIconsBackGround
            onClick={() =>
              changeChain({
                chainId: avalancheNetwork.chainId,
                chainName: avalancheNetwork.chainName,
                rpcUrls: [avalancheNetwork.rpc],
                nativeCurrency: avalancheNetwork.nativeCurrency,
                callbackFunction: handleCloseModal
              })
            }
          >
            <S.WrapperIcons>
              <Image src={avalanche} width={24} height={24} />

              <span>Avalanche</span>
            </S.WrapperIcons>
          </S.WrapperIconsBackGround>

          <S.WrapperIconsBackGround
            onClick={() =>
              changeChain({
                chainId: polygonNetwork.chainId,
                chainName: polygonNetwork.chainName,
                rpcUrls: [polygonNetwork.rpc],
                nativeCurrency: polygonNetwork.nativeCurrency,
                callbackFunction: handleCloseModal
              })
            }
          >
            <S.WrapperIcons>
              <Image src={polygon} width={24} height={24} />

              <span>Polygon</span>
            </S.WrapperIcons>
          </S.WrapperIconsBackGround>
        </S.ModalContent>
      </Modal>
    </S.ModalChooseNetwork>
  )
}

export default ModalChooseNetwork
