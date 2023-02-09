import React from 'react'
import useMatomoEcommerce from '../../hooks/useMatomoEcommerce'

export interface PartnerData {
  href: string;
  logo: string;
}

const Partner = ({ href, logo }: PartnerData) => {
  const { trackEventFunction } = useMatomoEcommerce()

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEventFunction('click-on-partner', href, 'powered-invest')
      }
    >
      <img src={logo} alt={href} />
    </a>
  )
}

export default Partner
