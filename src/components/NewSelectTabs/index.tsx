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

export function NewSelectTabs({
  tabs,
  isSelect,
  setIsSelect,
  selectedView,
  setSelectedView
}: SelectTabsProps) {
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
            key={`mobile_` + tab.tabName}
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
      </S.Content>
    </S.Wrapper>
  )
}
