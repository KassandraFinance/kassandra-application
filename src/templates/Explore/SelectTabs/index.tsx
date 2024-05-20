import * as S from './styles'

type ChainList = {
  name: string
  icon: JSX.Element
  chainId: string
}

type Tabs = {
  tabName: string
  text: string
}

interface ExploreSelectTabsProps {
  tabsList: Tabs[]
  chainList: ChainList[]
  selectedChains: string[]
  setSelectedChains: React.Dispatch<React.SetStateAction<string[]>>
  isSelect: string
  setIsSelect: React.Dispatch<React.SetStateAction<string>>
  onFilterClick?: () => void
}

export function ExploreSelectTabs({
  tabsList,
  chainList,
  isSelect,
  setIsSelect,
  selectedChains,
  setSelectedChains,
  onFilterClick
}: ExploreSelectTabsProps) {
  function handleClickChain(chain: ChainList) {
    onFilterClick && onFilterClick()
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
  }

  return (
    <S.Wrapper>
      <S.MobileTabs>
        {tabsList.map(tab => (
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
          <S.DesktopTabs>
            {tabsList.map(tab => (
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
