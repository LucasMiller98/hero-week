import style from './styles/styles.module.css'
import logo from '../../assets/logo_branca.png'
import { CgProfile } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthContext } from '../../context/hooks/useAuthContext'

export function Header() {

  const [isOpen, setIsOpen] = useState(false)  

  const { signOut } = useAuthContext()

  const navigate = useNavigate()
  
  return (
    <header className={style.header_container}>
      <figure className={style.image_figure} onClick={() => navigate('/dashboard')}>
        <img src={logo} alt="Logo" />
        <figcaption>Infotech Plus Solutions</figcaption>
      </figure>

      <div className={style.profile} onClick={() => setIsOpen(!isOpen)}>
        <div className={style.dropdown}>
          <CgProfile size={25.7} />
          <span>Perfil</span>
          <ul 
            className={`
            ${style.dropdown_menu} 
            ${isOpen ? style.isOpen : null}`}
          >
            <li className={style.dropdown_menu_item}>Agendamentos</li>
            <li className={style.dropdown_menu_item}>Editar Perfil</li>
            <li className={style.dropdown_menu_item} onClick={signOut}>Sair</li>
          </ul>
        </div>
      </div>
    </header>
  )
}
