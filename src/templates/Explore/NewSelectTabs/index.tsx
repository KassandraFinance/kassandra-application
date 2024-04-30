import { useState } from 'react'
import { useRouter } from 'next/router'
import * as S from './styles'
import { gridviewIcon, listViewIcon } from './icons'

interface ExploreSelectTabsProps {
  isSelect: string | string[] | undefined
  setIsSelect: React.Dispatch<
    React.SetStateAction<string | string[] | undefined>
  >
  selectedView: string
  setSelectedView: React.Dispatch<React.SetStateAction<string>>
}

const tabs = [
  {
    tabName: 'pools',
    text: 'All Pools'
  },
  {
    tabName: 'managers',
    text: 'My Pools'
  }
]

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

const filterList = [
  {
    name: 'first',
    icon: <img src="/assets/icons/chain-one.svg" />,
    chainId: 1
  },
  {
    name: 'avalanche',
    icon: <img src="/assets/icons/chain-two.svg" />,
    chainId: 2
  },
  {
    name: 'arbitrum',
    icon: <img src="/assets/icons/chain-three.svg" />,
    chainId: 3
  }
]

export function ExploreSelectTabs({
  isSelect,
  setIsSelect,
  selectedView,
  setSelectedView
}: ExploreSelectTabsProps) {
  const [selectedChains, setSelectedChains] = useState<number[]>([1, 2, 3])

  const router = useRouter()

  function handleClickTab(tabSelect: string) {
    setIsSelect(tabSelect)

    router.push(
      {
        pathname: `${router.pathname}`,
        query: { ...router.query, tab: `${tabSelect}` }
      },
      undefined,
      { scroll: false }
    )
  }

  return (
    <S.Wrapper>
      <S.MobileTabs>
        {tabs.map(tab => (
          <S.TabButton
            key={tab.tabName}
            background="transparent"
            text={tab.text}
            className="button"
            onClick={() => handleClickTab(tab.tabName)}
            isActiveTab={tab.tabName === isSelect}
          />
        ))}
      </S.MobileTabs>
      <S.Content>
        <S.LeftContent>
          <S.ViewIcons>
            {viewList.map(view => (
              <S.ViewButton
                key={view.name}
                isActive={selectedView === view.name}
                icon={view.icon}
                onClick={() => setSelectedView(view.name)}
              />
            ))}
          </S.ViewIcons>

          <S.DesktopTabs>
            {tabs.map(tab => (
              <S.TabButton
                key={tab.tabName}
                background="transparent"
                text={tab.text}
                className="button"
                onClick={() => handleClickTab(tab.tabName)}
                isActiveTab={tab.tabName === isSelect}
              />
            ))}
          </S.DesktopTabs>
        </S.LeftContent>
        <S.FilterIcons>
          {filterList.map(filter => (
            <S.FilterIcon
              key={filter.chainId}
              onClick={() => {
                const index = selectedChains.indexOf(filter.chainId)
                if (index === -1) {
                  setSelectedChains([...selectedChains, filter.chainId])
                } else {
                  const updatedChains = [...selectedChains]
                  updatedChains.splice(index, 1)
                  setSelectedChains(updatedChains)
                }
              }}
              selected={selectedChains.includes(filter.chainId)}
              icon={filter.icon}
            />
          ))}
        </S.FilterIcons>
      </S.Content>
    </S.Wrapper>
  )
}
