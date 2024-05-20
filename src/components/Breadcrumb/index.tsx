import { ReactNode } from 'react'

import * as S from './styles'

interface IBreadcrumbProps {
  children: ReactNode
}

const Breadcrumb = ({ children }: IBreadcrumbProps) => {
  return <S.Breadcrumb>{children}</S.Breadcrumb>
}

export default Breadcrumb
