import * as S from './styles'

interface ExplorePoolsDataProps {
  numDeposits: string
  numManagers: string
  poolCount: string
  whiteListNumber: string
}

export function ExplorePoolsData({
  numDeposits,
  numManagers,
  poolCount,
  whiteListNumber
}: ExplorePoolsDataProps) {
  const poolsData = [
    {
      icon: <img src="/assets/icons/pie.svg" alt="an icon of a chart pie" />,
      name: 'Portfolios',
      amount: poolCount
    },
    {
      icon: (
        <img
          src="/assets/icons/dollar-circle.svg"
          alt="an icon of a dollar symbol inside a circle"
        />
      ),
      name: 'Whitelisted Coins',
      amount: whiteListNumber
    },
    {
      icon: (
        <img
          src="/assets/icons/person-circle.svg"
          alt="an icon of person inside a circle"
        />
      ),
      name: 'Managers',
      amount: numManagers
    },
    {
      icon: <img src="/assets/icons/wallet.svg" alt="an icon of a wallet" />,
      name: 'Investors',
      amount: numDeposits
    }
  ]

  return (
    <S.PoolsDataWrapper>
      <S.Content>
        {poolsData.map(poolData => {
          return (
            <S.DataGroup>
              <S.Circle>{poolData.icon}</S.Circle>
              <S.DataText>
                <S.MainText>{poolData.amount}</S.MainText>
                <S.Description>{poolData.name}</S.Description>
              </S.DataText>
            </S.DataGroup>
          )
        })}
      </S.Content>
    </S.PoolsDataWrapper>
  )
}
