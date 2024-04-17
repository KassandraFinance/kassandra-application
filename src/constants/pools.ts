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
        height?: string
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
export const LP_KACY_WETH_QUICKSWAP =
  '0xA6D17eCf3f2ddA250BBC0dBcE99DC38E698e0b4D'
export const LP_KACY_ETH_CAMELOT = '0x314A441f77D9CB5B3a9bBc7037Bd1a9951cA8DdE'

export const AHYPE_ADDRESS =
  process.env.NEXT_PUBLIC_MASTER === '1'
    ? '0x38918142779e2CD1189cBd9e932723C968363D1E'
    : '0xE34A2935B04e9c879f5bDd022b97D7Cf2F1Dde1d'

export const TRICRYPTO_ADDRESS = '0xA6CAB4b1019ee22309dcA5ba62C3372a791dcB2E'

export const PHYPE = {
  address: '0x83Db290AE85e02FEF7ccF45c1B551e75e7F8cC82',
  id: '1370x83db290ae85e02fef7ccf45c1b551e75e7f8cc82000100000000000000000b52'
}

export const KKF = {
  address: '0xC22bb237A5B8b7260190cb9e4998A9901a68af6f',
  id: '1370xc22bb237a5b8b7260190cb9e4998a9901a68af6f000100000000000000000d8d'
}
export const KKF_ARB = {
  address: '0x2Ae2BAeeC8Ccd16075d821832fFEe9172bAE3676',
  id: '421610x2ae2baeec8ccd16075d821832ffee9172bae36760001000000000000000004f1'
}
export const LOW_RISK = {
  address: '0x856561C3b21eFCa7e483b1aD197E4ab5Fb56CcDb',
  id: '431140x856561c3b21efca7e483b1ad197e4ab5fb56ccdb000100000000000000000048'
}

export const MEDIUM_RISK = {
  address: '0x416101D98dF2187DDc0fF29b787dEd19dD8C9740',
  id: '1370x416101d98df2187ddc0ff29b787ded19dd8c9740000100000000000000000e57'
}

export const HIGH_RISK = {
  address: '0xC3F47f3627305213ADaa021CcCCb61D5987EAa97',
  id: '421610xc3f47f3627305213adaa021ccccb61d5987eaa97000100000000000000000532'
}

export const KACY_WETH = '0xfaf3bc722d34146be83a2aac40b43148a51a9126'
export const WAVAX_POLYGON = '0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b'

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
  symbol: 'JLP',
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
    link: `https://traderjoexyz.com/avalanche/pool/v1/AVAX/${KACY_ADDRESS}`
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

const keirkrew: PoolDetails = {
  pid: 2,
  type: PoolType.FARM,
  symbol: '$KKF',
  stakingContract: '0xd530f3ce79c9eb03e59dce89a7504dd41d4899bb',
  poolTokenAddress: KKF.address,
  chain: {
    id: 137,
    logo: '/assets/logos/polygon.svg'
  },
  properties: {
    logo: {
      src: 'https://storage.googleapis.com/logos-kassandra/1370xc22bb237a5b8b7260190cb9e4998a9901a68af6f000100000000000000000d8d',
      style: { width: '5.8rem' }
    },
    title: '$KKF',
    link: `/pool/${KKF.id}`
  },
  stakeWithVotingPower: false,
  stakeWithLockPeriod: false,
  address: KKF.address
}

const keirkrewArb: PoolDetails = {
  pid: 1,
  type: PoolType.FARM,
  symbol: '$aKKF',
  stakingContract: '0xdcbdde53cfebae239b77b6ef896261da80531884',
  poolTokenAddress: KKF_ARB.address,
  chain: {
    id: 42161,
    logo: '/assets/logos/arbitrum.svg'
  },
  properties: {
    logo: {
      src: 'https://storage.googleapis.com/logos-kassandra/421610x2ae2baeec8ccd16075d821832ffee9172bae36760001000000000000000004f1',
      style: { width: '5.8rem' }
    },
    title: '$aKKF',
    link: `/pool/${KKF_ARB.id}`
  },
  stakeWithVotingPower: false,
  stakeWithLockPeriod: false,
  address: KKF_ARB.address
}

const lowRisk: PoolDetails = {
  pid: 9,
  type: PoolType.FARM,
  symbol: '$LRK',
  stakingContract: '0xfddc1956d88a34fcB0671508Fa3d5aaC73b2a031',
  poolTokenAddress: LOW_RISK.address,
  chain: {
    id: 43114,
    logo: '/assets/logos/avax.png'
  },
  properties: {
    logo: {
      src: 'https://storage.googleapis.com/logos-kassandra/431140x856561c3b21efca7e483b1ad197e4ab5fb56ccdb000100000000000000000048',
      style: { width: '5.8rem', height: '5.8rem' }
    },
    title: '$LRK',
    link: `/pool/${LOW_RISK.id}`
  },
  stakeWithVotingPower: false,
  stakeWithLockPeriod: false,
  address: LOW_RISK.address
}

