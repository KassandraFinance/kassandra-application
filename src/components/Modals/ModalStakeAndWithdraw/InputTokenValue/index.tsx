import React from 'react'
import Big from 'big.js'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import { Input } from './styles'

interface IInputProps {
  decimals: Big
  inputRef: React.RefObject<HTMLInputElement>
  setInputValue: React.Dispatch<React.SetStateAction<Big>>
  setMaxActive?: React.Dispatch<React.SetStateAction<boolean>>
  disabled?: string
  amount?: Big
  address?: string | undefined
}

const InputTokenValue = ({
  decimals,
  inputRef,
  setInputValue,
  setMaxActive,
  disabled
}: IInputProps) => {
  if (!disabled) {
    disabled = ''
  }

  function handleOnWheel() {
    if (document.activeElement?.classList.contains('noscroll')) {
      ;(document.activeElement as HTMLElement).blur()
    }
  }

  return (
    <Tippy content={disabled} disabled={disabled.length === 0}>
      <Input
        className="noscroll"
        readOnly={disabled.length > 0}
        ref={inputRef}
        // value={inputRef?.current?.value}
        type="number"
        placeholder="0"
        step="any"
        onWheel={() => handleOnWheel()}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          const target = e.target as HTMLInputElement
          // don't allow negative numbers
          if (e.key === '-') {
            e.preventDefault()
          }
          // Blink bug makes the value come empty if pressing the decimal symbol that is not that of the current locale
          else if (e.key === '.' || e.key === ',') {
            // first time value will be ok, if pressing twice it zeroes, we ignore those
            if (target.value.length > 0 && target.value.search(/[,.]/) === -1) {
              target.dataset.lastvalue = target.value
            }
          } else if (e.key === 'Backspace' || e.key === 'Delete') {
            target.dataset.lastvalue = '0'
          }
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          let { value } = e.target

          if (value.length === 0) {
            value = e.target.dataset.lastvalue as string
          } else if (value[0] === '0') {
            e.target.value = value.replace(/^0+/, '')
          }

          if (e.target.value[0] === '.') {
            e.target.value = `0${e.target.value}`
          }

          const decimalsNum = decimals.toNumber()
          const values = value.split('.')
          const paddedRight = `${values[0]}${`${values[1] || 0}${'0'.repeat(
            decimalsNum
          )}`.slice(0, decimalsNum)}`
          setMaxActive && setMaxActive(false)
          setInputValue && setInputValue(Big(paddedRight))
        }}
      />
    </Tippy>
  )
}

export default InputTokenValue
