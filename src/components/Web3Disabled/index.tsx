/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { networks } from '../../constants/tokenAddresses'

import { useAppDispatch } from '../../store/hooks'
import { setModalWalletActive } from '../../store/reducers/modalWalletActive'

import changeChain from '../../utils/changeChain'

import Button from '../Button'

import * as S from './styles'

interface IWeb3DisabledProps {
  textButton?: string
  textHeader: string
  bodyText: string
  type: string
}

const Web3Disabled = ({
  textButton,
  textHeader,
  bodyText,
  type
}: IWeb3DisabledProps) => {
  const dispatch = useAppDispatch()
  function getFunction(type: string) {
    const { chainId, chainName, rpc, nativeCurrency } = networks[43114]
    switch (type) {
      case 'connect':
        dispatch(setModalWalletActive(true))
        break
      case 'changeChain':
        changeChain({
          chainId,
          chainName,
          rpcUrls: [rpc],
          nativeCurrency
        })
        break
      default:
        break
    }
  }

  return (
    <>
      <S.Web3Disabled>
        <div>
          <S.Header>
            <img src="/assets/notificationStatus/warning.svg" alt="" />
            <p>{textHeader}</p>
          </S.Header>
          <S.Body>
            <p>{bodyText}</p>
            {!!textButton && (
              <Button
                backgroundBlack
                size="huge"
                text={textButton}
                onClick={() => getFunction(type)}
              />
            )}
          </S.Body>
        </div>
      </S.Web3Disabled>
    </>
  )
}

export default Web3Disabled
