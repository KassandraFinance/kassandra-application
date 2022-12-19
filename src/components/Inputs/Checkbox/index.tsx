import * as S from './styles'

interface ICheckboxProps {
  name: string;
  checked: boolean;
  label: string;
  showLabel?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  name,
  checked,
  label,
  showLabel = true,
  onChange
}: ICheckboxProps) => {
  return (
    <S.Checkbox>
      <S.InputWrapper>
        <S.Input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
        />

        <S.Checkmark />
      </S.InputWrapper>

      {showLabel && <S.Label htmlFor={name}>{label}</S.Label>}
    </S.Checkbox>
  )
}

export default Checkbox
