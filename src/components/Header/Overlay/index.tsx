import * as S from './styles'

interface IOverlayProps {
  onClick: () => void;
}

const Overlay = ({ onClick }: IOverlayProps) => {
  return <S.Overlay onClick={onClick} />
}

export default Overlay
