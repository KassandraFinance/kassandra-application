import React from 'react'
import Tippy from '@tippyjs/react'

import { useAppDispatch } from '@/store/hooks'
import { setPeriodSelect } from '@/store/reducers/rebalanceAssetsSlice'

import InputRadio from '../../../../../../components/Inputs/InputRadio'
import InputTime from '../../../../../../components/Inputs/InputTime'

import * as S from './styles'

const ExecutionPeriod = () => {
  const [timeValue, setTimeValue] = React.useState<number>()
  const [timePeriodSelect, setTimePeriodSelect] = React.useState('optimized')

  const dispatch = useAppDispatch()

  function handleClickInput(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value

    setTimePeriodSelect(value)
    switch (value) {
      case 'optimized':
        dispatch(setPeriodSelect(72))
        return

      case 'average':
        dispatch(setPeriodSelect(48))
        return

      case 'fast':
        dispatch(setPeriodSelect(24))
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
    dispatch(setPeriodSelect(72))
  }, [])

  return (
    <S.ExecutionPeriod>
      <h3>token weights rebalancing execution period</h3>

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
              <Tippy content="TIPPY">
                <img src="/assets/utilities/tooltip.svg" />
              </Tippy>
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
              <p>48 hours</p>
              <Tippy content="TIPPY">
                <img src="/assets/utilities/tooltip.svg" />
              </Tippy>
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
              <p>24 hours</p>
              <Tippy content="TIPPY">
                <img src="/assets/utilities/tooltip.svg" />
              </Tippy>
            </S.SelectPeriodContent>
          </S.SelectPeriod>
        </S.SelectPeriodCotainer>

        <S.PersonalizePeriodContainer>
          <span>Personalize</span>
          <S.PersonalizePeriod>
            <p>
              The period for executing the rebalance must be between 24 and 72
              hours.{' '}
            </p>
            <InputTime
              InputTimeValue={timeValue}
              handleInputTime={handleInputTime}
              name="Hour/s"
              max={72}
              min={24}
              step={1}
            />
          </S.PersonalizePeriod>
          {timeValue && (timeValue > 72 || timeValue < 24) && (
            <S.ErrorPeriod>
              The amount of time for the rebalancing process must be higher than
              24 and lower than 72 hours
            </S.ErrorPeriod>
          )}
        </S.PersonalizePeriodContainer>
      </S.ExecutionPeriodBody>
    </S.ExecutionPeriod>
  )
}

export default ExecutionPeriod
