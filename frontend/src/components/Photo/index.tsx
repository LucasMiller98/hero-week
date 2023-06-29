import { useEffect, useState } from "react"
import { github } from "../../services/github/api"
import style from './styles/style.module.css'
import { IAvatar, IIsRegister } from "./types/types"
import { TailSpin } from 'react-loader-spinner'

export function Photo(props: IIsRegister) {

  const [avatar_url, setAvatar_url] = useState<string>('')

  useEffect(() => {
    const getAvatar = async () => {
      const { data } = await github.get<IAvatar>('/users/LucasMiller98')

      setAvatar_url(data.avatar_url)
    }

    getAvatar()
  }, [])
  
  return (
    <figure className={style.figure_container}>
      { avatar_url ? (
        <img 
          className={`
          ${props.isRegisterPage ? 
            style.isRegisterPage : 
            `${style.img}`}`
          } 
          src={avatar_url} 
          alt="Meu avatar" 
        />

      ) : (
        <TailSpin 
          ariaLabel="tail-spin-loading"
          radius='1'
          color="#97909050"
          height='80'
          width='80'
          wrapperStyle={{}}
          wrapperClass=''
          visible
        />
      ) }
    </figure>
  )
}