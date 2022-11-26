interface IDateProps {
  value: number;
  string: string;
}

const useDate = () => {
  function date(date: IDateProps | undefined) {
    if (!date) return

    if (date.string === 'year' || date.string === 'years') {
      return date.value > 0 ? 'years' : 'year'
    } else if (date.string === 'month' || date.string === 'months') {
      return date.value > 0 ? 'months' : 'month'
    } else if (date.string === 'day' || date.string === 'days') {
      return date.value > 0 ? 'days' : 'day'
    } else if (date.string === 'hour' || date.string === 'hours') {
      return date.value > 0 ? 'hours' : 'hour'
    } else if (date.string === 'min') {
      return 'min'
    }
  }

  return {
    date
  }
}

export default useDate
