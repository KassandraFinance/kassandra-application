import styled from 'styled-components'
import Button from '@/components/Button'

export const ViewIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`

interface ViewButtonProps {
  isActive?: boolean
}

export const ViewButton = styled(Button)<ViewButtonProps>`
  background-color: transparent;
  padding: 0;

  svg {
    height: 2rem;
    width: 2rem;
    path {
      fill: ${props => (props.isActive ? '#26DBDB' : null)};
      fill-opacity: ${props => (props.isActive ? '1' : '0.08')};
    }
  }
`
