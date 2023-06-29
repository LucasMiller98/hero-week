import style from './styles/style.module.css'
import { IButtonProps } from "./types/types";

export function Button(props: IButtonProps) {
  return (
    <button 
      type={ props.type }
      className={style.button}
    >
      { props.children }
    </button>
  )
}