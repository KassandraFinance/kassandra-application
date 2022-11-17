import * as S from './styles'

interface IOverlayProps {
  isShowMenu: boolean;
  onClick: () => void;
  onAnimationEnd: () => void;
}

const Overlay = ({ onClick, isShowMenu, onAnimationEnd }: IOverlayProps) => {
  return (
    <S.Overlay
      isShowMenu={isShowMenu}
      onClick={onClick}
      onAnimationEnd={() => {
        if (isShowMenu === false) {
          onAnimationEnd()
        }
      }}
    />
  )
}

export default Overlay
