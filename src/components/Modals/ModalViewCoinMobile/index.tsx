import React from 'react'

import Overlay from '../../Overlay'
import { ITokenModalProps } from '../../../templates/Manage/CreatePool/Review/PoolReview'

import * as S from './styles'

interface IModalViewCoinMobileProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tokenForModal?: ITokenModalProps;
}

const ModalViewCoinMobile = ({
  modalOpen,
  setModalOpen,
  tokenForModal
}: IModalViewCoinMobileProps) => {
  const [isAnimation, setisAnimation] = React.useState(true)

  function handleCloseModal() {
    setisAnimation(false)
  }

  return (
    <>
      <Overlay onClick={handleCloseModal} />

      <S.ModalViewCoinMobile
        modalOpen={modalOpen}
        isAnimation={isAnimation}
        onAnimationEnd={() => !isAnimation && setModalOpen(false)}
      >
        <S.ModalCoinHeader>
          <S.Coin>
            <img src={tokenForModal?.icon} alt="" width={18} height={18} />
            <p>{tokenForModal?.name}</p>
          </S.Coin>
          <span onClick={() => handleCloseModal()}>
            <img
              src="/assets/utilities/close-icon.svg"
              alt=""
              width={10}
              height={10}
            />
          </span>
        </S.ModalCoinHeader>
        <S.ModalCoinBody>
          {tokenForModal?.tokenData.map(item => (
            <S.CoinData key={item.name}>
              <p>{item.name}</p>
              <span>{item.value}</span>
            </S.CoinData>
          ))}
        </S.ModalCoinBody>
      </S.ModalViewCoinMobile>
    </>
  )
}

export default ModalViewCoinMobile
