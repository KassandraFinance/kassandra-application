import * as S from './styles'

interface IStatusIndicatorProps {
  color: string
  isLoading: boolean
}

const StatusIndicator = ({ color, isLoading }: IStatusIndicatorProps) => {
  return <S.StatusIndicator color={color} isLoading={isLoading} />
}

export default StatusIndicator
