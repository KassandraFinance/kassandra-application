import Step, { StateType } from './Step'

import * as S from './styles'

export type StepsType = {
  stepNumber: number
  stepeTitle: string
  state: StateType
}

interface IStepsProps {
  steps: StepsType[]
}

const Steps = ({ steps }: IStepsProps) => {
  return (
    <S.Steps>
      {steps.map(step => (
        <Step
          key={step.stepNumber}
          stepNumber={step.stepNumber}
          stepTitle={step.stepeTitle}
          state={step.state}
        />
      ))}
    </S.Steps>
  )
}

export default Steps
