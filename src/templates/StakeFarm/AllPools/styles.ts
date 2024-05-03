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

  .button {
    font-family: Rubik;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.4rem;
    color: #fcfcfc;
    width: 15.4rem;
    white-space: nowrap;
  }
`

export const TextContent = styled.p`
  font-family: Rubik;
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 3.2rem;
  white-space: nowrap;
`

export const PoolsNumber = styled.span`
  font-family: Rubik;
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 3.2rem;
  color: rgba(143, 143, 143, 1);
`
