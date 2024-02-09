import React from 'react'
import { ethers } from 'ethers'

import { URL_PROPOSE_FUNCTION_SNOWTRACE } from '@/constants/tokenAddresses'

import InputToggle from '@/components/Inputs/InputToggle'
import InputText from '@/components/Inputs/InputText'

import substr from '@/utils/substr'

import * as S from './styles'

interface IAdvancedProposalOptionProps {
  isOpenAdvancedOptions: boolean
  handleToggleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  proposalFunction: string
  handleProposalFunctionsChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  proposalAddress: string
  handleProposalAddressChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  proposalParameters: string
  handleProposalParametersChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
}
const AdvancedProposalOption = ({
  isOpenAdvancedOptions,
  handleToggleChange,
  proposalAddress,
  handleProposalAddressChange,
  proposalFunction,
  handleProposalFunctionsChange,
  proposalParameters,
  handleProposalParametersChange
}: IAdvancedProposalOptionProps) => {
  return (
    <S.AdvancedProposalOption isOpen={isOpenAdvancedOptions}>
      <S.TitleContainer>
        <S.TitleContent>
          <p>ADVANCED</p>

          <InputToggle
            toggleName="ADVANCED"
            isChecked={isOpenAdvancedOptions}
            handleToggleChange={handleToggleChange}
          />
        </S.TitleContent>

        <p>
          Here, you will be able to input the parameters that will interact with
          the smart contract team. You can interact with the{' '}
          <a
            href={URL_PROPOSE_FUNCTION_SNOWTRACE}
            target="_blank"
            rel="noreferrer"
          >
            contract{' '}
          </a>
          using the &rsquo;propose&rsquo; function and assigning these
          parameters. You can test it using{' '}
          <a href="https://tenderly.co/" target="_blank" rel="noreferrer">
            Tenderly
          </a>{' '}
          or reach out to us on{' '}
          <a
            href="https://discord.gg/dBkTCZctKt"
            target="_blank"
            rel="noreferrer"
          >
            Discord
          </a>
          .
        </p>
      </S.TitleContainer>

      <S.BodyContainer isOpen={isOpenAdvancedOptions}>
        <S.InputTextContainer>
          <InputText
            name="Function"
            label="Function"
            type="text"
            placeholder="Enter the Functions"
            minLength={0}
            maxLength={10000}
            error=""
            value={proposalFunction}
            onChange={event => handleProposalFunctionsChange(event)}
            required={isOpenAdvancedOptions}
          />
          <S.Example>
            Ex: approve(address,uint256), transfer(address,uint256) ...
          </S.Example>
        </S.InputTextContainer>

        <S.InputTextContainer>
          <InputText
            label="Parameters"
            name="Parameters"
            type="text"
            placeholder="Enter the Parameters"
            minLength={0}
            maxLength={10000}
            error=""
            value={proposalParameters}
            onChange={event => handleProposalParametersChange(event)}
            required={isOpenAdvancedOptions}
          />
          <S.Example>
            Ex: [{substr(ethers.ZeroAddress)}, 100], [
            {substr(ethers.ZeroAddress)}, 300] ...
          </S.Example>
        </S.InputTextContainer>

        <S.InputTextContainer>
          <InputText
            label="Address"
            name="Address"
            type="text"
            placeholder="Enter the Address"
            minLength={0}
            maxLength={10000}
            error=""
            value={proposalAddress}
            onChange={event => handleProposalAddressChange(event)}
            required={isOpenAdvancedOptions}
          />
          <S.Example>
            Ex: {substr(ethers.ZeroAddress)}, {substr(ethers.ZeroAddress)} ...
          </S.Example>
        </S.InputTextContainer>
      </S.BodyContainer>
    </S.AdvancedProposalOption>
  )
}

export default AdvancedProposalOption
