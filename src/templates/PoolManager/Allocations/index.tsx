import Big from 'big.js'

import { getWeightsNormalizedV2 } from '@/utils/updateAssetsToV2'
import { underlyingAssetsInfo, WeightsV2 } from '@/store/reducers/pool'

import PieChart from './PieChart'
import AllocationTable from './AllocationTable'
import AllocationHistory from './AllocationHistory'

import * as S from './styles'

interface IAllocationsProps {
  weightGoals: WeightsV2[];
  underlyingAssets: underlyingAssetsInfo[];
}

const Allocations = (props: IAllocationsProps) => {
  const assets = getWeightsNormalizedV2(
    props.weightGoals,
    props.underlyingAssets
  )
  return (
    <S.Allocations>
      <S.Intro>
        <S.GridChart>
          <PieChart assets={assets} />
        </S.GridChart>
        <S.GridRebalancing>asdasd</S.GridRebalancing>
      </S.Intro>
      <AllocationTable allocationData={mockTokens} />
      <AllocationHistory />
    </S.Allocations>
  )
}

export const mockTokens = [
  {
    token: {
      address: 'asd',
      logo: 'https://assets.coingecko.com/coins/images/28542/thumb/l7jRo-5-_400x400.jpg',
      symbol: 'WBTC'
    },
    allocation: 1,
    holding: {
      value: Big(101),
      valueUSD: Big(500)
    },
    price: {
      value: 2.5,
      changeValue: 1.25
    },
    yields: {
      apy: '50',
      url: '#'
    }
  },
  {
    token: {
      address: 'asd',
      logo: 'https://assets.coingecko.com/coins/images/28542/thumb/l7jRo-5-_400x400.jpg',
      symbol: 'WBTC'
    },
    allocation: 0.25,
    holding: {
      value: Big(101),
      valueUSD: Big(500)
    },
    price: {
      value: 2.5,
      changeValue: -1.25
    },
    yields: {
      apy: '0',
      url: '#'
    }
  },
  {
    token: {
      address: 'asd',
      logo: 'https://assets.coingecko.com/coins/images/28542/thumb/l7jRo-5-_400x400.jpg',
      symbol: 'WBTC'
    },
    allocation: 0.25,
    holding: {
      value: Big(101),
      valueUSD: Big(500)
    },
    price: {
      value: 2.5,
      changeValue: 1.25
    },
    yields: {
      apy: '50',
      url: '#'
    }
  },
  {
    token: {
      address: 'asd',
      logo: 'https://assets.coingecko.com/coins/images/28542/thumb/l7jRo-5-_400x400.jpg',
      symbol: 'WBTC'
    },
    allocation: 0.25,
    holding: {
      value: Big(101),
      valueUSD: Big(500)
    },
    price: {
      value: 2.5,
      changeValue: 1.25
    },
    yields: {
      apy: '50',
      url: '#'
    }
  },
  {
    token: {
      address: 'asd',
      logo: 'https://assets.coingecko.com/coins/images/28542/thumb/l7jRo-5-_400x400.jpg',
      symbol: 'WBTC'
    },
    allocation: 0.25,
    holding: {
      value: Big(101),
      valueUSD: Big(500)
    },
    price: {
      value: 2.5,
      changeValue: 1.25
    },
    yields: {
      apy: '50',
      url: '#'
    }
  },
  {
    token: {
      address: 'asd',
      logo: 'https://assets.coingecko.com/coins/images/28542/thumb/l7jRo-5-_400x400.jpg',
      symbol: 'WBTC'
    },
    allocation: 0.25,
    holding: {
      value: Big(101),
      valueUSD: Big(500)
    },
    price: {
      value: 2.5,
      changeValue: 1.25
    },
    yields: {
      apy: '50',
      url: '#'
    }
  },
  {
    token: {
      address: 'asd',
      logo: 'https://assets.coingecko.com/coins/images/28542/thumb/l7jRo-5-_400x400.jpg',
      symbol: 'WBTC'
    },
    allocation: 0.25,
    holding: {
      value: Big(101),
      valueUSD: Big(500)
    },
    price: {
      value: 2.5,
      changeValue: 1.25
    },
    yields: {
      apy: '50',
      url: '#'
    }
  },
  {
    token: {
      address: 'asd',
      logo: 'https://assets.coingecko.com/coins/images/28542/thumb/l7jRo-5-_400x400.jpg',
      symbol: 'WBTC'
    },
    allocation: 0.25,
    holding: {
      value: Big(101),
      valueUSD: Big(500)
    },
    price: {
      value: 2.5,
      changeValue: 1.25
    },
    yields: {
      apy: '50',
      url: '#'
    }
  },
  {
    token: {
      address: 'asd',
      logo: 'https://assets.coingecko.com/coins/images/28542/thumb/l7jRo-5-_400x400.jpg',
      symbol: 'WBTC'
    },
    allocation: 0.25,
    holding: {
      value: Big(101),
      valueUSD: Big(500)
    },
    price: {
      value: 2.5,
      changeValue: 1.25
    },
    yields: {
      apy: '50',
      url: '#'
    }
  },
  {
    token: {
      address: 'asd',
      logo: 'https://assets.coingecko.com/coins/images/28542/thumb/l7jRo-5-_400x400.jpg',
      symbol: 'WBTC'
    },
    allocation: 0.25,
    holding: {
      value: Big(101),
      valueUSD: Big(500)
    },
    price: {
      value: 2.5,
      changeValue: 1.25
    },
    yields: {
      apy: '50',
      url: '#'
    }
  },
  {
    token: {
      address: 'asd',
      logo: 'https://assets.coingecko.com/coins/images/28542/thumb/l7jRo-5-_400x400.jpg',
      symbol: 'WBTC'
    },
    allocation: 0.25,
    holding: {
      value: Big(101),
      valueUSD: Big(500)
    },
    price: {
      value: 2.5,
      changeValue: 1.25
    },
    yields: {
      apy: '50',
      url: '#'
    }
  },
  {
    token: {
      address: 'asd',
      logo: 'https://assets.coingecko.com/coins/images/28542/thumb/l7jRo-5-_400x400.jpg',
      symbol: 'WBTC'
    },
    allocation: 0.25,
    holding: {
      value: Big(101),
      valueUSD: Big(500)
    },
    price: {
      value: 2.5,
      changeValue: 1.25
    },
    yields: {
      apy: '50',
      url: '#'
    }
  }
]
export default Allocations
