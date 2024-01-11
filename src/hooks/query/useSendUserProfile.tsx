import { FormEvent } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { getAddress } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'

import useSignMessage from '@/hooks/useSignMessage'
import { UserProfileType } from '@/hooks/query/useUserProfile'

import { INftDetailsListProps } from '@/components/UserNFts'

type SendUserDataType = {
  userWallet: string
  nickname: string | null
  twitter: string | null
  website: string | null
  telegram: string | null
  discord: string | null
  description: string | null
  image: string | null
  isNFT: boolean
  nft: any
}

type HandleFormChangeEditInfoType = {
  editYourProfileInput: UserProfileType
  userImageModal: {
    image_preview: string
    image_file: Blob | null
    isNFTPreviewModal: boolean
  }
  userNftDetails: INftDetailsListProps | undefined
}

const sendUserData = async ({
  userWallet,
  nickname,
  twitter,
  website,
  telegram,
  discord,
  description,
  image,
  isNFT,
  nft
}: SendUserDataType) => {
  const res = await fetch(`/api/profile/${userWallet}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nickname,
      twitter,
      website,
      telegram,
      discord,
      description,
      image,
      isNFT,
      nft
    })
  })

  return res
}

export const useSendUserProfile = () => {
  const [{ wallet }] = useConnectWallet()
  let id = ''
  if (wallet?.provider) {
    id = getAddress(wallet.accounts[0].address)
  }

  const queryClient = useQueryClient()
  const { signMessage } = useSignMessage()

  const uploadImageMutation = useMutation({
    mutationFn: (imageInfo: Blob) => {
      const formData = new FormData()
      formData.append('image', imageInfo)
      return fetch(`/api/profile/${id}/upload-img`, {
        method: 'PUT',
        body: formData
      })
    }
  })

  const mutation = useMutation({
    mutationFn: ({
      nickname,
      twitter,
      website,
      telegram,
      discord,
      description,
      image,
      isNFT,
      nft
    }: SendUserDataType) => {
      return sendUserData({
        userWallet: id,
        nickname,
        twitter,
        website,
        telegram,
        discord,
        description,
        image,
        isNFT,
        nft
      })
    },
    onMutate: async ({
      nickname,
      twitter,
      website,
      telegram,
      discord,
      description,
      image,
      isNFT,
      nft
    }: SendUserDataType) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: ['user-profile', id]
      })

      // Snapshot the previous value
      const previousUserData = queryClient.getQueryData(['user-profile', id])

      // Optimistically update to the new value
      if (previousUserData) {
        queryClient.setQueryData(['user-profile', id], {
          nickname,
          twitter,
          website,
          telegram,
          discord,
          description,
          image,
          isNFT,
          nft
        })
      }

      return { previousUserData }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      if (context?.previousUserData) {
        queryClient.setQueryData(['user-profile', id], context.previousUserData)
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile', id] })
    }
  })

  async function handleFormChangeEditInfo(
    event: FormEvent,
    {
      editYourProfileInput,
      userImageModal,
      userNftDetails
    }: HandleFormChangeEditInfoType
  ) {
    event.preventDefault()

    const { nickname, twitter, website, telegram, discord, description } =
      editYourProfileInput

    const nftDetails = userImageModal.isNFTPreviewModal
      ? {
          contractType: userNftDetails?.contract_type,
          collectionName: userNftDetails?.name,
          symbol: userNftDetails?.symbol,
          tokenAddress: userNftDetails?.token_address,
          tokenId: userNftDetails?.token_id,
          chain: userNftDetails?.chain,
          nftName: userNftDetails?.metadata.name,
          nftDescription: userNftDetails?.metadata.description
        }
      : undefined

    try {
      const response = await fetch('/api/nonce')
      const { nonce } = await response.json()
      const message = JSON.stringify(
        {
          ...editYourProfileInput,
          nonce,
          address: id
        },
        null,
        2
      )

      const signature = await signMessage(message)

      const responseAuth = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: JSON.parse(message), signature })
      })

      const { authorized } = await responseAuth.json()
      if (authorized) {
        mutation.mutate({
          userWallet: id,
          nickname,
          twitter,
          website,
          telegram,
          discord,
          description,
          image: userImageModal.image_preview,
          isNFT: userImageModal.isNFTPreviewModal,
          nft: nftDetails
        })

        if (userImageModal.image_file) {
          uploadImageMutation.mutate(userImageModal.image_file)
        }
        return
      }
    } catch (error) {
      return error
    }
  }

  return { handleFormChangeEditInfo }
}
