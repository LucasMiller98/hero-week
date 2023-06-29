import { BsArrowLeftShort } from 'react-icons/bs'
import style from './styles/styles.module.css'
import img404 from '../../assets/Ilustration.svg'
import { useNavigate } from 'react-router-dom'

export function Page404() {

  const navigate = useNavigate()

  const handleBack = (): void => {
    navigate('/')
  }
  
  return (
    <div className={style.container}>
      <div>
        <h1>Oops....</h1>
        <h2>Page not found</h2>
        
        <p className={style.paragraph_404}>
          This page does't exist or was removed!
          We suggest you back to home.
        </p>
        <button 
          type='button' 
          className={style.button_404}
          onClick={handleBack}
        >
          <BsArrowLeftShort size={27} />
          Back to home.
        </button>
      </div>

      <figure>
        <img src={img404} alt="Image 404" />
      </figure>
    </div>
  )
}