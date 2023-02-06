import React from 'react'
import Image from 'next/image'

import none from '../../../../public/assets/icons/coming-soon.svg'

import * as S from './styles'

interface TokenIconsProps {
  poolInfo: any[];
}

// const addressChanger: { [key: string]: string } = {
//   '0xd0F41b1C9338eB9d374c83cC76b684ba3BB71557':
//     '0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE', //SAVAX
//   '0xe28Ad9Fa07fDA82abab2E0C86c64A19D452b160E':
//     '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab', // WETH
//   '0xFA17fb53da4c837594127b73fFd09fdb15f42C49':
//     '0xd586e7f844cea2f87f50152665bcbc2c279d8d70', //DAI
//   '0xbbcED92AC9B958F88A501725f080c0360007e858':
//     '0x50b7545627a5162f82a992c33b87adc75187b218' //WBTC
// }

const FundTokenIcons = ({ poolInfo }: TokenIconsProps) => {
  return (
    <S.Container>
      {poolInfo
        .slice(0, poolInfo.length >= 3 ? 3 : poolInfo.length)
        .map((asset, index) => {
          return (
            <S.ImageWrapper key={index}>
              <Image
                src={asset.token.wraps?.logo ?? asset.token.logo ?? none}
                alt=""
                width={16}
                height={16}
              />
              <span>
                {(poolInfo[index].weight_normalized * 100).toFixed(2)}%
              </span>
            </S.ImageWrapper>
          )
        })}
    </S.Container>
  )
}

export default FundTokenIcons
