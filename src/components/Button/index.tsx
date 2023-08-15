import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from 'react'
import * as S from './styles'

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>

export type ISizeProps = 'small' | 'claim' | 'medium' | 'large' | 'huge'
export type IBackgroudProps = 'primary' | 'secondary' | 'black' | 'transparent'
export type IbackgroundVoteProps = {
  voteState: 'against' | 'favor' | 'vote-open' | 'disable'
  type: string
}

export type ButtonProps = {
  text?: string
  as?: React.ElementType
  size?: ISizeProps
  background?: IBackgroudProps
  backgroundVote?: IbackgroundVoteProps
  fullWidth?: boolean
  disabledNoEvent?: boolean
  image?: string
  icon?: JSX.Element
} & ButtonTypes

const ButtonBase: React.ForwardRefRenderFunction<
  S.IWrapperProps,
  ButtonProps
> = (
  {
    // children,
    icon,
    size = 'medium',
    background = 'default',
    backgroundVote = { voteState: undefined, type: undefined },
    fullWidth = false,
    disabledNoEvent = false,
    text,
    image = '',
    ...props
  },
  ref
) => {
  return (
    <S.Wrapper
      size={size}
      fullWidth={fullWidth}
      hasIcon={!!icon}
      disabledNoEvent={disabledNoEvent}
      disabled={disabledNoEvent}
      backgroundVote={backgroundVote}
      background={background}
      ref={ref}
      {...props}
    >
      {image.length > 0 ? (
        <S.ImgWrapper>
          <img src={image} alt="User image" width={18} height={18} />
        </S.ImgWrapper>
      ) : (
        icon
      )}
      {text}
    </S.Wrapper>
  )
}

const Button = forwardRef(ButtonBase)

export default Button
