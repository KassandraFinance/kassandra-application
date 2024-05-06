import * as S from './styles'
import { useRouter } from 'next/router'
import { ViewOptions } from '@/components/NewSelectTabs/ViewOptions'

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
  onFilterClick: () => void
}

const tabs = [
  {
    tabName: 'discover',
    text: 'Discover'
  },
  {
    tabName: 'allPools',
    text: 'All Pools'
  },
  {
    tabName: 'myPools',
    text: 'My Pools'
  }
]

export function ExploreSelectTabs({
  chainList,
  isSelect,
  setIsSelect,
  selectedChains,
  setSelectedChains,
  selectedView,
  setSelectedView,
  onFilterClick
}: ExploreSelectTabsProps) {
  function handleClickChain(chain: ChainList) {
    onFilterClick()
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
    setSelectedView('list')
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
          {/* <ViewOptions
            isSelect={isSelect}
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          /> */}

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
