import Big from 'big.js'
import { ethers } from 'ethers'
import Tippy from '@tippyjs/react'
import React, { FormEvent } from 'react'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'

import { GovernorAlpha } from '@/constants/tokenAddresses'

import useGov from '@/hooks/useGov'
import { useAppDispatch } from '@/store/hooks'
import { useVotingPower } from '@/hooks/query/useVotingPower'
import { setModalAlertText } from '@/store/reducers/modalAlertText'

import Button from '@/components/Button'
import VotingPower from '@/components/VotingPower'
import Breadcrumb from '@/components/Breadcrumb'
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem'
import InputText from '@/components/Inputs/InputText'
import MarkdownEditor from '@/components/MarkdownEditor'
import TitleWithContador from './TitleWithCounter'
import ExternalLink from '@/components/ExternalLink'
import AdvancedProposalOption from './AdvancedProposalOption'

import * as S from './styles'

const CreateProposal = () => {
  const [proposalTitle, setProposalTitle] = React.useState('')
  const [proposalDescription, setProposalDescription] = React.useState('')
  const [proposalForumLink, setProposalForumLink] = React.useState('')
  const [proposalFunction, setProposalFunction] = React.useState('')
  const [proposalParamanters, setProposalParamanters] = React.useState('')
  const [proposalAddress, setProposalAddress] = React.useState('')
  const [isOpenAdvancedOptions, setIsOpenAdvancedOptions] =
    React.useState(false)

  const dispatch = useAppDispatch()
  const { propose } = useGov(GovernorAlpha)
  const [{ wallet, connecting }, connect] = useConnectWallet()
  const [{ connectedChain }, setChain] = useSetChain()
  const { data } = useVotingPower({ id: wallet?.accounts[0].address ?? '' })

  const minimalVotingPower = Big(
    data?.governances[0]?.totalVotingPower ?? '0'
  ).mul('0.01')

  function handleProposalTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setProposalTitle(event.target.value)
  }

  function handleProposalDescription({ text }: { text: string }) {
    setProposalDescription(text)
  }

  function handleProposalFunctionsChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setProposalFunction(event.target.value)
  }

  function handleToggleChange() {
    setIsOpenAdvancedOptions(prevState => !prevState)
  }

  function handleProposalAddressChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setProposalAddress(event.target.value)
  }

  function handleProposalParametersChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setProposalParamanters(event.target.value)
  }

  function extractFunctionsList(value: string) {
    const regex = /(\w+\([^)]*\))/g

    return value.replace(/\s/g, '').match(regex) ?? []
  }

  function extractParametersTypeList(value: string) {
    const regex = /\(([^)]*)\)/g

    const parametersList = [...value.matchAll(regex)]

    return parametersList.flatMap(item => item[1].split(','))
  }

  function checkForumLink(link: string) {
    const forumLink = 'https://gov.kassandra.finance/'

    return link.startsWith(forumLink)
  }

  function extractParametersValueList(value: string) {
    const regex = /\[.*?\]/g

    const match = value.match(regex)
    const parametersValue = match && match.map(item => item.slice(1, -1))

    return parametersValue
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const descriptionWithTitle =
      '# ' + proposalTitle + '\n' + proposalDescription

    if (proposalForumLink) {
      const isForumLink = checkForumLink(proposalForumLink)

      if (!isForumLink) {
        dispatch(
          setModalAlertText({
            errorText:
              'Forum Link Incorrect. Please check the link and try again.'
          })
        )
        return
      }
    }

    if (!isOpenAdvancedOptions) {
      const defaultTargets = [ethers.ZeroAddress]
      const defaultValues = ['0']
      const defaultSignatures = ['']
      const defaultCallDatas = [ethers.ZeroHash]
      const descriptionWithForumLink =
        descriptionWithTitle + '\n' + proposalForumLink

      await propose(
        defaultTargets,
        defaultValues,
        defaultSignatures,
        defaultCallDatas,
        descriptionWithForumLink
      )

      return
    }

    const functionsList = extractFunctionsList(proposalFunction)
    const parametersValueList = extractParametersValueList(
      proposalParamanters.replace(/\s/g, '')
    )

    const values = new Array(functionsList.length).fill('0')
    const proposalAddressFormatted = proposalAddress
      .replace(/\s/g, '')
      .split(',')

    if (functionsList.length !== proposalAddressFormatted.length) {
      dispatch(
        setModalAlertText({
          errorText: 'Mismatch between input functions and parameters data.'
        })
      )
      return
    }

    if (functionsList.length !== parametersValueList?.length) {
      dispatch(
        setModalAlertText({
          errorText: 'Mismatch between input functions and parameters data.'
        })
      )
      return
    }

    const dataHexstring = functionsList.map((item, index) => {
      const parametersTypeList = extractParametersTypeList(item)
      const parametersValue = parametersValueList
        ? parametersValueList[index].split(',')
        : []

      try {
        const data = new ethers.AbiCoder().encode(
          parametersTypeList,
          parametersValue
        )

        return data
      } catch (error: any) {
        const code = error.toString().match(/code=([^,]+)/)

        if (code && code[1] === 'INVALID_ARGUMENT') {
          const type = error.toString().match(/argument=\s*"([^"]+)"/)[1]
          const value = error.toString().match(/value=\s*"([^"]+)"/)[1]

          if (type && value) {
            dispatch(
              setModalAlertText({
                errorText: `In function "${item}", the argument type "${type}" does not match the provided value "${value}".`
              })
            )

            return
          }
        }

        if (code && code[1] === 'MISSING_ARGUMENT') {
          dispatch(
            setModalAlertText({
              errorText: `In the function ${item}, there is missing data in the parameter according to the provided types.`
            })
          )

          return
        }

        dispatch(
          setModalAlertText({
            errorText: `There was an encoding error with the parameters of the function "${item}". Please review the function parameters and try again`
          })
        )
      }
    })

    if (dataHexstring.indexOf(undefined) !== -1) return

    await propose(
      proposalAddressFormatted,
      values,
      functionsList,
      dataHexstring as string[],
      descriptionWithTitle
    )
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem href="/gov">Overview</BreadcrumbItem>
        <BreadcrumbItem href="/" isLastPage>
          Governance proposals
        </BreadcrumbItem>
      </Breadcrumb>

      <S.CreateProposal onSubmit={handleSubmit}>
        <S.InputsContainer>
          <InputText
            lable="Title"
            required={true}
            name="Title"
            type="text"
            placeholder="Enter your title"
            value={proposalTitle}
            minLength={0}
            maxLength={300}
            error=""
            onChange={handleProposalTitle}
          />

          <S.MarkdownEditorContainer>
            <TitleWithContador
              title="Description"
              maxValue={2000}
              currentvalue={proposalDescription.length}
            />

            <MarkdownEditor
              value={proposalDescription}
              handleEditorChange={handleProposalDescription}
            />
          </S.MarkdownEditorContainer>

          <div>
            <TitleWithContador title="Forum Link" optional />

            <InputText
              name="Title"
              type="text"
              placeholder="Forum link"
              value={proposalForumLink}
              minLength={0}
              maxLength={500}
              error=""
              onChange={e => setProposalForumLink(e.target.value)}
            />
          </div>

          <AdvancedProposalOption
            proposalAddress={proposalAddress}
            proposalFunction={proposalFunction}
            proposalParamanters={proposalParamanters}
            isOpenAdvancedOptions={isOpenAdvancedOptions}
            handleToggleChange={handleToggleChange}
            handleProposalAddressChange={handleProposalAddressChange}
            handleProposalFunctionsChange={handleProposalFunctionsChange}
            handleProposalParametersChange={handleProposalParametersChange}
          />

          <S.ButtonContainer>
            {Number(connectedChain?.id ?? '0x') !== Number('0xA86A') ? (
              <Button
                background="primary"
                text="Connect to Avalanche"
                type="button"
                fullWidth
                onClick={() => setChain({ chainId: `0xA86A` })}
              />
            ) : minimalVotingPower.gte(data?.user?.votingPower ?? '0') ? (
              <Tippy
                allowHTML={true}
                content={[
                  <S.ErrorMessage key="message-error">
                    you dont have the minimum voting power to create a proposal
                  </S.ErrorMessage>
                ]}
              >
                <div>
                  <Button
                    background="primary"
                    text="Send"
                    fullWidth
                    disabledNoEvent
                  />
                </div>
              </Tippy>
            ) : wallet?.provider ? (
              <Button background="primary" text="Send" fullWidth />
            ) : (
              <Button
                background="primary"
                text="Connect Wallet"
                fullWidth
                type="button"
                disabled={connecting}
                onClick={() => connect()}
              />
            )}
          </S.ButtonContainer>
        </S.InputsContainer>

        <S.ReviewContainer>
          <VotingPower
            currentVotingPower={Big(data?.user?.votingPower ?? '0')}
            totalVotingPower={Big(
              data?.governances[0]?.totalVotingPower ?? '0'
            )}
            minimalVotingPower={minimalVotingPower}
          />

          <S.ExternalLinkWrapper>
            <ExternalLink hrefNext="/farm?tab=stake" text="Obtain more" />
          </S.ExternalLinkWrapper>
        </S.ReviewContainer>
      </S.CreateProposal>
    </>
  )
}

export default CreateProposal
