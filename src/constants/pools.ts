import { KacyPoligon, WETH_POLYGON } from './tokenAddresses'

export enum PoolType {
  STAKE,
  FARM,
  LP
}
export enum lpPoolType {
  AVAX,
  BALANCER
}

export type LpPoolProps = {
  type: lpPoolType
  balancerPoolId?: string
}

export interface PoolDetails {
  pid: number
  type: PoolType
  symbol: string
  stakingContract: string
  poolTokenAddress: string
  chain: {
    id: number
    logo: string
  }
  properties: {
    logo: {
      src: string
      style: {
        width: string
      }
    }
    title?: string
    link?: string
  }
  stakeWithVotingPower: boolean
  stakeWithLockPeriod: boolean
  address: string
  lpPool?: LpPoolProps
}

export const KACY_ADDRESS =
  process.env.NEXT_PUBLIC_MASTER === '1'
    ? '0xf32398dae246C5f672B52A54e9B413dFFcAe1A44'
    : '0x1d7C6846F033e593b4f3f21C39573bb1b41D43Cb'

export const LP_KACY_AVAX_PNG =
  process.env.NEXT_PUBLIC_MASTER === '1'
    ? '0x1938cE0E14dD71caab96F52dF3F49b1D1DAF8861'
    : '0xbaa8b0d2AA6415d5b4077C1FA06b3507577FBCd7'

export const LP_KACY_AVAX_JOE = '0xc45893e0ee426a643e54829ee8c697995e5980ed'

export const AHYPE_ADDRESS =
  process.env.NEXT_PUBLIC_MASTER === '1'
    ? '0x38918142779e2CD1189cBd9e932723C968363D1E'
    : '0xE34A2935B04e9c879f5bDd022b97D7Cf2F1Dde1d'

export const TRICRYPTO_ADDRESS = '0xA6CAB4b1019ee22309dcA5ba62C3372a791dcB2E'

export const PHYPE = {
  address: '0x83Db290AE85e02FEF7ccF45c1B551e75e7F8cC82',
  id: '1370x83db290ae85e02fef7ccf45c1b551e75e7f8cc82000100000000000000000b52'
}

export const KACY_WETH = '0xfaf3bc722d34146be83a2aac40b43148a51a9126'
export const WAVAX_POLYGON = '0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b'

const kacyInvestor1: PoolDetails = {
  pid: 0,
  type: PoolType.STAKE,
  symbol: 'KACY',
  stakingContract: '0xfddc1956d88a34fcB0671508Fa3d5aaC73b2a031',
  poolTokenAddress: KACY_ADDRESS,
  chain: {
    id: 43114,
    logo: '/assets/logos/avax.png'
  },
  properties: {
    logo: {
      src: '/assets/logos/kacy-stake.svg',
      style: { width: '5.8rem' }
    },
    link: `https://app.pangolin.exchange/#/swap?outputCurrency=${KACY_ADDRESS}`
  },
  stakeWithVotingPower: true,
  stakeWithLockPeriod: true,
  address: KACY_ADDRESS
}

const kacyInvestor2: PoolDetails = {
  pid: 1,
  type: PoolType.STAKE,
  symbol: 'KACY',
  stakingContract: '0xfddc1956d88a34fcB0671508Fa3d5aaC73b2a031',
  poolTokenAddress: KACY_ADDRESS,
  chain: {
    id: 43114,
    logo: '/assets/logos/avax.png'
  },
  properties: {
    logo: {
      src: '/assets/logos/kacy-stake.svg',
      style: { width: '5.8rem' }
    }
  },
  stakeWithVotingPower: true,
  stakeWithLockPeriod: true,
  address: KACY_ADDRESS
}

