import Blockies from 'react-blockies'
import Jazzicon from 'react-jazzicon/dist/Jazzicon'
import { jsNumberForAddress } from 'react-jazzicon'

import * as S from './styles'
import Link from 'next/link'

interface IItemInformationProps {
  name: string;
  description: string;
  userWalletAddress?: string;
  ImageUrl?: string;
  title?: string;
  tokenName?: string;
  newWeight?: string;
  weight?: string;
}

const ItemInformation = (props: IItemInformationProps) => {
  return (
    <S.ItemInformation>
      <p>{props.title}</p>
      <S.TitleInfoContainer>
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
            <Blockies
              className="poolIcon"
              seed={props.tokenName ?? props.name}
              scale={6}
              size={6}
            />
          )}

          <S.TitleInfo>
            {props.weight ? (
              <S.WeightsWrapper>
                <p>{props.weight}%</p>
                <img
                  src="/assets/utilities/arrow-right.svg"
                  alt=""
                  width={14}
                />
                <p>{props.newWeight}%</p>
              </S.WeightsWrapper>
            ) : (
              <>
                <p>{props.name}</p>
                {props?.userWalletAddress ? (
                  <Link href={`/profile/${props.userWalletAddress}`} passHref>
                    <a>
                      <span>{props.description}</span>
                    </a>
                  </Link>
                ) : (
                  <span>{props.description}</span>
                )}
              </>
            )}
          </S.TitleInfo>
        </S.TitleInfoContent>
      </S.TitleInfoContainer>
    </S.ItemInformation>
  )
}

export default ItemInformation
