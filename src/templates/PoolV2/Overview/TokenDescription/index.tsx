import React from 'react'
import Image from 'next/image'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

import iconBar from '@assets/iconGradient/product-bar.svg'

import * as S from './styles'

interface ITokenDescriptionProps {
  summary: string
}

const TokenDescription = ({ summary }: ITokenDescriptionProps) => {
  const [isStateSeeMore, setIsStateSeeMore] = React.useState(false)

  const sectionRef = React.useRef<HTMLDivElement>(null)

  // eslint-disable-next-line prettier/prettier
  const descriptionRef = sectionRef?.current?.firstElementChild as HTMLElement

  return (
    <S.TokenDescription>
      <S.Title>
        <Image src={iconBar} alt="" height={18} width={18} />
        <h2>Token Description</h2>
      </S.Title>
      <S.Line />
      <S.Text
        ref={sectionRef}
        isOpen={descriptionRef?.offsetHeight >= 180 ? isStateSeeMore : true}
        height={descriptionRef?.offsetHeight ?? 0}
      >
        <ReactMarkdown
          skipHtml={true}
          className="descriptionWrapper"
          linkTarget={'_blank'}
        >
          {summary}
        </ReactMarkdown>
      </S.Text>

      {descriptionRef?.offsetHeight > 180 && (
        <S.ButtonSeeMore
          isSeeMore={isStateSeeMore}
          onClick={() => setIsStateSeeMore(!isStateSeeMore)}
        >
          View more
          <span>
            <Image
              src="/assets/utilities/arrow-select-down.svg"
              alt="arrow select button"
              width={14}
              height={14}
            />
          </span>
        </S.ButtonSeeMore>
      )}
    </S.TokenDescription>
  )
}

export default TokenDescription
