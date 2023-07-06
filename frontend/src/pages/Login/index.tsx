import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { AiOutlineMail } from 'react-icons/ai'
import { BsKey } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Photo } from '../../components/Photo'
import { useAuthContext } from '../../context/hooks/useAuthContext'
import style from './styles/style.module.css'
import { IFormValues } from './types/types'

export function Login() {

  const { signIn } = useAuthContext()

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Digite um email válido')
      .required('Campo de email obrigatório'),
    password: yup.string().required('Campo de senha obrigatório'),
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const onHandleSubmit = handleSubmit(({ email, password }: IFormValues) => {
    try {
      signIn({ email, password })
    } catch (error) {
      if(error instanceof Error) {
        console.error(error.message)
      }
    }
  })
  
  return (
    <div className={style.background}>
      <div className={`container ${style.container}`}>
        <div className={style.wrapper}>
          <Photo />
          <div className={style.card}>
            <h2>Olá, seja bem vindo</h2>
            <form className={style.form_login} onSubmit={onHandleSubmit}>
              <Input 
                placeholder='Email'
                type='text'
                { ...register('email', { required: true }) }
                error={ errors.email && errors.email.message }
                icon={<AiOutlineMail size={20} />}
              />
              <Input 
                placeholder='Senha'
                type='password'
                { ...register('password', { required: true }) }
                error={ errors.password && errors.password.message }
                icon={<BsKey size={20} />}
              />
              <Button type='submit'>Entrar</Button>

              <p>
                Esqueceu sua senha? <Link to='/error'>Recuperar</Link>
              </p>
              <p>
                Ainda não tem conta? <Link to='/register'>Cadastre-se</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}