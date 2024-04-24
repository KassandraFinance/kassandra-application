import styled from 'styled-components'

export const PoolsDataWrapper = styled.div``

export const Content = styled.div`
  display: flex;
  gap: 3.2rem;

  @media (max-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.4rem;
  }

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 3.2rem;
  }
`

export const DataGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  border-radius: 1.6rem;
  background: rgba(252, 252, 252, 0.05);
  width: 26.1rem;
  padding-block: 1.6rem;
  justify-content: center;

  @media (max-width: 992px) {
    width: 100%;
  }
`

export const DataText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

export const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.8rem;
  width: 4.8rem;
  border-radius: 100%;
  background: rgba(252, 252, 252, 0.05);
`

export const MainText = styled.p`
  font-family: Rubik;
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 3.2rem;
`

export const Description = styled.p`
  font-family: Rubik;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2.4rem;
  color: #bdbdbd;
`
