import Blockies from 'react-blockies'

import * as S from './styles'

interface IPoolInfoProps {
  title?: string
  logo?: string
  name: string
  description: string
}

const PoolInfo = ({ description, name, logo, title }: IPoolInfoProps) => {
  return (
    <S.PoolInfo>
      <p>{title}</p>

      <S.PoolInfoContainer>
        {logo ? (
          <img src={logo} alt="" width={32} height={32} />
        ) : (
          <Blockies className="poolIcon" seed={name} scale={6} size={6} />
        )}

        <S.PoolInfoContent>
          <p>{name}</p>
          <span>{description}</span>
        </S.PoolInfoContent>
      </S.PoolInfoContainer>
    </S.PoolInfo>
  )
}

export default PoolInfo
