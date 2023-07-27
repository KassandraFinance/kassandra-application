import { useQueryClient, useMutation } from '@tanstack/react-query'
import { getAddress } from 'ethers'

import { backendClient } from '@/graphQLClients'
import { useAppDispatch } from '@/store/hooks'
import { setModalAlertText } from '@/store/reducers/modalAlertText'

type UseSavePoolProps = {
  chainId: number
  controller: string
  signature: string
  logo?: string
  summary?: string
}

export const sendSavePool = async ({
  chainId,
  controller,
  signature,
  logo,
  summary
}: UseSavePoolProps) => {
  return backendClient
    .SavePool({ chainId, controller, signature, logo, summary })
    .then(res => res)
}

export const useSavePool = ({ id, user }: { id: string; user?: string }) => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: ({
      chainId,
      controller,
      signature,
      logo,
      summary
    }: UseSavePoolProps) => {
      return sendSavePool({ chainId, controller, signature, logo, summary })
    },
    onError: () => {
      dispatch(
        setModalAlertText({
          errorText: 'Could not save pool metadata',
          solutionText: 'Please try adding it later'
        })
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['pool-strategy', id] })
      if (user) {
        queryClient.invalidateQueries({
          queryKey: ['manager-pool-info', id, getAddress(user)]
        })
      }
    }
  })
}
