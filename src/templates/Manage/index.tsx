import React from 'react'
import Header from '../../components/Header'
import GetStarted from './GetStarted'
import SideBar from './SideBar'

import * as S from './styles'

const Manage = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <S.Manage>
      <S.DashBoard isOpen={isOpen}>
        <S.OpenButton onClick={() => setIsOpen(!isOpen)}>
          {!isOpen ? (
            <svg
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.78113 17.8495C7.54219 18.077 7.55226 18.4612 7.80278 18.6759C8.01906 18.8613 8.34034 18.8537 8.5476 18.6583L16.668 11.002L8.5476 3.3456C8.34034 3.15019 8.01906 3.14258 7.80278 3.32796C7.55226 3.5427 7.54219 3.92689 7.78113 4.15445L14.971 11.002L7.78113 17.8495Z"
                fill="#FCFCFC"
              />
              <path
                d="M1.76941 17.8495C1.53047 18.077 1.54054 18.4612 1.79106 18.6759C2.00734 18.8613 2.32862 18.8537 2.53588 18.6583L10.6562 11.002L2.53588 3.3456C2.32862 3.15019 2.00734 3.14258 1.79106 3.32796C1.54054 3.5427 1.53047 3.92689 1.76941 4.15445L8.95928 11.002L1.76941 17.8495Z"
                fill="#FCFCFC"
              />
            </svg>
          ) : (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.266799 1.55502C-0.088933 1.19929 -0.0889332 0.622532 0.266799 0.266799C0.622531 -0.0889331 1.19929 -0.0889331 1.55502 0.266799L11.7332 10.445C12.0889 10.8007 12.0889 11.3774 11.7332 11.7332C11.3774 12.0889 10.8007 12.0889 10.445 11.7332L0.266799 1.55502Z"
                fill="#FCFCFC"
              />
              <path
                d="M10.445 0.266826C10.8007 -0.0889065 11.3775 -0.0889067 11.7332 0.266826C12.089 0.622558 12.089 1.19931 11.7332 1.55505L1.55508 11.7332C1.19934 12.0889 0.622587 12.0889 0.266855 11.7332C-0.0888778 11.3775 -0.0888778 10.8007 0.266855 10.445L10.445 0.266826Z"
                fill="#FCFCFC"
              />
            </svg>
          )}
        </S.OpenButton>
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div></div>

        <S.Content>
          <Header />

          <GetStarted />
        </S.Content>
      </S.DashBoard>
    </S.Manage>
  )
}

export default Manage
