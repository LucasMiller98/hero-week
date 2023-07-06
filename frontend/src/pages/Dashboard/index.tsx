import { useState } from 'react'
import { Card } from '../../components/Card'
import { Header } from '../../components/header'
import { useAuthContext } from '../../context/hooks/useAuthContext'
import style from './styles/styles.module.css'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { ptBR } from 'date-fns/locale'
import { format, isToday } from 'date-fns'
// import { api } from '../../services/api'
// import { toast } from 'react-toastify'
// import { ISchedule } from './types/types'

export function Dashboard() {

  // const [schedules, setSchedules] = useState<Array<ISchedule>>([])

  const isWeekend = (date: Date): boolean => {
    const day = date.getDay()

    return day === 0 || day === 6
  }

  const isWeekday = (date: Date): boolean => {
    const day = date.getDay()

    return day !== 0 && day === 6
  }

  const [date, setDate] = useState(new Date())
  
  const { user } = useAuthContext()
  const cards = []

  for(let counter = 0; counter < 7; counter ++) {
    cards.push(<Card key={counter} />)
  }

  const handleDataChange = (date: Date) => {
    setDate(date)
  }

  // useEffect(() => {
  //   const getAllSchedules = async () => {
  //     try {
  //       const { data } = await api.get('/schedules/every', {
  //         params: {
  //           date
  //         }
  //       })

  //       // setSchedules(data)
  //     } catch (error) {
  //       if(error instanceof Error) {
  //         toast.error(error.message)
  //       }
  //     }

  //   }

  //   getAllSchedules()
  // }, [date])

  return (
    <div className={`container ${style.container_dashboard}`}>
      <Header />
      <div className={style.data_title}>
        <h2>Bem vindo, { user.name }!</h2>
        <p>Está é a sua lista de horários { isToday(date) ? <span>de hoje, </span> : null} dia { format(date, 'dd/MM/yyyy') }</p>
      </div>
      <h2 className={style.next_hours}>Próximos Horarios</h2>
      <div className={style.schedule}>
        <div className={style.card_wrapper}>
         { cards }
         {/* { schedules.map((schedule) => {
          return (
            <Card 
              key={schedule.id} 
              date={schedule.date}
              name={schedule.name}
              id={schedule.id}
            />
          )
         }) } */}
        </div>
        <div className={style.piker}>

          <DayPicker 
            className={style.calendar}
            selected={date}
            mode='single'
            classNames={{
              day: style.day
            }}
            disabled={isWeekend}
            modifiers={{
              available: isWeekday
            }}
            modifiersClassNames={{
              selected: style.selected
            }}
            onDayClick={handleDataChange}
            locale={ptBR}
            fromMonth={new Date()}
          />         
        </div>
      </div>
    </div>
  )
}