const kacy1x: PoolDetails = {
  pid: process.env.NEXT_PUBLIC_MASTER === '1' ? 2 : 0,
  symbol: 'KACY',
  type: PoolType.STAKE,
  stakingContract: '0xfddc1956d88a34fcB0671508Fa3d5aaC73b2a031',
  poolTokenAddress: KACY_ADDRESS,
  chain: {
    id: 43114,
    logo: '/assets/logos/avax.png'
  },
  properties: {
    logo: {
      src: '/assets/logos/kacy-stake.svg',
      style: { width: '5.8rem' }
    },
    link: `https://legacy.pangolin.exchange/#/swap?outputCurrency=${KACY_ADDRESS}`
  },
  stakeWithVotingPower: true,
  stakeWithLockPeriod: false,
  address: KACY_ADDRESS
}

const kacy2x: PoolDetails = {
  pid: process.env.NEXT_PUBLIC_MASTER === '1' ? 3 : 1,
  type: PoolType.STAKE,
  symbol: 'KACY',
  stakingContract: '0xfddc1956d88a34fcB0671508Fa3d5aaC73b2a031',
  poolTokenAddress: KACY_ADDRESS,
  chain: {
    id: 43114,
    logo: '/assets/logos/avax.png'
  },
  properties: {
    logo: {
      src: '/assets/logos/kacy-stake.svg',
      style: { width: '5.8rem' }
    },
    link: `https://legacy.pangolin.exchange/#/swap?outputCurrency=${KACY_ADDRESS}`
  },
  stakeWithVotingPower: true,
  stakeWithLockPeriod: false,
  address: KACY_ADDRESS
}

const kacy3x: PoolDetails = {
  pid: process.env.NEXT_PUBLIC_MASTER === '1' ? 4 : 2,
  type: PoolType.STAKE,
  symbol: 'KACY',
  stakingContract: '0xfddc1956d88a34fcB0671508Fa3d5aaC73b2a031',
  poolTokenAddress: KACY_ADDRESS,
  chain: {
    id: 43114,
    logo: '/assets/logos/avax.png'
  },
  properties: {
    logo: {
      src: '/assets/logos/kacy-stake.svg',
      style: { width: '5.8rem' }
    },
    link: `https://legacy.pangolin.exchange/#/swap?outputCurrency=${KACY_ADDRESS}`
  },
  stakeWithVotingPower: true,
  stakeWithLockPeriod: false,
  address: KACY_ADDRESS
}

const lpPNG: PoolDetails = {
  pid: 5,
  type: PoolType.LP,
  symbol: 'LP-PNG',
  stakingContract: '0xfddc1956d88a34fcB0671508Fa3d5aaC73b2a031',
  poolTokenAddress: WAVAX_POLYGON,
  chain: {
    id: 43114,
    logo: '/assets/logos/avax.png'
  },
  properties: {
    logo: {
      src: '/assets/logos/lp-kacy.svg',
      style: { width: '14.4rem' }
    },
    title: '$KACY-AVAX PNG LP',
    link: `https://legacy.pangolin.exchange/#/add/AVAX/${KACY_ADDRESS}`
  },
  stakeWithVotingPower: false,
  stakeWithLockPeriod: false,
  address: LP_KACY_AVAX_PNG,
  lpPool: {
    type: lpPoolType.AVAX
  }
}

const lpJoe: PoolDetails = {
  pid: 7,
  type: PoolType.LP,
  symbol: 'LP-JOE',
  stakingContract: '0xfddc1956d88a34fcB0671508Fa3d5aaC73b2a031',
  poolTokenAddress: WAVAX_POLYGON,
  chain: {
    id: 43114,
    logo: '/assets/logos/avax.png'
  },
  properties: {
    logo: {
      src: '/assets/logos/joe-kacy.svg',
      style: { width: '14.4rem' }
    },
    title: '$KACY-AVAX JOE LP',
    link: `https://traderjoexyz.com/pool/AVAX/${KACY_ADDRESS}`
  },
  stakeWithVotingPower: false,
  stakeWithLockPeriod: false,
  address: LP_KACY_AVAX_JOE,
  lpPool: {
    type: lpPoolType.AVAX
  }
}

