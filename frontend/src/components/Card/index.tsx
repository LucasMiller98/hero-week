import { AiOutlineEdit } from 'react-icons/ai'
import style from './styles/styles.module.css'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useState } from 'react'
import { ModalEdit } from '../ModalEdit'
// import { isAfter } from 'date-fns'
// import { getHours } from 'date-fns'
// import { ISchedule } from '../../pages/Dashboard/types/types'

export function Card() {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  // const dateFormatted = new Date(date)
  
  // const { name, date, id, phone } = props

  // const isAfterDate = isAfter(new Date(date), new Date())

  // let phoneFormated = phone.replace(/\D/g, '')
  // phoneFormated = phoneFormated.replace(
  //   /^\(\d{2}\) \d{5}-\d{4}$/,
  //   '($1) $2-$3'
  // )

  const handleChangeModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  
  return (
    <>
      <div className={style.container_card}>
        <div className={style.container_hours}>
          {/* { getHours(new Date(date)) } */}
          <span>10h</span>
          <p>Lucas Miller - (81)9 9999-9999</p>
        </div>
        <div className={style.icons}>
          <AiOutlineEdit 
            size={25} 
            color='#5f68b1' 
            onClick={() => 
            handleChangeModal} 
          />
          <RiDeleteBinLine size={25} color='#eb3f3c' />
        </div>
      </div>
      <ModalEdit 
        isModalOpen={isModalOpen} 
        handleChangeModal={handleChangeModal}
      />
    </>
  )
}