const mediumRisk: PoolDetails = {
  pid: 4,
  type: PoolType.FARM,
  symbol: '$MRK',
  stakingContract: '0xd530f3ce79c9eb03e59dce89a7504dd41d4899bb',
  poolTokenAddress: MEDIUM_RISK.address,
  chain: {
    id: 137,
    logo: '/assets/logos/polygon.svg'
  },
  properties: {
    logo: {
      src: 'https://storage.googleapis.com/logos-kassandra/1370x416101d98df2187ddc0ff29b787ded19dd8c9740000100000000000000000e57',
      style: { width: '5.8rem', height: '5.8rem' }
    },
    title: '$MRK',
    link: `/pool/${MEDIUM_RISK.id}`
  },
  stakeWithVotingPower: false,
  stakeWithLockPeriod: false,
  address: MEDIUM_RISK.address
}

const highRisk: PoolDetails = {
  pid: 2,
  type: PoolType.FARM,
  symbol: '$HRK',
  stakingContract: '0xdcbdde53cfebae239b77b6ef896261da80531884',
  poolTokenAddress: HIGH_RISK.address,
  chain: {
    id: 42161,
    logo: '/assets/logos/arbitrum.svg'
  },
  properties: {
    logo: {
      src: 'https://storage.googleapis.com/logos-kassandra/421610xc3f47f3627305213adaa021ccccb61d5987eaa97000100000000000000000532',
      style: { width: '5.8rem', height: '5.8rem' }
    },
    title: '$HRK',
    link: `/pool/${HIGH_RISK.id}`
  },
  stakeWithVotingPower: false,
  stakeWithLockPeriod: false,
  address: HIGH_RISK.address
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

const lpQuickSwap: PoolDetails = {
  pid: 3,
  type: PoolType.LP,
  symbol: 'UNI-V2',
  stakingContract: '0xd530f3ce79c9eb03e59dce89a7504dd41d4899bb',
  poolTokenAddress: KacyPoligon,
  chain: {
    id: 137,
    logo: '/assets/logos/polygon.svg'
  },
  properties: {
    logo: {
      src: '/assets/logos/lp-quickswap.svg',
      style: { width: '14.4rem' }
    },
    title: '$KACY-WETH QUICKSWAP',
    link: `https://quickswap.exchange/#/analytics/v2/pair/${LP_KACY_WETH_QUICKSWAP}`
  },
  stakeWithVotingPower: false,
  stakeWithLockPeriod: false,
  address: LP_KACY_WETH_QUICKSWAP,
  lpPool: {
    type: lpPoolType.AVAX
  }
}
const lpCamelot: PoolDetails = {
  pid: 0,
  type: PoolType.LP,
  symbol: 'CMLT-LP',
  stakingContract: '0xdcbdde53cfebae239b77b6ef896261da80531884',
  poolTokenAddress: KacyPoligon,
  chain: {
    id: 42161,
    logo: '/assets/logos/arbitrum.svg'
  },
  properties: {
    logo: {
      src: '/assets/logos/lp-camelot.svg',
      style: { width: '14.4rem' }
    },
    title: '$KACY-ETH CAMELOT',
    link: `https://app.camelot.exchange/liquidity/?token1=0x366e293A5CF90A0458D9fF9f3f92234dA598F62e&token2=0x82aF49447D8a07e3bd95BD0d56f35241523fBab1&type=v2&position=lp`
  },
  stakeWithVotingPower: false,
  stakeWithLockPeriod: false,
  address: LP_KACY_ETH_CAMELOT,
  lpPool: {
    type: lpPoolType.AVAX
  }
}

// addresses list to get price on the stake page
export const addressesForReqStakePool = [KacyPoligon]
export const addressesForReqLpPool = [WETH_POLYGON, KacyPoligon, WAVAX_POLYGON]
export const addressesForReqFarmPool = [
  PHYPE.id,
  KKF.id,
  KKF_ARB.id,
  TRICRYPTO_ADDRESS,
  AHYPE_ADDRESS,
  LOW_RISK.id,
  MEDIUM_RISK.id,
  HIGH_RISK.id
]

export const poolsKacy = [kacy1x, kacy2x, kacy3x]
export const poolsInvestor = [kacyInvestor1, kacyInvestor2]
export const poolsFunds = [
  lpJoe,
  lpQuickSwap,
  lpCamelot,
  lowRisk,
  mediumRisk,
  highRisk,
  keirkrew,
  keirkrewArb,
  phype,
  ahype,
  tricrypto,
  lpPNG,
  lpBalancer
]
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
  lpBalancer,
  lpQuickSwap,
  keirkrew,
  keirkrewArb,
  lpCamelot,
  lowRisk,
  mediumRisk,
  highRisk
]