const ahype: PoolDetails = {
  pid: process.env.NEXT_PUBLIC_MASTER === '1' ? 6 : 4,
  type: PoolType.FARM,
  symbol: 'aHYPE',
  stakingContract: '0xfddc1956d88a34fcB0671508Fa3d5aaC73b2a031',
  poolTokenAddress: AHYPE_ADDRESS,
  chain: {
    id: 43114,
    logo: '/assets/logos/avax.png'
  },
  properties: {
    logo: {
      src: '/assets/logos/ahype-stake.svg',
      style: { width: '5.8rem' }
    },
    title: '$aHYPE',
    link: `/pool/${AHYPE_ADDRESS}`
  },
  stakeWithVotingPower: false,
  stakeWithLockPeriod: false,
  address: AHYPE_ADDRESS
}

const tricrypto: PoolDetails = {
  pid: 8,
  type: PoolType.FARM,
  symbol: 'K3C',
  stakingContract: '0xfddc1956d88a34fcB0671508Fa3d5aaC73b2a031',
  poolTokenAddress: TRICRYPTO_ADDRESS,
  chain: {
    id: 43114,
    logo: '/assets/logos/avax.png'
  },
  properties: {
    logo: {
      src: '/assets/logos/tricrypto-stake.svg',
      style: { width: '5.8rem' }
    },
    title: '$K3C',
    link: `/pool/${TRICRYPTO_ADDRESS}`
  },
  stakeWithVotingPower: false,
  stakeWithLockPeriod: false,
  address: TRICRYPTO_ADDRESS
}

const phype: PoolDetails = {
  pid: 1,
  type: PoolType.FARM,
  symbol: 'pHYPE',
  stakingContract: '0xd530f3ce79c9eb03e59dce89a7504dd41d4899bb',
  poolTokenAddress: PHYPE.address,
  chain: {
    id: 137,
    logo: '/assets/logos/polygon.svg'
  },
  properties: {
    logo: {
      src: '/assets/logos/phype-stake.svg',
      style: { width: '5.8rem' }
    },
    title: '$pHYPE',
    link: `/pool/${PHYPE.id}`
  },
  stakeWithVotingPower: false,
  stakeWithLockPeriod: false,
  address: PHYPE.address
}

const lpBalancer: PoolDetails = {
  pid: 0,
  type: PoolType.LP,
  symbol: 'KACY-WETH',
  stakingContract: '0xd530f3ce79c9eb03e59dce89a7504dd41d4899bb',
  poolTokenAddress: WETH_POLYGON,
  chain: {
    id: 137,
    logo: '/assets/logos/polygon.svg'
  },
  properties: {
    logo: {
      src: '/assets/logos/lp-bal.svg',
      style: { width: '14.4rem' }
    },
    title: '$KACY-WETH BAL LP',
    link: `https://app.balancer.fi/#/polygon/pool/0xfaf3bc722d34146be83a2aac40b43148a51a9126000200000000000000000b4c`
  },
  stakeWithVotingPower: false,
  stakeWithLockPeriod: false,
  address: KACY_WETH,
  lpPool: {
    type: lpPoolType.BALANCER,
    balancerPoolId:
      '0xfaf3bc722d34146be83a2aac40b43148a51a9126000200000000000000000b4c'
  }
}

// addresses list to get price on the stake page
export const addressesForReqStakePool = [KacyPoligon]
export const addressesForReqLpPool = [WETH_POLYGON, KacyPoligon, WAVAX_POLYGON]
export const addressesForReqFarmPool = [
  PHYPE.id,
  TRICRYPTO_ADDRESS,
  AHYPE_ADDRESS
]

export const poolsKacy = [kacy1x, kacy2x, kacy3x]
export const poolsInvestor = [kacyInvestor1, kacyInvestor2]
export const poolsFunds = [lpPNG, lpJoe, ahype, tricrypto, phype, lpBalancer]
export const poolsKacyFuji = [kacy1x, kacy2x, kacy3x]
export const poolsFundsFuji = [lpPNG, ahype]
export const allPools = [
  kacy1x,
  kacy2x,
  kacy3x,
  lpPNG,
  lpJoe,
  ahype,
  tricrypto,
  kacyInvestor1,
  kacyInvestor2,
  phype,
  lpBalancer
]
