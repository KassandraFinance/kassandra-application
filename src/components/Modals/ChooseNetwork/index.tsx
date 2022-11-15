import Image from 'next/image'

import closeIcon from '../../../../public/assets/utilities/close-icon.svg'
import avalanche from '../../../../public/assets/logos/avalanche.svg'
import polygon from '../../../../public/assets/logos/polygon.svg'

import * as S from './styles'

interface IChooseNetworkProps {
  setIsChooseNetwork: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChooseNetwork = ({ setIsChooseNetwork }: IChooseNetworkProps) => {
  function handleCloseModal() {
    setIsChooseNetwork(false)
  }

  return (
    <>
      <S.Overlay onClick={handleCloseModal}></S.Overlay>

      <S.ChooseNetwork>
        <S.ModalHeader>
          <S.TitleWrapper>Choose Network</S.TitleWrapper>

          <S.CloseButton onClick={handleCloseModal}>
            <Image src={closeIcon} alt="Close" width={12} height={12} />
          </S.CloseButton>
        </S.ModalHeader>

        <S.ModalBody>
          <S.WrapperIconsBackGround>
            <S.WrapperIcons>
              <Image src={avalanche} width={24} height={24} />

              <span>Avalanche</span>
            </S.WrapperIcons>
          </S.WrapperIconsBackGround>

          <S.WrapperIconsBackGround disabled>
            <S.WrapperIcons>
              <Image src={polygon} width={24} height={24} />

              <span>Polygon</span>

              <span>Coming soon...</span>
            </S.WrapperIcons>
          </S.WrapperIconsBackGround>
        </S.ModalBody>
      </S.ChooseNetwork>
    </>
  )
}

export default ChooseNetwork
