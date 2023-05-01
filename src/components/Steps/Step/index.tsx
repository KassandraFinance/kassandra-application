import * as S from './styles'

export type StateType = 'CURRENT' | 'PREVIOUS' | 'NEXT'

interface IStepProps {
  stepNumber: number;
  stepTitle: string;
  state: StateType;
}

const Step = ({ stepNumber, stepTitle, state }: IStepProps) => {
  return (
    <>
      <S.Step>
        <S.Position state={state}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="16"
              cy="16"
              r="15.5"
              fill="white"
              fillOpacity="0.05"
              stroke="url(#paint0_linear_7566_65067)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_7566_65067"
                x1="16"
                y1="-12.9428"
                x2="16"
                y2="20.8417"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#E843C4" />
                <stop offset="1" stopColor="#FFBF00" />
              </linearGradient>
            </defs>
          </svg>

          {state !== 'PREVIOUS' ? (
            stepNumber
          ) : (
            <S.TickWrapper>
              <svg
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.40039 5.40078L4.86218 8.65335C5.06553 8.8444 5.38589 8.83206 5.57394 8.62593L11.8004 1.80078"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </S.TickWrapper>
          )}
        </S.Position>

        <S.Text state={state}>{stepTitle}</S.Text>
      </S.Step>

      <S.Line />
    </>
  )
}

export default Step
