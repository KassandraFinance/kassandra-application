import React from 'react'
import useMatomoEcommerce from '../../hooks/useMatomoEcommerce'
import TextField from '../TextField'
import { ToastSuccess } from '../Toastify/toast'

import * as S from './styles'

interface IFormSignUpParams {
  name?: string
  email?: string
}

interface IOnChangeFormParam {
  key: string
  value: string
}
const SubscribeBanner = () => {
  const { trackEventFunction } = useMatomoEcommerce()
  const [formState, setFormState] = React.useState<IFormSignUpParams>({})
  const onChangeFormParam = ({ key, value }: IOnChangeFormParam) => {
    setFormState({ ...formState, [key]: value })
  }

  const handleSubmit = () => {
    ToastSuccess('Successfully subscribed')
    trackEventFunction('click-on-button', 'send-email', 'subscribe-email')
    setTimeout(() => {
      setFormState({ email: '' })
    }, 1000)
  }

  return (
    //create a form to submit the email and name of the user to the backend
    <S.Container>
      <S.TextWrapper>
        <h1>Be the first to know.</h1>
        <span>
          Subscribe to our newsletter to get early information and special
          calls.
        </span>
      </S.TextWrapper>
      <S.Input>
        <iframe
          title="a"
          name="hiddenFrame"
          width="0"
          height="0"
          style={{ display: 'none' }}
        />
        <form
          action="https://heimdall.land/subscribe/heim"
          method="POST"
          target="hiddenFrame"
          onSubmit={handleSubmit}
        >
          <TextField hidden name="user" value="Gem Hunter" />

          <TextField
            icon={
              <img
                src="/assets/utilities/foward-arrow.svg"
                alt="Subscribe"
                title="Subscribe"
                onClick={handleSubmit}
              />
            }
            iconPosition="right"
            name="email"
            placeholder="Email"
            type="email"
            value={formState.email}
            onChange={e =>
              onChangeFormParam({
                key: 'email',
                value: e.target.value
              })
            }
          />
        </form>
      </S.Input>
    </S.Container>
  )
}
export default SubscribeBanner
