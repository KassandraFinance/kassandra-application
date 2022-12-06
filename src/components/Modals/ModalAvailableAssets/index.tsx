import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import request from 'graphql-request'

import { GET_INFO_TOKENS } from './graphql'
import { KASSANDRA_BACKEND } from '../../../constants/tokenAddresses'

import Loading from '../../Loading'
import Overlay from '../../Overlay'
import ModalWithMobile from '../ModalWithMobile'

import * as S from './styles'

interface IModalAvailableAssetsProps {
  chainIcon: JSX.Element;
  chainName: string;
  chainId: number;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type ITokenProps = {
  name: string,
  symbol: string,
  logo: string
}

const ModalAvailableAssets = ({
  chainIcon,
  chainId,
  chainName,
  setModalOpen
}: IModalAvailableAssetsProps) => {
  const { data } = useSWR([GET_INFO_TOKENS], query =>
    request(KASSANDRA_BACKEND, query)
  )

  return (
    <S.ModalAvailableAssets>
      <Overlay onClick={() => setModalOpen(false)} />

      <ModalWithMobile
        title={`${chainName} Assets`}
        titleIcon={chainIcon}
        onCloseModal={() => setModalOpen(false)}
      >
        <S.ModalAvailableAssetsContent hasToken={data && data.tokens}>
          {data && data.tokens ? (
            data.tokens.map((token: ITokenProps, index: number) => {
              return (
                <Link
                  key={token.name + index}
                  href={`https://heimdall-frontend.vercel.app/coins/${token.symbol.toLocaleLowerCase()}`}
                  passHref
                >
                  <S.tokenContent target="_blank">
                    <img src={token.logo} alt="" width={24} height={24} />
                    <p>{token.name}</p>
                  </S.tokenContent>
                </Link>
              )
            })
          ) : (
            <Loading marginTop={0} />
          )}
        </S.ModalAvailableAssetsContent>
      </ModalWithMobile>
    </S.ModalAvailableAssets>
  )
}

export default ModalAvailableAssets
