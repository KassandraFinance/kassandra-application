import theme from '@/styles/theme'
import styled, { css } from 'styled-components'

interface WrapperProps {
  isPowerVotingSection?: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  background: ${props =>
    props.isPowerVotingSection ? `rgba(252, 252, 252, 0.05)` : null};
  padding: 4rem;

  @media (max-width: 960px) {
    padding: 2.4rem;
  }

  @media (max-width: 768px) {
    padding: 1.6rem;
  }
`

export const ContentWrapper = styled.div`
  max-width: 114rem;
  margin-inline: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`

export const TitleContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  height: 4rem;
  border-bottom: 1px solid rgba(252, 252, 252, 0.05);
  font-family: Rubik;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.87rem;
`

export const Content = styled.div`
  width: 100%;
  border-radius: 1.6rem;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(252, 252, 252, 0.08);
`

export const TopContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-inline: 1.6rem;
  padding-block: 3.2rem;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2.4rem;
    padding-block: 2.4rem;

    button {
      width: 100%;
    }
  }
`

export const TopContentMobile = styled.div`
  display: hidden;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
`

export const PoolNameAndImage = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`

export const Imagecontainer = styled.div`
  ${() => css`
    position: relative;

    width: 3.2rem;
    height: 3.2rem;
  `}
`

export const ImageWrapper = styled.div`
  ${() => css`
    position: relative;

    overflow: hidden;

    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
  `}
`

export const ChainLogoWrapper = styled.div`
  ${({ theme }) => css`
    position: absolute;
    right: -0.5rem;
    bottom: 0;

    overflow: hidden;

    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;

    background-color: ${theme.colors.white};
  `}
`

export const PoolText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

export const PoolTitle = styled.p`
  font-family: Rubik;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.16rem;
  letter-spacing: 0.05em;
`

export const LabelsContainer = styled.div`
  display: flex;
  gap: 0.8rem;
`

export const RegularContent = styled.div`
  display: flex;
  gap: 4.8rem;

  @media (max-width: 1180px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.4rem;
    column-gap: 4.8rem;
  }

  @media (max-width: 768px) {
    display: flex;
    gap: 1.6rem;
    width: 100%;
  }
`
export const RegularColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.8rem;
  width: fit-content;

  h3 {
    font-family: Rubik;
    font-size: 1.4rem;
    font-weight: 300;
    line-height: 1.8rem;
    color: #bdbdbd;
  }
  span {
    color: #bdbdbd;
  }
  p {
    font-family: Rubik;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.4rem;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`
export const BoldColumn = styled(RegularColumn)`
  h3 {
    font-weight: 500;
  }

  p {
    color: #26dbdb;
  }
`

interface IconWrapperProps {
  isExpanded?: boolean
}

export const IconWrapperDesktop = styled.div<IconWrapperProps>`
  position: relative;
  display: flex;
  width: 2.4rem;
  height: 1.4rem;

  img {
    cursor: pointer;
    ${props => (props.isExpanded ? `transform: rotate(180deg)` : null)};
    transition: transform 300ms ease-in-out;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

export const IconWrapperMobile = styled(IconWrapperDesktop)`
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`

export const ExpandedWrapper = styled.div`
  width: 100%;
  border-top: 1px solid rgba(252, 252, 252, 0.08);
`

export const ExpandedContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding-inline: 1.6rem;
  padding-block: 2.4rem;
  gap: 3.2rem;

  @media (max-width: 900px) {
    gap: 1.6rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
export const ExpandedTextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`

export const BlocksWrapper = styled.div`
  display: flex;
  gap: 3.2rem;
  width: 100%;

  @media (max-width: 900px) {
    gap: 1.6rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
export const ExpandedContentBlock = styled.div`
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  background: rgba(252, 252, 252, 0.05);
  border: 1px solid rgba(252, 252, 252, 0.15);
  border-radius: 0.8rem;
  font-size: 1.6rem;
  font-weight: 300;
  line-height: 1.8rem;

  p {
    display: flex;
    justify-content: space-between;
  }

  span {
    font-weight: 500;
    color: #fcfcfc;
  }
`
export const ExpandedFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.6rem;
  font-weight: 300;
  line-height: 1.6rem;
`

export const ExpandedFooterButton = styled.div`
  display: flex;
  gap: 1.2rem;
`

export const AddToken = styled.button`
  background-color: transparent;
  border: none;
  color: ${theme.colors.snow};

  display: flex;
  align-items: center;
  gap: 0.4rem;

  font-family: ${theme.font.family};
  font-size: ${theme.font.sizes.font14};
  font-weight: ${theme.font.weight.light};

  margin-top: 8px;

  cursor: pointer;
  outline: none;
  transition: 0.15s;

  &:hover {
    color: ${theme.colors.cyan};
  }
  img {
    max-width: 14px;
    margin-left: 8px;
  }
`

export const ExpandedContentButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  button {
    max-width: 28.6rem;
    min-width: 20rem;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;

    button {
      min-width: 10rem;
      max-width: none;
      width: 100%;
    }
  }
`
