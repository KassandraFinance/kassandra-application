import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import request from 'graphql-request'

import { GET_INFO_TOKENS } from './graphql'
import { KASSANDRA_BECKEND } from '../../../constants/tokenAddresses'

import Overlay from '../../Overlay'
import Modal from '../Modal'

import * as S from './styles'

interface IModalAvailableAssetsProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalAvailableAssets = ({ setModalOpen }: IModalAvailableAssetsProps) => {
  const { data } = useSWR([GET_INFO_TOKENS], query =>
    request(KASSANDRA_BECKEND, query)
  )

  return (
    <S.ModalAvailableAssets>
      <Overlay onClick={() => setModalOpen(false)} />

      <Modal title="Avalanche Assets" onCloseModal={() => setModalOpen(false)}>
        <S.ModalAvailableAssetsContent>
          {data &&
            data.tokens.slice(0, 12).map((token: any, index: number) => {
              return (
                <Link key={token.name + index} href="#" passHref>
                  <S.tokenContent target="_blank">
                    <img src={token.logo} alt="" width={24} height={24} />
                    <p>{token.name}</p>
                  </S.tokenContent>
                </Link>
              )
            })}
        </S.ModalAvailableAssetsContent>
      </Modal>
    </S.ModalAvailableAssets>
  )
}

export default ModalAvailableAssets
