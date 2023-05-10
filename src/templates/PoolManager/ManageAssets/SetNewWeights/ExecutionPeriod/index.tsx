import React from 'react'
import Tippy from '@tippyjs/react'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setPeriodSelect } from '@/store/reducers/rebalanceAssetsSlice'

import InputRadio from '../../../../../components/Inputs/InputRadio'
import InputTime from '../../../../../components/Inputs/InputTime'

import * as S from './styles'

const ExecutionPeriod = () => {
  const [timeValue, setTimeValue] = React.useState<number>()
  const [timePeriodSelect, setTimePeriodSelect] = React.useState('optimized')

  const { periodSelect } = useAppSelector(state => state.rebalanceAssets)
  const dispatch = useAppDispatch()

  function handleClickInput(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value

    setTimePeriodSelect(value)
    setTimeValue(0)
    switch (value) {
      case 'optimized':
        dispatch(setPeriodSelect(72))
        return

      case 'average':
        dispatch(setPeriodSelect(24))
        return

      case 'fast':
        dispatch(setPeriodSelect(1))
        return

      default:
        return
    }
  }

  function handleInputTime(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    const valueNumber = Number(value)

    if (valueNumber !== 0) {
      setTimeValue(Number(value))
      setTimePeriodSelect('')
      dispatch(setPeriodSelect(Number(value)))
    } else {
      setTimeValue(undefined)

      timePeriodSelect === '' && setTimePeriodSelect('optimized')
    }
  }

  React.useEffect(() => {
    if (periodSelect > 0) {
      switch (periodSelect) {
        case 72:
          setTimePeriodSelect('optimized')
          return

        case 24:
          setTimePeriodSelect('average')
          return

        case 1:
          setTimePeriodSelect('fast')
          return

        default:
          setTimePeriodSelect('')
          setTimeValue(periodSelect)
          return
      }
    } else {
      setTimePeriodSelect('optimized')
      dispatch(setPeriodSelect(72))
    }
  }, [])

  return (
    <S.ExecutionPeriod>
      <S.ExecutionTitle>
        <h3>
          token weights rebalancing execution period
          <Tippy content="Tooltip: Rebalancing operations don't happen instantly but linearly over a given time period. The longer you can wait for the process to happen, the more efficient it will be. You can use the fast option for small or urgent reallocations, but you should prefer the slowest when dealing with big reallocations.">
            <img src="/assets/utilities/tooltip.svg" />
          </Tippy>
        </h3>
      </S.ExecutionTitle>

      <S.ExecutionPeriodBody>
        <S.SelectPeriodCotainer>
          <S.SelectPeriod>
            <InputRadio
              text="Optimized"
              inputId="optimized"
              value="optimized"
              inputChecked={timePeriodSelect === 'optimized'}
              handleClickInput={handleClickInput}
              required={false}
            />

            <S.SelectPeriodContent>
              <p>72 hours</p>
            </S.SelectPeriodContent>
          </S.SelectPeriod>
          <S.SelectPeriod>
            <InputRadio
              text="Average"
              inputId="average"
              value="average"
              inputChecked={timePeriodSelect === 'average'}
              handleClickInput={handleClickInput}
              required={false}
            />

            <S.SelectPeriodContent>
              <p>24 hours</p>
            </S.SelectPeriodContent>
          </S.SelectPeriod>
          <S.SelectPeriod>
            <InputRadio
              text="Fast"
              inputId="fast"
              value="fast"
              inputChecked={timePeriodSelect === 'fast'}
              handleClickInput={handleClickInput}
              required={false}
            />

            <S.SelectPeriodContent>
              <p>1 hours</p>
            </S.SelectPeriodContent>
          </S.SelectPeriod>
        </S.SelectPeriodCotainer>

        <S.PersonalizePeriodContainer>
          <span>Customize</span>
          <S.PersonalizePeriod>
            <p>
              The period for executing the rebalance must be between 1 and 72
              hours.{' '}
            </p>
            <InputTime
              InputTimeValue={timeValue}
              handleInputTime={handleInputTime}
              name="Hour/s"
              max={72}
              min={1}
              step={1}
            />
          </S.PersonalizePeriod>
          {timeValue
            ? (timeValue > 72 || timeValue < 1) && (
              <S.ErrorPeriod>
                The amount of time for the rebalancing process must be higher
                than 1 and lower than 72 hours
              </S.ErrorPeriod>
            )
            : null}
        </S.PersonalizePeriodContainer>
      </S.ExecutionPeriodBody>
    </S.ExecutionPeriod>
  )
}

export default ExecutionPeriod
