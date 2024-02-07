import React from 'react'

import { useAppSelector, useAppDispatch } from '../../../../../store/hooks'
import { setPoolData } from '../../../../../store/reducers/poolCreationSlice'

import PoolText from './PoolText'
import MarkdownEditor from '../../../../../components/MarkdownEditor'
import InputText from '@/components/Inputs/InputText'
import TextareaWithValueCounter from '@/components/TextareaWithValueCounter'

import * as S from './styles'

const PoolDetails = () => {
  const dispatch = useAppDispatch()

  const details = useAppSelector(state => state.poolCreation.createPoolData)

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      setPoolData({
        [e.target.name]: e.target.value
      })
    )
  }

  function handleEditorChange({ text }: { text: string }) {
    dispatch(setPoolData({ strategy: text }))
  }

  function handleShortSummaryChange(text: string) {
    dispatch(setPoolData({ shortSummary: text }))
  }

  return (
    <S.PoolDetails>
      <S.Details>
        <PoolText
          title="Pool details"
          text="Define name, symbol and initial price of your pool"
        />

        <InputText
          form="poolCreationForm"
          name="poolName"
          type="text"
          placeholder="Write Pool name"
          required
          value={details.poolName ?? ''}
          minLength={3}
          maxLength={20}
          label="managed pool name"
          error="Invalid fund name. Fund names must be 32 characters or less"
          onChange={handleInput}
        />

        <InputText
          form="poolCreationForm"
          name="poolSymbol"
          type="text"
          placeholder="e.g.: ETH, BTC, AVAX, etc."
          required
          value={details.poolSymbol ?? ''}
          minLength={3}
          maxLength={5}
          label="managed pool symbol"
          error="Invalid symbol. Symbols should have 3 to 5 characters."
          onChange={handleInput}
        />

        <TextareaWithValueCounter
          form="poolCreationForm"
          name="poolShortSummary"
          type="text"
          placeholder="Enter a Brief Description"
          value={details.shortSummary ?? ''}
          minLength={0}
          maxLength={150}
          label="DESCRIPTION"
          onChange={e => handleShortSummaryChange(e.target.value)}
        />
      </S.Details>

      <S.Strategy>
        <PoolText
          title="Investment Strategy"
          text="Let your investors know what you are planning. Write the strategy you will follow managing the pool."
        />

        <MarkdownEditor
          value={details.strategy}
          handleEditorChange={handleEditorChange}
        />
      </S.Strategy>
    </S.PoolDetails>
  )
}

export default PoolDetails
