import React from 'react'
import Image from 'next/image'

import ImageProfile from '@/components/Governance/ImageProfile'
import ModalViewCoin from '@/components/Modals/ModalViewCoin'

import arrowLeftBoldIcon from '../../../../public/assets/utilities/arrow-left-bold.svg'
import arrowRightBoldIcon from '../../../../public/assets/utilities/arrow-right-bold.svg'
import eyeShowIcon from '../../../../public/assets/utilities/eye-show.svg'

import * as S from './styles'
import {
  THead,
  TR,
  TH,
  ColumnTitle,
  TableViewButtonContainer,
  TableViewButton,
  TBody,
  TD,
  Value,
  ViewButton
} from '@/templates/Explore/CommunityPoolsTable/styles'
import {
  TableLine,
  TableLineTitle,
  ValueContainer,
  Value as V
} from '@ui/Modals/ModalViewCoin/styles'

const ManagersPoolTable = () => {
  const [inViewCollum, setInViewCollum] = React.useState(1)
  const [isOpen, setIsOpen] = React.useState(false)
  const [managerData, setManagerData] = React.useState({
    logo: '',
    name: '',
    address: ''
  })
  const [lineData, setLineData] = React.useState({
    rank: 0,
    valueManaged: 0,
    fundsManaged: 0,
    monthly: 0,
    day: 0,
    voteWeight: 0
  })

  function handleCurrentInView(n: number) {
    setInViewCollum(prev => {
      const newPrev = prev + n
      if (newPrev < 1) {
        return 5
      } else if (newPrev > 5) {
        return 1
      } else {
        return newPrev
      }
    })
  }

  function handleView(
    token: string,
    logo: string | null,
    address: string,
    rank: number,
    valueManaged: number,
    fundsManaged: number,
    monthly: number,
    day: number,
    voteWeight: number
  ) {
    setManagerData({
      logo: logo || '',
      name: token,
      address: address
    })
    setLineData({
      rank: rank,
      valueManaged: valueManaged,
      fundsManaged: fundsManaged,
      monthly: monthly,
      day: day,
      voteWeight: voteWeight
    })
    setIsOpen(true)
  }

  return (
    <S.ManagersPoolTable>
      <THead>
        <TR>
          <TH>
            <ColumnTitle>#</ColumnTitle>
          </TH>
          <TH>
            <ColumnTitle align="left">Manager</ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 1}>
            <ColumnTitle align="right">Value Managed</ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 2}>
            <ColumnTitle align="right">Pools Managed</ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 3}>
            <ColumnTitle align="right">Monthly</ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 4}>
            <ColumnTitle align="right">24h</ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 5}>
            <ColumnTitle align="right">Vote Weight</ColumnTitle>
          </TH>

          <TH>
            <TableViewButtonContainer>
              <TableViewButton onClick={() => handleCurrentInView(-1)}>
                <Image src={arrowLeftBoldIcon} width={16} height={16} />
              </TableViewButton>

              <TableViewButton onClick={() => handleCurrentInView(1)}>
                <Image src={arrowRightBoldIcon} width={16} height={16} />
              </TableViewButton>
            </TableViewButtonContainer>
          </TH>
        </TR>
      </THead>

      <TBody>
        <TR>
          <TD>
            <Value align="left">1</Value>
          </TD>
          <TD>
            <ImageProfile
              address="0x4097B714eCD64bE697e61D4f04925B666c8e4369"
              diameter={24}
              hasAddress={true}
              isLink={true}
              tab="?tab=portfolio"
            />
          </TD>
          <TD isView={inViewCollum === 1}>
            <Value>$394,34</Value>
          </TD>
          <TD isView={inViewCollum === 2}>
            <Value>3</Value>
          </TD>
          <TD isView={inViewCollum === 3}>
            <Value value={28}>28%</Value>
          </TD>
          <TD isView={inViewCollum === 4}>
            <Value value={8}>8%</Value>
          </TD>
          <TD isView={inViewCollum === 5}>
            <Value>10,21%</Value>
          </TD>

          <TD>
            <ViewButton
              type="button"
              onClick={() =>
                handleView(
                  '0x4097B714eCD64bE697e61D4f04925B666c8e4369',
                  '',
                  '0x4097B714eCD64bE697e61D4f04925B666c8e4369',
                  1,
                  394.34,
                  3,
                  28,
                  8,
                  10.21
                )
              }
            >
              <Image src={eyeShowIcon} />
            </ViewButton>
          </TD>
        </TR>
      </TBody>

      <ModalViewCoin
        isOpen={isOpen}
        title={managerData}
        isJazzicon
        onClick={() => setIsOpen(false)}
      >
        <TableLine>
          <TableLineTitle>Rank</TableLineTitle>

          <ValueContainer>
            <V>{lineData.rank}</V>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>Value Managed</TableLineTitle>
          <ValueContainer>
            <V>${lineData.valueManaged}</V>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>Funds Managed</TableLineTitle>
          <ValueContainer>
            <V>{lineData.fundsManaged}</V>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>Monthly</TableLineTitle>
          <ValueContainer>
            <V>{lineData.monthly}%</V>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>24h</TableLineTitle>
          <ValueContainer>
            <V>{lineData.day}%</V>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>Vote Weight</TableLineTitle>
          <ValueContainer>
            <V>{lineData.voteWeight}%</V>
          </ValueContainer>
        </TableLine>
      </ModalViewCoin>
    </S.ManagersPoolTable>
  )
}

export default ManagersPoolTable
