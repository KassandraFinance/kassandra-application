import React from 'react'
import Image from 'next/image'
import 'tippy.js/dist/tippy.css'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { useConnectWallet } from '@web3-onboard/react'

import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'
import { UserProfileType } from '@/hooks/query/useUserProfile'
import { useSendUserProfile } from '@/hooks/query/useSendUserProfile'

import { useAppDispatch } from '@/store/hooks'
import { setModalAlertText } from '@/store/reducers/modalAlertText'

import Button from '@/components/Button'
import UserNFTs, { INftDetailsListProps } from '@/components/UserNFts'
import NftImage from '@/components/NftImage'
import Overlay from '@/components/Overlay'
import Modal from '../Modal'

import * as S from './styles'

interface IModalUserEditInfoProps {
  modalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  userData: UserProfileType
}

const ModalUserEditInfo = ({
  modalOpen,
  setModalOpen,
  userData
}: IModalUserEditInfoProps) => {
  const [isStateSocialMidia, setIsStateSocialMidia] = React.useState(false)
  const [isStateManagerInfo, setIsStateManagerInfo] = React.useState(false)
  const [isDropdownAddNft, setIsDropdownAddNft] = React.useState(false)
  const [userNftDetails, setUserNftDetails] =
    React.useState<INftDetailsListProps>()
  const [editYourProfileInput, setEditYourProfileInput] =
    React.useState<UserProfileType>({
      ...userData,
      nft: {
        ...userData.nft
      }
    })
  const [userImageModal, setUserImageModal] = React.useState<{
    image_preview: string
    image_file: Blob | null
    isNFTPreviewModal: boolean
  }>({
    image_preview: userData?.image || '',
    image_file: null,
    isNFTPreviewModal: userData?.isNFT === true
  })

  const dispatch = useAppDispatch()
  const [{ wallet }] = useConnectWallet()
  const inputRefModal = React.useRef<HTMLInputElement>(null)

  const { trackEventFunction } = useMatomoEcommerce()

  const { handleFormChangeEditInfo } = useSendUserProfile()

  function handleCloseModal() {
    setModalOpen(false)
  }

  function handleValueTextarea(value: number) {
    return 0 + value
  }

  function handleImagePreview(event: FileList) {
    if (event[0].size > 300000) {
      dispatch(
        setModalAlertText({
          errorText: 'Image is bigger than 300KB.',
          solutionText: 'Image should be less than 300KB.'
        })
      )
      return
    }

    const allowedFileTypes = ['image/png', 'image/jpeg', 'image/gif']

    if (allowedFileTypes.indexOf(event[0].type) === -1) {
      dispatch(
        setModalAlertText({
          errorText: 'Wrong image format.',
          solutionText: 'Image should be jpg, jpeg or png.'
        })
      )
      return
    }

    if (event) {
      const image_as_base64 = URL.createObjectURL(event[0])
      const image_as_files = event[0]

      setUserImageModal({
        image_preview: image_as_base64,
        image_file: image_as_files,
        isNFTPreviewModal: false
      })
    }
  }

  React.useEffect(() => {
    if (window.screen.width > 768) {
      setIsStateSocialMidia(true)
      setIsStateManagerInfo(true)
    } else {
      setIsStateSocialMidia(false)
      setIsStateManagerInfo(false)
    }
  }, [modalOpen])

  return (
    <S.ModalUserEditInfo>
      <Overlay onClick={handleCloseModal} />

      <Modal title="Edit Your Profile" onCloseModal={() => setModalOpen(false)}>
        <S.BodyModalEditInfo
          onSubmit={event => {
            handleFormChangeEditInfo(event, {
              editYourProfileInput,
              userImageModal,
              userNftDetails
            })
            setModalOpen(false)
          }}
        >
          <S.UserProfileInfoContent>
            <S.UserProfileInfo>
              <S.UserImageContent>
                {userImageModal.image_file ? (
                  <img
                    src={userImageModal.image_preview}
                    id="userImageSelect"
                    alt=""
                    width={123}
                    height={123}
                  />
                ) : userImageModal.isNFTPreviewModal ? (
                  <NftImage
                    NftUrl={`${userImageModal.image_preview}`}
                    imageSize="large"
                  />
                ) : userImageModal.image_preview !== '' &&
                  userImageModal.image_preview !== undefined ? (
                  <img
                    src={userImageModal.image_preview}
                    id="userImageSelect"
                    alt=""
                    width={123}
                    height={123}
                  />
                ) : (
                  <Jazzicon
                    diameter={100}
                    seed={jsNumberForAddress(
                      wallet
                        ? String(wallet.accounts[0].address)
                        : '0x1111111111111111111111111111111111111111'
                    )}
                  />
                )}

                <span>
                  <label htmlFor="InputFile">Add Image</label>
                  <input
                    id="InputFile"
                    ref={inputRefModal}
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={event => {
                      if (event.target.files !== null) {
                        handleImagePreview(event.target.files)
                      }
                    }}
                    onClick={() =>
                      trackEventFunction(
                        'click-on-button',
                        'add-image',
                        'edit-modal-profile'
                      )
                    }
                  />
                  <S.ButtonAddNft
                    type="button"
                    isDropdownAddNft={isDropdownAddNft}
                    onClick={() => {
                      trackEventFunction(
                        'click-on-button',
                        'add-nft',
                        'edit-modal-profile'
                      )
                      setIsDropdownAddNft(!isDropdownAddNft)
                    }}
                  >
                    Add Image NFT
                    <Image
                      src="/assets/utilities/arrow-select-down.svg"
                      alt="arrow select button"
                      width={13}
                      height={13}
                    />
                  </S.ButtonAddNft>
                  <S.UserAddNftImage isDropdownAddNft={isDropdownAddNft}>
                    <UserNFTs
                      address={wallet?.accounts[0].address ?? ''}
                      setUserImageModal={setUserImageModal}
                      isDropdownAddNft={isDropdownAddNft}
                      setIsDropdownAddNft={setIsDropdownAddNft}
                      inputRefModal={inputRefModal}
                      setUserNftDetails={setUserNftDetails}
                    />
                  </S.UserAddNftImage>
                </span>
              </S.UserImageContent>
              <S.UserNameContent>
                <S.NicknameTilte>NICKNAME</S.NicknameTilte>
                <input
                  placeholder="Your Name"
                  onChange={event =>
                    setEditYourProfileInput({
                      ...editYourProfileInput,
                      nickname: event.target.value
                    })
                  }
                  value={editYourProfileInput?.nickname || ''}
                  maxLength={15}
                />
              </S.UserNameContent>
            </S.UserProfileInfo>
            <S.UserSocialAndInfoButton
              type="button"
              isStateSocialMidia={isStateSocialMidia}
              onClick={() => setIsStateSocialMidia(!isStateSocialMidia)}
            >
              SOCIAL MEDIA
              <span id="ImageContainer">
                <Image
                  src="/assets/utilities/arrow-select-down.svg"
                  alt="arrow select button"
                  width={13}
                  height={13}
                />
              </span>
            </S.UserSocialAndInfoButton>
            <S.UserSocialMidia isStateSocialMidia={isStateSocialMidia}>
              <p>SOCIAL MEDIA</p>
              <ul>
                <S.SocialIcon>
                  <span>
                    <Image
                      src="/assets/socialMidia/twitter.svg"
                      alt="Follow our Twitter feed"
                      width={18}
                      height={18}
                    />
                  </span>
                  <input
                    placeholder="Insert Username"
                    onChange={event =>
                      setEditYourProfileInput({
                        ...editYourProfileInput,
                        twitter: event.target.value
                      })
                    }
                    value={editYourProfileInput?.twitter || ''}
                  />
                </S.SocialIcon>
                <S.SocialIcon>
                  <span>
                    <Image
                      src="/assets/socialMidia/webpage.svg"
                      alt="Follow our Twitter feed"
                      width={18}
                      height={18}
                    />
                  </span>
                  <input
                    placeholder="Insert Website"
                    onChange={event =>
                      setEditYourProfileInput({
                        ...editYourProfileInput,
                        website: event.target.value
                      })
                    }
                    value={editYourProfileInput?.website || ''}
                  />
                </S.SocialIcon>
                <S.SocialIcon>
                  <span>
                    <Image
                      src="/assets/socialMidia/telegram.svg"
                      alt="Follow our Twitter feed"
                      width={18}
                      height={18}
                    />
                  </span>
                  <input
                    placeholder="Insert Username"
                    onChange={event =>
                      setEditYourProfileInput({
                        ...editYourProfileInput,
                        telegram: event.target.value
                      })
                    }
                    value={editYourProfileInput?.telegram || ''}
                  />
                </S.SocialIcon>
                <S.SocialIcon>
                  <span>
                    <Image
                      src="/assets/socialMidia/discord.svg"
                      alt="Follow our Twitter feed"
                      width={18}
                      height={18}
                    />
                  </span>
                  <input
                    placeholder="Insert Username"
                    onChange={event =>
                      setEditYourProfileInput({
                        ...editYourProfileInput,
                        discord: event.target.value
                      })
                    }
                    value={editYourProfileInput?.discord || ''}
                  />
                </S.SocialIcon>
              </ul>
            </S.UserSocialMidia>
          </S.UserProfileInfoContent>
          <S.UserSocialAndInfoButton
            id="managerInfoButton"
            type="button"
            isStateSocialMidia={isStateManagerInfo}
            onClick={() => setIsStateManagerInfo(!isStateManagerInfo)}
          >
            MANAGER INFO
            <span id="ImageContainer">
              <Image
                src="/assets/utilities/arrow-select-down.svg"
                alt="arrow select button"
                width={13}
                height={13}
              />
            </span>
          </S.UserSocialAndInfoButton>
          <S.ModalManagerInfo isStateManagerInfo={isStateManagerInfo}>
            <p>MANAGER INFO</p>
            <textarea
              placeholder="Your description..."
              maxLength={500}
              onChange={event =>
                setEditYourProfileInput({
                  ...editYourProfileInput,
                  description: event.target.value
                })
              }
              value={editYourProfileInput?.description || ''}
            />
            <span>
              {editYourProfileInput.description &&
                handleValueTextarea(editYourProfileInput.description.length)}
              /500
            </span>
          </S.ModalManagerInfo>
          <S.UserEditInfoButtons>
            <Button
              type="submit"
              text="Save Changes"
              size="claim"
              backgroundSecondary
              fullWidth
              onClick={() =>
                trackEventFunction(
                  'click-on-button',
                  'save-edit-info',
                  'edit-modal-profile'
                )
              }
            />
            <Button
              type="button"
              text="Cancel"
              size="claim"
              backgroundBlack
              fullWidth
              onClick={() => setModalOpen(false)}
            />
          </S.UserEditInfoButtons>
        </S.BodyModalEditInfo>
      </Modal>
    </S.ModalUserEditInfo>
  )
}

export default ModalUserEditInfo
