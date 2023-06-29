import style from './styles/style.module.css'
import { IInputProps } from './types/types'
import { ForwardRefRenderFunction, forwardRef } from 'react'

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  { placeholder, type, error, icon, ...rest },
  ref,
) => {
  return (
    <div className={style.container}>
      <label htmlFor="">
        <i aria-hidden="true">{icon}</i>
        <input type={type} placeholder={placeholder} ref={ref} {...rest} />
      </label>
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
};

export const Input = forwardRef(InputBase);