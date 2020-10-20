import moment from 'moment'

export default function useDate () {
  const getStartDateView = (date, firstDay) => {
    firstDay = parseInt(firstDay)
    const start = moment(date)
    const startOfMonth = moment(start.startOf('month'))

    start.subtract(startOfMonth.day(), 'days')

    if (startOfMonth.day() < firstDay) {
      start.subtract(7, 'days')
    }

    start.add(firstDay, 'days')

    return start
  }

  const getEndDateView = () => {
    return getStartDateView().add(6, 'weeks')
  }

  return {
    getStartDateView,
    getEndDateView
  }
}
