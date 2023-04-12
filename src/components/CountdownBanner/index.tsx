/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { useCountdown } from '@/hooks/useCountDown'

import * as S from './styles'

interface ICountdownCallbackParams {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const CountdownBanner = () => {
  function handleUnixTimestamp() {
    const year = 2021
    const month = 11
    const day = 1
    const hour = 0
    const minute = 0
    const second = 0
    const d = new Date(year, month - 1, day, hour, minute, second)

    return d.getTime()
  }

  const { dateFormated } = useCountdown(handleUnixTimestamp())

  return (
    <S.Background>
      <S.Container id="launching-banner">
        <S.TextWrapper>
          <p>UPCOMING IDO</p>
          <S.TitleAndImage>
            <h1>
              A multi-chain protocol launching first on Avalanche
              <img src="assets/logos/avalanche.svg" alt="" />
            </h1>
          </S.TitleAndImage>
          {/* <span>STARTS IN:</span> */}
        </S.TextWrapper>
        {/* <S.TimerContainer>
          <S.TimerWrapper>
            <span>{timeRemaining.dayss}</span>
            <p>Days</p>
          </S.TimerWrapper>
          <S.TimerWrapper>
            <span>{timeRemaining.hours}</span>
            <p>Hours</p>
          </S.TimerWrapper>
          <S.TimerWrapper>
            <span>{timeRemaining.minutes}</span>
            <p>Mins</p>
          </S.TimerWrapper>
          <S.TimerWrapper>
            <span>{timeRemaining.seconds}</span>
            <p>Secs</p>
          </S.TimerWrapper>
        </S.TimerContainer> */}
      </S.Container>
    </S.Background>
  )
}
export default CountdownBanner
