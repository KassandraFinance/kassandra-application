import React from 'react'
import Image from 'next/image'

import ImageProfile from '@/components/Governance/ImageProfile'
import eyeShowIcon from '@assets/utilities/eye-show.svg'

import * as S from './styles'
import {
  TR,
  TD,
  Value,
  ViewButton
} from '@/templates/Explore/CommunityPoolsTable/styles'

interface IManagerInfoProps {
  handleView: any;
  isLinkAddress?: boolean;
  inViewCollum: number;
  managerInfo: {
    rank: number,
    address: string,
    poolCount: number,
    valueManaged: string,
    changeMonthly: string,
    changeDay: string,
    voteWeight: string
  };
}

const ManagerInfo = ({
  managerInfo,
  handleView,
  inViewCollum,
  isLinkAddress = false
}: IManagerInfoProps) => {
  return (
    <S.ManagerInfo>
      <TR key={managerInfo.address}>
        <TD>
          <Value align="left">{managerInfo.rank}</Value>
        </TD>
        <TD>
          <ImageProfile
            address={managerInfo.address}
            diameter={24}
            hasAddress={true}
            isLink={isLinkAddress}
            tab="?tab=managed-funds"
          />
        </TD>
        <TD isView={inViewCollum === 1}>
          <Value>${managerInfo.valueManaged}</Value>
        </TD>
        <TD isView={inViewCollum === 2}>
          <Value>{managerInfo.poolCount}</Value>
        </TD>
        <TD isView={inViewCollum === 3}>
          <Value value={Number(managerInfo.changeMonthly)}>
            {managerInfo.changeMonthly}%
          </Value>
        </TD>
        <TD isView={inViewCollum === 4}>
          <Value value={Number(managerInfo.changeDay)}>
            {managerInfo.changeDay}%
          </Value>
        </TD>
        <TD isView={inViewCollum === 5}>
          <Value>{managerInfo.voteWeight}%</Value>
        </TD>

        <TD id="eyeIcon">
          <ViewButton type="button" onClick={() => handleView({ managerInfo })}>
            <Image src={eyeShowIcon} />
          </ViewButton>
        </TD>
      </TR>
    </S.ManagerInfo>
  )
}

export default ManagerInfo
