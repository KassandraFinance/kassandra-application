import {
  gridviewIcon,
  listViewIcon
} from '@/templates/Explore/SelectTabs/icons'
import * as S from './styles'
import { Dispatch, SetStateAction } from 'react'

const viewList = [
  {
    name: 'grid',
    icon: gridviewIcon
  },
  {
    name: 'list',
    icon: listViewIcon
  }
]

interface ViewOptionsProps {
  selectedView: string
  setSelectedView: Dispatch<SetStateAction<string>>
  isSelect?: string | string[]
}

export function ViewOptions({
  selectedView,
  setSelectedView,
  isSelect
}: ViewOptionsProps) {
  return (
    <S.ViewIcons>
      {viewList.map(view => (
        <S.ViewButton
          key={view.name}
          isActive={selectedView === view.name}
          icon={view.icon}
          onClick={() => setSelectedView(view.name)}
          myPoolsSelected={isSelect === 'myPools'}
        />
      ))}
    </S.ViewIcons>
  )
}
