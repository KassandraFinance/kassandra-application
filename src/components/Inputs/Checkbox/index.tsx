import * as S from './styles'

interface ICheckboxProps {
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ name, checked, onChange }: ICheckboxProps) => {
  return (
    <S.Checkbox>
      <S.Input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
      />

      <S.Checkmark />
    </S.Checkbox>
  )
}

export default Checkbox
