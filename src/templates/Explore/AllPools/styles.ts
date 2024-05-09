import styled from 'styled-components'

export const AllPoolsWrapper = styled.div``

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.2rem;
  border-radius: 0.8rem;
  border: 0.1rem solid rgba(252, 252, 252, 0.08);
  padding: 2.4rem;
  background: rgba(252, 252, 252, 0.05);

  margin-top: 5.6rem;

  .button {
    font-family: Rubik;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 1.4rem;
    color: #fcfcfc;
    width: 25rem;
    white-space: nowrap;
  }

  @media (max-width: 960px) {
    flex-direction: column;
  }
`

export const TextContent = styled.p`
  font-family: Rubik;
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 3.2rem;
  white-space: nowrap;

  span {
    display: block;
    opacity: 0.75;
    font-size: 1.4rem;
  }

  @media (max-width: 560px) {
    font-size: 1.8rem;
    line-height: 2.4rem;
  }
`

export const PoolsNumber = styled.span`
  font-family: Rubik;
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 3.2rem;
  color: rgba(143, 143, 143, 1);
`
