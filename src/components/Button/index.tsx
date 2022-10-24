/* eslint-disable @typescript-eslint/no-unused-vars */
import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from 'react'
import NftImage from '../NftImage'
import * as S from './styles'

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = {
  size?: 'small' | 'claim' | 'medium' | 'large' | 'huge',
  fullWidth?: boolean,
  backgroundPrimary?: boolean,
  backgroundSecondary?: boolean,
  backgroundBlack?: boolean,
  image?: string,
  isNFT?: boolean,
  backgroundVote?: {
    voteState: 'against' | 'favor' | 'vote-open' | 'disable',
    type: string
  },
  disabledNoEvent?: boolean,
  icon?: JSX.Element,
  as?: React.ElementType,
  text?: string
} & ButtonTypes

const ButtonBase: React.ForwardRefRenderFunction<
  S.WrapperProps,
  ButtonProps
> = (
  {
    children,
    icon,
    size = 'medium',
    fullWidth = false,
    backgroundPrimary = false,
    backgroundSecondary = false,
    backgroundVote = { voteState: undefined, type: undefined },
    backgroundBlack = false,
    disabledNoEvent = false,
    text,
    image = '',
    isNFT = false,

    ...props
  },
  ref
) => (
  <S.Wrapper
    size={size}
    fullWidth={fullWidth}
    hasIcon={!!icon}
    backgroundPrimary={backgroundPrimary}
    backgroundSecondary={backgroundSecondary}
    backgroundBlack={backgroundBlack}
    disabledNoEvent={disabledNoEvent}
    disabled={disabledNoEvent}
    backgroundVote={backgroundVote}
    {...props}
  >
    {image.length > 0 ? (
      <S.ImgWrapper>
        {!isNFT ? (
          <img src={image} alt="User image" />
        ) : (
          <NftImage NftUrl={image} imageSize="smallest" />
        )}
      </S.ImgWrapper>
    ) : (
      icon
    )}
    {text}
  </S.Wrapper>
)

const Button = forwardRef(ButtonBase)

export default Button
