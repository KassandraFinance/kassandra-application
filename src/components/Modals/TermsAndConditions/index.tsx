import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import closeIcon from '../../../../public/assets/utilities/close-icon.svg'

import Overlay from '../../Overlay'

import * as S from './styles'

interface ITermsAndConditionsProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TermsAndConditions = ({
  modalOpen,
  setModalOpen
}: ITermsAndConditionsProps) => {
  function handleCloseModal() {
    setModalOpen(false)
  }

  return (
    <>
      <Overlay onClick={handleCloseModal} />

      <S.TermsAndConditions modalOpen={modalOpen}>
        <S.ModalHeader>
          <h1>Terms and Conditions</h1>

          <S.CloseButton onClick={handleCloseModal}>
            <Image src={closeIcon} alt="Close" width={12} height={12} />
          </S.CloseButton>
        </S.ModalHeader>
        <S.TermsAndConditionsBody>
          <p>
            In eleifend sed phasellus et hendrerit neque egestas. Ut nisi
            ultricies egestas enim. Vitae ipsum ullamcorper quam arcu. Habitant
            luctus facilisis pellentesque commodo purus erat sit non amet.
            Turpis quis purus quam mus ut. Aliquam dolor at vel integer sed
            vivamus tellus at lorem. Interdum purus tellus a enim ipsum. Fames
            laoreet volutpat cras integer tristique in a suscipit vitae. Nunc
            fermentum ligula aliquam euismod risus mauris natoque tortor sed. At
            risus tellus vitae non ultricies adipiscing. Ullamcorper rutrum sit
            quisque scelerisque non eleifend viverra. Etiam est ut id viverra.
            Senectus tempor lacus posuere elit elementum ut tempus mi. Amet
            vitae neque aliquam.
          </p>
          <h2>Adipiscing et fermentum</h2>
          <hr />
          <p>
            In eleifend sed phasellus et hendrerit neque egestas. Ut nisi
            ultricies egestas enim. Vitae ipsum ullamcorper quam arcu. Habitant
            luctus facilisis pellentesque commodo purus erat sit non amet.
            Turpis quis purus quam mus ut. Aliquam dolor at vel integer sed
            vivamus tellus at lorem. Interdum purus tellus a enim ipsum. Fames
            laoreet volutpat cras integer tristique in a suscipit vitae. Nunc
            fermentum ligula aliquam euismod risus mauris natoque tortor sed. At
            risus tellus vitae non ultricies adipiscing. Ullamcorper rutrum sit
            quisque scelerisque non eleifend viverra. Etiam est ut id viverra.
            Senectus tempor lacus posuere elit elementum ut tempus mi. Amet
            vitae neque aliquam.
          </p>
          <h2>Neque pulvinar semper</h2>
          <hr />
          <p>
            In eleifend sed phasellus et hendrerit neque egestas. Ut nisi
            ultricies egestas enim. Vitae ipsum ullamcorper quam arcu. Habitant
            luctus facilisis pellentesque commodo purus erat sit non amet.
            Turpis quis purus quam mus ut. Aliquam dolor at vel integer sed
            vivamus tellus at lorem. Interdum purus tellus a enim ipsum. Fames
            laoreet volutpat cras integer tristique in a suscipit vitae. Nunc
            fermentum ligula aliquam euismod risus mauris natoque tortor sed. At
            risus tellus vitae non ultricies adipiscing. Ullamcorper rutrum sit
            quisque scelerisque non eleifend viverra. Etiam est ut id viverra.
            Senectus tempor lacus posuere elit elementum ut tempus mi. Amet
            vitae neque aliquam.
          </p>
          <h2>Neque pulvinar semper</h2>
          <hr />
          <p>
            In eleifend sed phasellus et hendrerit neque egestas. Ut nisi
            ultricies egestas enim. Vitae ipsum ullamcorper quam arcu. Habitant
            luctus facilisis pellentesque commodo purus erat sit non amet.
            Turpis quis purus quam mus ut. Aliquam dolor at vel integer sed
            vivamus tellus at lorem. Interdum purus tellus a enim ipsum. Fames
            laoreet volutpat cras integer tristique in a suscipit vitae. Nunc
            fermentum ligula aliquam euismod risus mauris natoque tortor sed. At
            risus tellus vitae non ultricies adipiscing. Ullamcorper rutrum sit
            quisque scelerisque non eleifend viverra. Etiam est ut id viverra.
            Senectus tempor lacus posuere elit elementum ut tempus mi. Amet
            vitae neque aliquam.
          </p>
          <h2>Neque pulvinar semper</h2>
          <hr />
          <p>
            In eleifend sed phasellus et hendrerit neque egestas. Ut nisi
            ultricies egestas enim. Vitae ipsum ullamcorper quam arcu. Habitant
            luctus facilisis pellentesque commodo purus erat sit non amet.
            Turpis quis purus quam mus ut. Aliquam dolor at vel integer sed
            vivamus tellus at lorem. Interdum purus tellus a enim ipsum. Fames
            laoreet volutpat cras integer tristique in a suscipit vitae. Nunc
            fermentum ligula aliquam euismod risus mauris natoque tortor sed. At
            risus tellus vitae non ultricies adipiscing. Ullamcorper rutrum sit
            quisque scelerisque non eleifend viverra. Etiam est ut id viverra.
            Senectus tempor lacus posuere elit elementum ut tempus mi. Amet
            vitae neque aliquam.
          </p>
        </S.TermsAndConditionsBody>
        <S.shadow />
      </S.TermsAndConditions>
    </>
  )
}

export default TermsAndConditions
