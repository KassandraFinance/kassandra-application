import { useRouter } from 'next/router'

import { gridviewIcon, listViewIcon } from './icons'

import * as S from './styles'

type ChainList = {
  name: string
  icon: JSX.Element
  chainId: string
}

interface ExploreSelectTabsProps {
  chainList: ChainList[]
  selectedChains: string[]
  setSelectedChains: React.Dispatch<React.SetStateAction<string[]>>
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

export function ExploreSelectTabs({
  chainList,
  isSelect,
  setIsSelect,
  selectedChains,
  setSelectedChains,
  selectedView,
  setSelectedView
}: ExploreSelectTabsProps) {
  const router = useRouter()

  function handleClickChain(chain: ChainList) {
    const allSelected = chainList.every(chain =>
      selectedChains.includes(chain.chainId)
    )

    if (allSelected) {
      setSelectedChains([chain.chainId])
    } else {
      const chainIndex = selectedChains.indexOf(chain.chainId)
      if (chainIndex !== -1) {
        const updatedSelectedChains = [...selectedChains]
        updatedSelectedChains.splice(chainIndex, 1)

        setSelectedChains(
          updatedSelectedChains.length === 0
            ? chainList.map(chain => chain.chainId)
            : updatedSelectedChains
        )
      } else {
        setSelectedChains([...selectedChains, chain.chainId])
      }
    }
  }

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
          {chainList.map(chain => (
            <S.FilterIcon
              key={chain.chainId}
              onClick={() => handleClickChain(chain)}
              selected={selectedChains.includes(chain.chainId)}
              icon={chain.icon}
            />
          ))}
        </S.FilterIcons>
      </S.Content>
    </S.Wrapper>
  )
}
