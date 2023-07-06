import style from './styles/styles.module.css'
import { IModalEditProps } from './types/types'
import { AiOutlineClose } from 'react-icons/ai'

export function ModalEdit({ isModalOpen, handleChangeModal }: IModalEditProps) {

  const currentValue = new Date().toISOString().split('T')[0]

  if(isModalOpen) {
    return (
      <div className={style.container_modal_edit}>
        <div className={style.modal}>
          <header className={style.header}>
            <h2>Editar horário</h2>
            <AiOutlineClose onClick={handleChangeModal} size={25} />
          </header>
          <form className={style.modal_body}>
            <p>
              10h Lucas
            </p>
            <div className={style.input_container}>
              <label htmlFor="">Indique uma nova data</label>
              <input type="date" defaultValue={currentValue} />
            </div>
            <div className={style.input_container}>
              <label htmlFor="">Indique um novo horário</label>
              <select>
                <option value="">14:00</option>
                <option value="">14:00</option>
                <option value="">14:00</option>
                <option value="">14:00</option>
                <option value="">14:00</option>
                <option value="">14:00</option>
              </select>
            </div>
          </form>

          <footer className={style.footer}>
            <button onClick={handleChangeModal}>Cancelar</button>
            <button>Editar</button>
          </footer>
        </div>
      </div>
    )
  }

  return <></>
  
}