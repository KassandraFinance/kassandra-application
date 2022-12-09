import React from 'react'

import InputText from '../../../../../components/Inputs/InputText'
import PoolText from './PoolText'
import MarkdownEditor from './MarkdownEditor'

import * as S from './styles'

interface IPoolDetailsProps {}

const PoolDetails = ({}: IPoolDetailsProps) => {
  const [value, setValue] = React.useState('')

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.name)
    setValue(e.target.value)
  }

  function handleEditorChange({ text }: { text: string }) {
    console.log(text)
  }

  return (
    <S.PoolDetails>
      <S.Details>
        <PoolText
          title="Pool details"
          text="Define name, symbol and initial price of your pool"
        />

        <InputText
          name="poolName"
          type="text"
          placeholder="Write Pool name"
          required
          value={value}
          minLength={3}
          maxLength={32}
          lable="managed pool name"
          error="Invalid fund name. Fund names must be 32 characters or less"
          onChange={handleInput}
        />

        <InputText
          name="poolSymbol"
          type="text"
          placeholder="e.g.: ETH, BTC, AVAX, etc."
          required
          value={value}
          minLength={3}
          maxLength={5}
          lable="managed pool symbol"
          error="Invalid symbol. Symbols should have 3 to 5 characters."
          onChange={handleInput}
        />
      </S.Details>

      <S.Strategy>
        <PoolText
          title="Investment Strategy"
          text="Let your investors know what you are planning. Write the strategy you will follow managing the pool."
        />

        <MarkdownEditor handleEditorChange={handleEditorChange} />
      </S.Strategy>
    </S.PoolDetails>
  )
}

export default PoolDetails
