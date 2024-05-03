import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  background: rgba(252, 252, 252, 0.05);
  padding: 4rem;
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
  gap: 1.6rem;
  height: 4rem;
  border-bottom: 1px solid rgba(252, 252, 252, 0.05);
  font-family: Rubik;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.87rem;
`

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-inline: 1.6rem;
  padding-block: 3.2rem;
  border-radius: 1.6rem;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(252, 252, 252, 0.08);
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
`
export const RegularColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    font-family: Rubik;
    font-size: 1.4rem;
    font-weight: 300;
    line-height: 1.8rem;
    color: #bdbdbd;
  }

  p {
    font-family: Rubik;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.4rem;

    span {
      color: #bdbdbd;
    }
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

export const IconWrapper = styled.div`
  width: 1.4rem;
  height: 2.4rem;
`

export const ExpandedContent = styled.div``
export const ExpandedTextContent = styled.div``
export const ExpandedContentBlock = styled.div``
export const ExpandedFooter = styled.div``
export const ExpandedContentButtons = styled.div``
