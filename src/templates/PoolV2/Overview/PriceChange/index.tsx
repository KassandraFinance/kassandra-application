import React from 'react'

import * as S from './styles'

interface IPriceChangeProps {
  changePriceList: string[]
}

const PriceChange = ({ changePriceList }: IPriceChangeProps) => {
  return (
    <S.Change>
      <table>
        <thead>
          <tr>
            <th>1 day</th>
            <th>1 week</th>
            <th>1 month</th>
            <th>3 months</th>
            <th>1 year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {changePriceList.map((item: string, index: number) => (
              <S.Td key={index} value={parseFloat(item)}>
                {item.length === 0 ? '...' : `${item}%`}
              </S.Td>
            ))}
          </tr>
        </tbody>
      </table>
    </S.Change>
  )
}

export default PriceChange
