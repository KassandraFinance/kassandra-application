import {
  gridviewIcon,
  listViewIcon
} from '@/templates/Explore/SelectTabs/icons'
import * as S from './styles'
import { useState } from 'react'

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

export function ViewOptions() {
  const [selectedView, setSelectedView] = useState('grid')
  return (
    <S.ViewIcons>
      {viewList.map(view => (
        <S.ViewButton
          isActive={selectedView === view.name}
          icon={view.icon}
          onClick={() => setSelectedView(view.name)}
        />
      ))}
    </S.ViewIcons>
  )
}
