import React from 'react'

import Button from '../Button'

import * as S from './styles'

interface IWeb3DisabledProps {
  textButton?: string
  textHeader: string
  bodyText: string
  getFunction?: () => void
}

const Web3Disabled = ({
  textButton,
  textHeader,
  bodyText,
  getFunction
}: IWeb3DisabledProps) => {
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
                background="black"
                size="huge"
                text={textButton}
                onClick={() => getFunction && getFunction()}
              />
            )}
          </S.Body>
        </div>
      </S.Web3Disabled>
    </>
  )
}

export default Web3Disabled
