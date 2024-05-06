import styled from 'styled-components'
import Button from '@/components/Button'

export const ViewIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  width: fit-content;
`

interface ViewButtonProps {
  isActive?: boolean
  myPoolsSelected?: boolean
}

export const ViewButton = styled(Button)<ViewButtonProps>`
  background-color: transparent;
  display: flex;

  cursor: ${props => (props.myPoolsSelected ? 'not-allowed' : 'pointer')};
  padding: 0;

  svg {
    height: 2.4rem;
    width: 2.4rem;
    path {
      fill: ${props =>
        props.isActive && !props.myPoolsSelected ? '#26DBDB' : null};
      fill-opacity: ${props =>
        props.isActive && !props.myPoolsSelected ? '1' : '0.25'};
    }
  }
`
