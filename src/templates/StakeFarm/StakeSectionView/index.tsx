import Image from 'next/image'

import * as S from './styles'

interface IStakeSectionViewProps {
  sectionName: string
  children: JSX.Element
}

export function StakeSectionView({
  children,
  sectionName
}: IStakeSectionViewProps) {
  return (
    <S.Wrapper isPowerVotingSection={sectionName === 'Power Voting'}>
      <S.ContentWrapper>
        <S.TitleContent>
          <Image
            src="/assets/icons/pie.svg"
            width={20}
            height={20}
            alt="an icon of a chart pie"
          />{' '}
          {sectionName}
        </S.TitleContent>

        {children}
      </S.ContentWrapper>
    </S.Wrapper>
  )
}
