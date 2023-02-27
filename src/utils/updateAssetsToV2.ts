import Big from 'big.js'

type WeightsV2 = {
  start_timestamp: number,
  end_timestamp: number,
  weights: {
    weight_normalized: Big,
    token: {
      id: string
    }
  }[]
}

type UnderlyingAssets = {
  balance: Big,
  weight_normalized: Big,
  weight_goal_normalized: Big,
  token: {
    id: string,
    name: string,
    logo: string,
    decimals: number,
    symbol: string,
    price_usd: Big,
    wraps?: {
      logo: string
    }
  }
}

export function getWeightsNormalizedV2(
  weights: WeightsV2[],
  underlying_assets: UnderlyingAssets[]
): UnderlyingAssets[] | undefined {
  if (weights.length <= 0) return

  const currentTime = new Date().getTime() / 1000
  const startTime = weights[0].start_timestamp
  const endTime = weights[0].end_timestamp

  if (startTime >= currentTime && endTime > currentTime && weights.length > 1) {
    const assetsV2 = weights[0].weights.map((weight, i) => {
      const startWeight = weights[1].weights[i].weight_normalized
      const endWeight = weight.weight_normalized

      const asset = underlying_assets.find(
        asset => asset.token.id === weight.token.id
      )

      if (asset) {
        asset.weight_normalized = endWeight
          .sub(startWeight)
          .div(endTime - startTime)
          .mul(currentTime - startTime)
          .add(startWeight)
      } else {
        throw new Error()
      }
      return asset
    })
    return assetsV2
  } else if (weights.length >= 1) {
    let weigthsIndex = 0
    if (
      startTime < currentTime &&
      endTime > currentTime &&
      weights.length > 1
    ) {
      weigthsIndex = 1
    }

    const assetsV2 = weights[weigthsIndex].weights.map(weight => {
      const asset = underlying_assets.find(
        asset => asset.token.id === weight.token.id
      )
      if (asset) {
        asset.weight_normalized = weight.weight_normalized
      } else {
        throw new Error()
      }
      return asset
    })
    return assetsV2
  }
}
