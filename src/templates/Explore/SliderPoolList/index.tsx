import React from 'react'
import Slider, { Settings } from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { PoolData } from '@/components/FundCardNew'
import FundCardNew from '../../../components/FundCardNew'

import * as S from './styles'

interface ISliderPoolListProps {
  poolData: PoolData[]
  kacyPrice?: string
}

function SliderPoolList({ poolData, kacyPrice }: ISliderPoolListProps) {
  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  }

  return (
    <S.SliderPoolList>
      <Slider {...settings}>
        {poolData.map(pool => {
          return (
            <FundCardNew
              key={pool.id}
              poolData={pool}
              kacyPrice={kacyPrice}
              link={`/pool/${pool.address}`}
            />
          )
        })}
      </Slider>
    </S.SliderPoolList>
  )
}

export default SliderPoolList
