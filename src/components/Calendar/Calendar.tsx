import { FC, useEffect, useState } from 'react'
import { CalendarElement, CalendarWrapper } from '@/components/Calendar/Calendar.styles'

interface initialSettings {
  currentMonth: string
  priorDays: number
  priorLastDayNumber: number
  currentDays: number
  currentMonthNumber: number
}

enum actions {
  NEXT,
  PREV,
}

const Calendar: FC = () => {
  const weekDays: string[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const [priorMonthCalendarDays, setPriorMonthCalendarDays] = useState<string[]>([])
  const [currentMonthCalendarDays, setCurrentMonthCalendarDays] = useState<string[]>([])
  const [nextMonthCalendarDays, setNextMonthCalendarDays] = useState<string[]>([])

  const [currentSettings, setCurrentSettings] = useState<initialSettings>({
    currentMonth: '',
    priorDays: 0,
    priorLastDayNumber: 0,
    currentDays: 0,
    currentMonthNumber: 0,
  })

  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const changeMonth = (action: actions) => {
    switch (action) {
      case actions.NEXT:
        if (selectedMonth + 1 > 11) {
          setSelectedMonth(0)
          setSelectedYear((prev) => prev + 1)
        } else {
          setSelectedMonth((prev) => prev + 1)
        }

        break
      case actions.PREV:
        if (selectedMonth - 1 < 0) {
          setSelectedMonth(11)
          setSelectedYear((prev) => prev - 1)
        } else {
          setSelectedMonth((prev) => prev - 1)
        }

        break
    }
  }

  const getData = (month: number, year: number) => {
    const tday = new Date()
    const currentMonth = months[month]
    const lastOfPrior = new Date(year, month, 0)
    const priorDays = lastOfPrior.getDate()
    const priorLastDayNumber = lastOfPrior.getDay()

    const lastOfCurrent = new Date(year, month + 1, 0)
    const currentDays = lastOfCurrent.getDate()
    const currentMonthNumber = tday.getMonth()

    setCurrentSettings({
      currentMonth: currentMonth,
      priorDays: priorDays,
      priorLastDayNumber: priorLastDayNumber,
      currentDays: currentDays,
      currentMonthNumber: currentMonthNumber,
    })
  }

  useEffect(() => {
    getData(selectedMonth, selectedYear)
  }, [selectedMonth])

  useEffect(() => {
    let _priorLastDay = currentSettings.priorDays
    let tempPriorCalendar: string[] = []
    let tempCurrentCalendar: string[] = []
    let tempNextCalendar: string[] = []

    for (let i = currentSettings.priorLastDayNumber - 1; i >= 0; i--) {
      tempPriorCalendar.push((_priorLastDay - i).toString())
    }

    setPriorMonthCalendarDays(tempPriorCalendar)

    for (let i = 1; i <= currentSettings.currentDays; i++) {
      tempCurrentCalendar.push(i.toString())
    }

    setCurrentMonthCalendarDays(tempCurrentCalendar)

    if (tempPriorCalendar.length + tempCurrentCalendar.length > 0) {
      const nextDayCount = 43 - (tempPriorCalendar.length + tempCurrentCalendar.length)

      for (let i = 1; i < nextDayCount; i++) {
        tempNextCalendar.push(i.toString())
      }

      if (tempNextCalendar.length > 7) tempNextCalendar = tempNextCalendar.slice(0, 6)

      setNextMonthCalendarDays(tempNextCalendar)
    }
  }, [currentSettings])

  return (
    <CalendarWrapper>
      <div className='top'>
        <span onClick={() => changeMonth(actions.PREV)}>&lt;</span>
        <span className='month'>
          {currentSettings.currentMonth} {selectedYear}
        </span>
        <span onClick={() => changeMonth(actions.NEXT)}>&gt;</span>
      </div>
      <div className='middle'>
        {weekDays.map((wd, idx) => (
          <CalendarElement className='wd' key={idx}>
            {wd}
          </CalendarElement>
        ))}
        {priorMonthCalendarDays.length > 0 &&
          priorMonthCalendarDays.map((pmd, idx) => (
            <CalendarElement className='prior' key={idx}>
              {pmd}
            </CalendarElement>
          ))}
        {currentMonthCalendarDays.length > 0 &&
          currentMonthCalendarDays.map((cmd, idx) => (
            <CalendarElement className='current' key={idx + currentSettings.priorLastDayNumber}>
              {cmd}
            </CalendarElement>
          ))}
        {nextMonthCalendarDays.length > 0 &&
          nextMonthCalendarDays.map((nmd, idx) => (
            <CalendarElement
              className='next'
              key={idx + Number(currentMonthCalendarDays[currentMonthCalendarDays.length - 1])}>
              {nmd}
            </CalendarElement>
          ))}
      </div>
    </CalendarWrapper>
  )
}

export default Calendar
