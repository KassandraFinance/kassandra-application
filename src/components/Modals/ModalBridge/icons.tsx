import Image from 'next/image'

import AvalancheIcon from '@assets/logos/avalanche.svg'
import PolygonIcon from '@assets/logos/polygon.svg'
import ArbitrumIcon from '@assets/logos/arbitrum.svg'

export const avalancheIcon = (
  <Image src={AvalancheIcon.src} width={24} height={24} />
)

export const polygonIcon = (
  <Image src={PolygonIcon.src} width={24} height={24} />
)

export const arbitrumIcon = (
  <Image src={ArbitrumIcon.src} width={24} height={24} />
)
