import style from './styles/style.module.css'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/Input'
import { toast } from 'react-toastify'
import { BsKey, BsPerson } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'
import { Button } from '../../components/Button'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ICreateUsers, IFormRegister } from './types/types'
import { api } from '../../services/api'
import { Photo } from '../../components/Photo'

export function Register() {

  const navigate = useNavigate()
  
  const schema = yup.object().shape({
    name: yup.string().required('Informe o seu nome!'),
    email: yup.string().email('Digite um e-mail válido!').required('Informe um e-mail!'),
    password: yup.string().required('Informe uma senha!')
  })

  const { 
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormRegister>({
    resolver: yupResolver(schema)
  })

  const onHandleSubmit = handleSubmit(async (data) => {

    try {
      
      const { data: data_api } = await api.post<ICreateUsers>('/users/create', data)

      if(!data_api.email) {
        throw new Error(errors.email?.message)
      }

      if(!data_api.name) {
        throw new Error(errors.name?.message)
      }

      if(!data_api.password) {
        throw new Error(errors.password?.message)
      }

      return toast.success('Usuário cadastrado com sucesso!')
      
    } catch (error) {

      if(error instanceof Error) {
        toast.error(error.message)
      }
    }
  })
  
  return (
    <div className={style.container_background}>
      <header>
        <ul>
          <li>
            <Link to='/'>
              Home <MdKeyboardArrowRight size={20} />
            </Link>
          </li>
          <li>
            Área de cadastro
          </li>
        </ul>
      </header>

      <div className={style.container_register}>
        <Photo 
          isRegisterPage
        />
        <div className={style.register_area_form}>
          <h1>Área de Cadastro</h1>
          <form onSubmit={onHandleSubmit}>
            <Input 
              placeholder='Insira seu nome'
              type='text'              
              icon={<BsPerson size={20} />}
              { ...register('name', { required: true }) }
              error={ errors.name && errors.name.message }
            />

            <Input 
              placeholder='Insira seu email'
              type='text'              
              icon={<AiOutlineMail size={20} />}
              { ...register('email', { required: true }) }
              error={ errors.email && errors.email.message }
            />
            
            <Input 
              placeholder='Criar uma senha'
              type='password'              
              icon={<BsKey size={20} />}
              { ...register('password', { required: true }) }
              error={ errors.password && errors.password.message }
            />

            <Button type='submit'>
              Cadastrar
            </Button>

            <p className={style.question_paragraph}>
              Já se cadastrou? 
              <Link to='/'>Voltar à página inicial</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}