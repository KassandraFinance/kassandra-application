import styled from 'styled-components'
import Button from '@/components/Button'
import { css } from 'styled-components'

export const ViewIcons = styled.div`
  display: flex;
  align-items: center;

  width: fit-content;

  border-radius: 8px;
  background-color: rgba(252, 252, 252, 0.04);
`

interface ViewButtonProps {
  isActive?: boolean
}

export const ViewButton = styled(Button)<ViewButtonProps>`
  display: flex;
  padding: 1.2rem;

  color: #bdbdbd;
  font-weight: 300;
  border: 0.1rem solid transparent;
  background-color: transparent;

  cursor: pointer;
  transition: all 300ms ease-in-out;

  svg {
    height: 2.4rem;
    width: 2.4rem;

    path {
      fill: auto;
      fill-opacity: 0.25;
    }
  }

  ${({ isActive }) =>
    isActive &&
    css`
      border: 0.1rem solid rgba(252, 252, 252, 0.15);
      background-color: #fcfcfc0d;
      color: #ffffff;
      font-weight: 500;

      svg {
        path {
          fill: #26dbdb;
          fill-opacity: 1;
        }
      }
    `}
`
