import React from 'react'
import Image from 'next/image'
import CopyToClipboard from 'react-copy-to-clipboard'

import ImageProfile from '@/components/Governance/ImageProfile'
import ModalViewCoin from '@/components/Modals/ModalViewCoin'

import arrowLeftBoldIcon from '@assets/utilities/arrow-left-bold.svg'
import arrowRightBoldIcon from '@assets/utilities/arrow-right-bold.svg'
import eyeShowIcon from '@assets/utilities/eye-show.svg'

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

const InvestorsTable = () => {
  const [inViewCollum, setInViewCollum] = React.useState(1)
  const [isOpen, setIsOpen] = React.useState(false)
  const [investorData, setInvestorData] = React.useState({
    logo: '',
    name: '',
    address: ''
  })
  const [lineData, setLineData] = React.useState({
    firstDeposit: '',
    lastDeposit: '',
    totalInvested: 0,
    investorShare: 0,
    percentage: 0,
    address: ''
  })

  function handleCurrentInView(n: number, columns: number) {
    setInViewCollum(prev => {
      const newPrev = prev + n
      if (newPrev < 1) {
        return columns
      } else if (newPrev > columns) {
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
    line: {
      firstDeposit: string,
      lastDeposit: string,
      totalInvested: number,
      investorShare: number,
      percentage: number,
      address: string
    }
  ) {
    setInvestorData({
      logo: logo || '',
      name: token,
      address: address
    })
    setLineData(line)
    setIsOpen(true)
  }

  return (
    <S.InvestorsTable>
      <THead>
        <TR>
          <TH>
            <ColumnTitle>Investor</ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 1}>
            <ColumnTitle align="right">First Deposit</ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 2}>
            <ColumnTitle align="right">Last Deposit</ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 3}>
            <ColumnTitle align="right">Total Invested</ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 4}>
            <ColumnTitle align="right">Investor Share</ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 5}>
            <ColumnTitle align="right">Percentage</ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 6}>
            <ColumnTitle align="right">Address</ColumnTitle>
          </TH>
          <TH>
            <TableViewButtonContainer>
              <TableViewButton onClick={() => handleCurrentInView(-1, 6)}>
                <Image src={arrowLeftBoldIcon} width={16} height={16} />
              </TableViewButton>

              <TableViewButton onClick={() => handleCurrentInView(1, 6)}>
                <Image src={arrowRightBoldIcon} width={16} height={16} />
              </TableViewButton>
            </TableViewButtonContainer>
          </TH>
        </TR>
      </THead>

      <TBody>
        <TR>
          <TD>
            <Value>
              <ImageProfile
                address="0x4097B714eCD64bE697e61D4f04925B666c8e4369"
                diameter={24}
                hasAddress={true}
                isLink={true}
                tab="?tab=portfolio"
              />
            </Value>
          </TD>
          <TD isView={inViewCollum === 1}>
            <Value>4 months</Value>
          </TD>
          <TD isView={inViewCollum === 2}>
            <Value>yesterday</Value>
          </TD>
          <TD isView={inViewCollum === 3}>
            <Value>$ 3,4567</Value>
          </TD>
          <TD isView={inViewCollum === 4}>
            <Value>425</Value>
          </TD>
          <TD isView={inViewCollum === 5}>
            <Value>37%</Value>
          </TD>
          <TD isView={inViewCollum === 6}>
            <CopyToClipboard text="0x4097B714eCD64bE697e61D4f04925B666c8e4369">
              <S.AddressContainer>
                <Value>0x4097B714eCD64bE697e61D4f04925B666c8e4369</Value>

                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.00068 12.3334H1.16735C1.01269 12.3387 0.858581 12.3122 0.714603 12.2555C0.570625 12.1988 0.439858 12.113 0.330432 12.0036C0.221007 11.8942 0.135264 11.7634 0.0785358 11.6194C0.0218072 11.4755 -0.00469379 11.3214 0.000680608 11.1667L0.000680608 5.33336C-0.00469379 5.17871 0.0218072 5.0246 0.0785358 4.88062C0.135264 4.73664 0.221007 4.60587 0.330432 4.49645C0.439858 4.38702 0.570625 4.30128 0.714603 4.24455C0.858581 4.18782 1.01269 4.16132 1.16735 4.1667H3.50068V1.83336C3.49531 1.67871 3.52181 1.5246 3.57854 1.38062C3.63526 1.23664 3.72101 1.10587 3.83043 0.996448C3.93986 0.887023 4.07063 0.80128 4.2146 0.744551C4.35858 0.687823 4.51269 0.661322 4.66735 0.666696L10.5007 0.666696C10.6553 0.661322 10.8094 0.687823 10.9534 0.744551C11.0974 0.80128 11.2282 0.887023 11.3376 0.996448C11.447 1.10587 11.5328 1.23664 11.5895 1.38062C11.6462 1.5246 11.6727 1.67871 11.6673 1.83336V7.6667C11.6726 7.82133 11.6461 7.9754 11.5893 8.11934C11.5326 8.26328 11.4468 8.39401 11.3374 8.50342C11.228 8.61283 11.0973 8.69857 10.9533 8.75533C10.8094 8.81209 10.6553 8.83865 10.5007 8.83336H8.16735V11.1667C8.17264 11.3213 8.14608 11.4754 8.08932 11.6193C8.03256 11.7633 7.94681 11.894 7.8374 12.0034C7.728 12.1128 7.59726 12.1986 7.45333 12.2553C7.30939 12.3121 7.15532 12.3387 7.00068 12.3334ZM1.16735 5.33336V11.1667H7.00068V8.83336H4.66735C4.51271 8.83865 4.35864 8.81209 4.2147 8.75533C4.07076 8.69857 3.94003 8.61283 3.83062 8.50342C3.72122 8.39401 3.63547 8.26328 3.57871 8.11934C3.52195 7.9754 3.49539 7.82133 3.50068 7.6667V5.33336H1.16735ZM4.66735 1.83336V7.6667H10.5007V1.83336H4.66735Z"
                    fill="#bdbdbd"
                  />
                </svg>
              </S.AddressContainer>
            </CopyToClipboard>
          </TD>

          <TD>
            <ViewButton
              type="button"
              onClick={() =>
                handleView(
                  '0x4097B714eCD64bE697e61D4f04925B666c8e4369',
                  '',
                  '0x4097B714eCD64bE697e61D4f04925B666c8e4369',
                  {
                    percentage: 37,
                    investorShare: 425,
                    totalInvested: 3.4567,
                    lastDeposit: 'yesterday',
                    firstDeposit: '4 months',
                    address: '0x4097B714eCD64bE697e61D4f04925B666c8e4369'
                  }
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
        title={investorData}
        isJazzicon
        onClick={() => setIsOpen(false)}
      >
        <TableLine>
          <TableLineTitle>First Deposit</TableLineTitle>

          <ValueContainer>
            <V>{lineData.firstDeposit}</V>
          </ValueContainer>
        </TableLine>

        <TableLine>
          <TableLineTitle>Last Deposit</TableLineTitle>

          <ValueContainer>
            <V>{lineData.lastDeposit}</V>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>Total Invested</TableLineTitle>

          <ValueContainer>
            <V>${lineData.totalInvested}</V>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>Investor Share</TableLineTitle>

          <ValueContainer>
            <V>{lineData.investorShare}</V>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>Percentage</TableLineTitle>

          <ValueContainer>
            <V>{lineData.percentage}%</V>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>Address</TableLineTitle>

          <ValueContainer>
            <CopyToClipboard text="0x4097B714eCD64bE697e61D4f04925B666c8e4369">
              <S.AddressContainer>
                <V>0x4097B714eCD64bE697e61D4f04925B666c8e4369</V>

                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.00068 12.3334H1.16735C1.01269 12.3387 0.858581 12.3122 0.714603 12.2555C0.570625 12.1988 0.439858 12.113 0.330432 12.0036C0.221007 11.8942 0.135264 11.7634 0.0785358 11.6194C0.0218072 11.4755 -0.00469379 11.3214 0.000680608 11.1667L0.000680608 5.33336C-0.00469379 5.17871 0.0218072 5.0246 0.0785358 4.88062C0.135264 4.73664 0.221007 4.60587 0.330432 4.49645C0.439858 4.38702 0.570625 4.30128 0.714603 4.24455C0.858581 4.18782 1.01269 4.16132 1.16735 4.1667H3.50068V1.83336C3.49531 1.67871 3.52181 1.5246 3.57854 1.38062C3.63526 1.23664 3.72101 1.10587 3.83043 0.996448C3.93986 0.887023 4.07063 0.80128 4.2146 0.744551C4.35858 0.687823 4.51269 0.661322 4.66735 0.666696L10.5007 0.666696C10.6553 0.661322 10.8094 0.687823 10.9534 0.744551C11.0974 0.80128 11.2282 0.887023 11.3376 0.996448C11.447 1.10587 11.5328 1.23664 11.5895 1.38062C11.6462 1.5246 11.6727 1.67871 11.6673 1.83336V7.6667C11.6726 7.82133 11.6461 7.9754 11.5893 8.11934C11.5326 8.26328 11.4468 8.39401 11.3374 8.50342C11.228 8.61283 11.0973 8.69857 10.9533 8.75533C10.8094 8.81209 10.6553 8.83865 10.5007 8.83336H8.16735V11.1667C8.17264 11.3213 8.14608 11.4754 8.08932 11.6193C8.03256 11.7633 7.94681 11.894 7.8374 12.0034C7.728 12.1128 7.59726 12.1986 7.45333 12.2553C7.30939 12.3121 7.15532 12.3387 7.00068 12.3334ZM1.16735 5.33336V11.1667H7.00068V8.83336H4.66735C4.51271 8.83865 4.35864 8.81209 4.2147 8.75533C4.07076 8.69857 3.94003 8.61283 3.83062 8.50342C3.72122 8.39401 3.63547 8.26328 3.57871 8.11934C3.52195 7.9754 3.49539 7.82133 3.50068 7.6667V5.33336H1.16735ZM4.66735 1.83336V7.6667H10.5007V1.83336H4.66735Z"
                    fill="#bdbdbd"
                  />
                </svg>
              </S.AddressContainer>
            </CopyToClipboard>
          </ValueContainer>
        </TableLine>
      </ModalViewCoin>
    </S.InvestorsTable>
  )
}

export default InvestorsTable
