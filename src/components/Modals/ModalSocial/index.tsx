import React from 'react'

import Overlay from '../../Overlay'

import {
  BorderGradient,
  BackgroundBlack,
  Content,
  InterBackground,
  ModalText,
  WrapperIcons
} from './styles'

interface IModalSocialProps {
  modalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalSocial = ({ modalOpen, setModalOpen }: IModalSocialProps) => {
  function handleCloseModal() {
    setModalOpen(false)
  }

  return (
    <>
      <Overlay onClick={handleCloseModal} />

      <BorderGradient modalOpen={modalOpen}>
        <BackgroundBlack>
          <InterBackground>
            <ModalText>
              <span>Connect with us</span>
            </ModalText>
            <button type="button" onClick={() => setModalOpen(false)}>
              <img src="assets/utilities/close-icon.svg" alt="" />{' '}
            </button>
          </InterBackground>
          <Content>
            <div>
              <WrapperIcons>
                <a
                  href="https://discord.gg/2uGEvqNnuq"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="assets/socialMidia/discord.svg" alt="" />
                </a>
                <span>Discord</span>
              </WrapperIcons>
              <WrapperIcons>
                <a
                  href="https://t.me/KassandraDAO"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="assets/socialMidia/telegram.svg" alt="" />
                </a>
                <span>Telegram</span>
              </WrapperIcons>
              <WrapperIcons>
                <a
                  href="https://github.com/KassandraFinance"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="assets/socialMidia/github.svg" alt="" />
                </a>
                <span>GitHub</span>
              </WrapperIcons>
              <WrapperIcons>
                <a
                  href="https://kassandrafoundation.medium.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="assets/socialMidia/medium.svg" alt="" />
                </a>
                <span>Medium</span>
              </WrapperIcons>
              <WrapperIcons>
                <a
                  href="https://twitter.com/dao_kassandra"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="assets/socialMidia/twitter.svg" alt="" />
                </a>
                <span>Twitter</span>
              </WrapperIcons>
            </div>
          </Content>
        </BackgroundBlack>
      </BorderGradient>
    </>
  )
}

export default ModalSocial
