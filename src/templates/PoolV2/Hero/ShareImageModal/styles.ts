import { WarningCard } from '@/components/WarningCard/styles'
import styled from 'styled-components'

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1030;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  max-width: 100%;
  height: 100vh;

  background-color: rgb(0 0 0 / 0.7);

  @media (max-width: 500px) {
    align-items: flex-end;
  }
`

export const ModalContainer = styled.div`
  border-radius: 12px;

  @media (max-width: 1130px) {
    width: 98.5vw;
  }

  @media (max-width: 500px) {
    width: 100vw;
  }
`

export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 2.4rem;
  border-top-left-radius: 1.2rem;
  border-top-right-radius: 1.2rem;

  font-weight: 500;
  font-size: 1.6rem;

  background-color: rgb(31 31 31);

  .close-modal {
    cursor: pointer;
  }
`

export const ModalBody = styled.div`
  display: flex;

  padding: 2.4rem;
  border-bottom-right-radius: 1.2rem;
  border-bottom-left-radius: 1.2rem;

  background: linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%);

  @media (max-width: 500px) {
    display: block;

    padding: 3.4rem 2.2rem;
  }
`

export const SocialMediaContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 1.6rem;
  justify-content: space-between;
  order: -1;

  margin-right: 3.2rem;

  @media (max-width: 500px) {
    flex-direction: row;
    gap: 3.2rem;

    margin-right: 0;
  }
`

export const SocialMedia = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;

  min-width: 5.6rem;

  font-size: 1.2rem;
  text-transform: uppercase;

  cursor: pointer;

  &.last {
    @media (max-width: 900px) {
      display: none;
    }
  }

  @media (max-width: 550px) {
    min-width: 0;
    max-width: 4.2rem;
  }

  @media (max-width: 500px) {
    min-width: 0;
    max-width: 5.6rem;
  }
`

export const ImageWrapper = styled.div`
  ${WarningCard} {
    min-height: auto;
    max-width: 100%;
    margin-bottom: 3.2rem;

    border-radius: 8px;
    border: 1px solid rgba(252, 252, 252, 0.15);
    background: rgba(252, 252, 252, 0.05);
  }
`

export const ImageContainer = styled.div`
  ::-webkit-scrollbar {
    width: 0.8rem;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;

    background: linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%);
  }

  @media (max-width: 1130px) {
    overflow-x: scroll;

    width: 100%;
  }

  @media (max-width: 500px) {
    width: 0;
    height: 0;

    opacity: 0;
    visibility: hidden;
  }
`
