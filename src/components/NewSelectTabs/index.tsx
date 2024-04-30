import { useState } from 'react'
import { useRouter } from 'next/router'
import * as S from './styles'
import { ViewOptions } from '@/components/NewSelectTabs/ViewOptions'

interface SelectTabsProps {
  tabs: {
    tabName: string
    text: string
  }[]
  isSelect: string | string[] | undefined
  setIsSelect: React.Dispatch<
    React.SetStateAction<string | string[] | undefined>
  >
  selectedView: string
  setSelectedView: React.Dispatch<React.SetStateAction<string>>
}

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

export function NewSelectTabs({
  tabs,
  isSelect,
  setIsSelect,
  selectedView,
  setSelectedView
}: SelectTabsProps) {
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
          <ViewOptions
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          />
          <S.DesktopTabs>
            {tabs.map(tab => (
              <S.TabButton
                background="transparent"
                text={tab.text}
                className="button"
                onClick={() => handleClickTab(tab.tabName)}
                isActiveTab={tab.tabName === isSelect}
              />
            ))}
          </S.DesktopTabs>
        </S.LeftContent>
      </S.Content>
    </S.Wrapper>
  )
}
