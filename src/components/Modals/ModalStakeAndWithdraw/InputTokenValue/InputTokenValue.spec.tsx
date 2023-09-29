import { render, screen, fireEvent } from '@testing-library/react'
import 'jest-styled-components'
import '@testing-library/jest-dom'
import { ReduxProvider } from '@/store/reduxContext'
import theme from '@/styles/theme'
import { ThemeProvider } from 'styled-components'
import InputTokenValue from '.'
import Big from 'big.js'

describe('InputTokenValue component', () => {
  const inputRef = jest.fn().mockReturnValue({
    current: {
      value: '0'
    }
  })

  const setAmountStakeMock = jest.fn()
  const setMaxActiveMock = jest.fn()

  const decimals = 18
  const value = '5.3'

  const setup = (setMaxActive?: () => void) => {
    const utils = render(
      <ThemeProvider theme={theme}>
        <ReduxProvider>
          <InputTokenValue
            decimals={Big(decimals)}
            setInputValue={setAmountStakeMock}
            inputRef={inputRef as unknown as React.RefObject<HTMLInputElement>}
            setMaxActive={setMaxActive}
          />
        </ReduxProvider>
      </ThemeProvider>
    )

    const input = screen.getByPlaceholderText('0')

    return {
      input,
      ...utils
    }
  }

  it('should not allow letters to be inputted onChange', () => {
    const { input } = setup()
    expect(input.value).toBe('') // empty before
    fireEvent.change(input, { target: { value: 'Good Day' } })
    expect(input.value).toBe('') //empty after
  })

  it('should display correct value when changed onChange', () => {
    const { input } = setup()
    expect(input.value).toBe('')
    fireEvent.change(input, { target: { value: value } })
    expect(input.value).toBe(value)
  })

  it('should not allow letters to be inputted onKeyDown', () => {
    const { input } = setup()
    expect(input.value).toBe('')
    fireEvent.keyDown(input, { target: { value: 'Good Day' } })
    expect(input.value).toBe('')
  })

  it('should display correct value when changed onKeyDown', () => {
    const { input } = setup()
    expect(input.value).toBe('')
    fireEvent.keyDown(input, { target: { value: value } })
    expect(input.value).toBe(value)
  })

  it('should pass the correct value to setAmountStake onChange', () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: value } })
    expect(setAmountStakeMock).toBeCalledWith(Big(Number(value) * 10 ** 18))
  })

  it('should not call setMaxActive', () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: value } })
    expect(setMaxActiveMock).toBeCalledTimes(0)
  })

  it('should call setMaxActive with false', () => {
    const { input } = setup(setMaxActiveMock)
    fireEvent.change(input, { target: { value: value } })
    expect(setMaxActiveMock).toBeCalledWith(false)
  })
})
