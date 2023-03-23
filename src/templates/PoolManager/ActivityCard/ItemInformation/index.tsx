import Blockies from 'react-blockies'
import Jazzicon from 'react-jazzicon/dist/Jazzicon'
import { jsNumberForAddress } from 'react-jazzicon'

import * as S from './styles'

interface IItemInformationProps {
  title: string;
  name: string;
  ImageUrl?: string;
  description: string;
  userWalletAddress?: string;
}

const ItemInformation = (props: IItemInformationProps) => {
  return (
    <S.ItemInformation>
      <p>{props.title}</p>
      <S.TitleInfoContent>
        {props.ImageUrl ? (
          <img src={props.ImageUrl} alt="" width={32} height={32} />
        ) : props.userWalletAddress ? (
          <Jazzicon
            seed={jsNumberForAddress(
              String(props.userWalletAddress) ||
                '0x1111111111111111111111111111111111111111'
            )}
            diameter={32}
          />
        ) : (
          <Blockies className="poolIcon" seed={props.name} scale={6} size={6} />
        )}

        <S.TitleInfo>
          <p>{props.name}</p>
          <span>{props.description}</span>
        </S.TitleInfo>
      </S.TitleInfoContent>
    </S.ItemInformation>
  )
}

export default ItemInformation
