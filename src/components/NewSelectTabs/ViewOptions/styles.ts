import styled from 'styled-components'
import Button from '@/components/Button'

export const ViewIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`

interface ViewButtonProps {
  isActive?: boolean
  myPoolsSelected?: boolean
}

export const ViewButton = styled(Button)<ViewButtonProps>`
  background-color: transparent;
  padding: 0;

  cursor: ${props => (props.myPoolsSelected ? 'not-allowed' : 'pointer')};

  svg {
    height: 2rem;
    width: 2rem;
    path {
      fill: ${props =>
        props.isActive && !props.myPoolsSelected ? '#26DBDB' : null};
      fill-opacity: ${props =>
        props.isActive && !props.myPoolsSelected ? '1' : '0.08'};
    }
  }
`
