import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import ExternalLink from '../../../components/ExternalLink'

import iconBar from '../../../../public/assets/iconGradient/product-bar.svg'
import kacyLogo from '../../../../public/assets/logos/kacy-stake.svg'

import * as S from './styles'

const ActivityTable = () => {
  return (
    <>
      <S.ActivityTable>
        <S.Title>
          <Image src={iconBar} alt="Bar Icon" width={18} height={18} />
          <h2>Activity</h2>
        </S.Title>
        <S.Line />
        <S.Table>
          <thead>
            <S.Tr>
              <S.Th>TX Type</S.Th>
              <S.Th>Out</S.Th>
              <S.Th>In</S.Th>
              <S.Th>Address/Time</S.Th>
            </S.Tr>
          </thead>
          <tbody>
            <S.Tr>
              <S.TitleTransaction>
                <span>
                  Invest
                  <Link
                    href="https://snowtrace.io/address/0x38918142779e2CD1189cBd9e932723C968363D1E"
                    passHref
                  >
                    <a>
                      <Image
                        src="/assets/externalLink.svg"
                        alt="External Link"
                        width={16}
                        height={16}
                      />
                    </a>
                  </Link>
                </span>
                <p>Single asset</p>
              </S.TitleTransaction>
              <S.TransactionOutAndIn>
                <span>
                  <Image src={kacyLogo} alt="asd" width={16} height={16} /> 10
                </span>
                <p>$700,00</p>
              </S.TransactionOutAndIn>
              <S.TransactionOutAndIn>
                <span>10</span>
                <p>$ 700,00</p>
              </S.TransactionOutAndIn>
              <S.TransactionInfo>
                <p>0x3x...cq20</p>
                <span>
                  X days ago
                  <ExternalLink hrefLink="" text="" />
                </span>
              </S.TransactionInfo>
            </S.Tr>
          </tbody>
        </S.Table>
      </S.ActivityTable>
    </>
  )
}

export default ActivityTable
