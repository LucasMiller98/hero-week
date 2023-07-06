import { compare, hash } from 'bcrypt';
import { s3 } from "../config/aws";
import { ICreateUsers, IUpdateUser } from "../interfaces/UsersInterface";
import { UsersRepository } from "../repositories/UsersRepository";
import { sign, verify } from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'
import { secretKeyToken } from '../utils/secretKeyToken'

export class UsersService {

  private usersRepository: UsersRepository
  
  constructor() {
    this.usersRepository = new UsersRepository()
  }

  async index() {
    const listUsers = await this.usersRepository.listAllUsers()

    return listUsers
  }
  
  async create({ name, email, password }: ICreateUsers) {

    const findUser = await this.usersRepository.findUserByEmail(email)

    if(findUser) {
      throw new Error('User already exists.')
    }

    const hashPassword = await hash(password, 10)
    
    const create = await this.usersRepository.create({
      name,
      email,
      password: hashPassword
    })
    
    return create
  }

  async update({ name, oldPassword, newPassword, avatar_url, user_id }: IUpdateUser) {

    let password

    if(oldPassword && newPassword) {
      const findUserById = await this.usersRepository.findUserById(user_id)

      if(!findUserById) {
        throw new Error('User not found.')
      }
      
      const passwordMath = compare(oldPassword, findUserById.password)
      
      if(!passwordMath) {
        throw new Error('Password invalid.')
      }

      password = await hash(newPassword, 10)
      await this.usersRepository.updatePassword(password, user_id)
      
    }

    if(avatar_url) {
      const uploadImage = avatar_url?.buffer
      const uploadS3 = await s3.upload({
        Bucket: 'hero-week-reacjs-nodejs',
        Key: `${uuid()}-${avatar_url?.originalname}`,
        // ACL: 'public-read',
        Body: uploadImage
      }).promise()

      await this.usersRepository.update(name, uploadS3.Location, user_id)
    }

    return {
      message: 'User updated successfully'
    }
  }

  async auth(email: string, password: string) {
    const findUser = await this.usersRepository.findUserByEmail(email)

    if(!findUser) {
      throw new Error('User or password invalid.')
    }

    const passwordMath = await compare(password, findUser.password)
    
    if(!passwordMath) {
      throw new Error('User or password invalid.')
    }
    
    const secretKey = secretKeyToken()
    
    const token = sign({email}, secretKey, {
      expiresIn: 60 * 15,
      subject: findUser.id
    })

    const refreshToken = sign({email}, secretKey, {
      subject: findUser.id,
      expiresIn: '7d'
    })
    
    return {
      token,
      refresh_token: refreshToken,
      user: {
        name: findUser.name,
        email: findUser.email,
        avatar_url: findUser.avatar_url
      }
    }
  }

  async refreshToken(refresh_token: string) {
    if (!refresh_token) {
      throw new Error('Refresh token missing');
    }
    let secretKeyRefresh: string | undefined =
      process.env.ACCESS_TOKEN_SECRET_KEY_REFRESH;
    if (!secretKeyRefresh) {
      throw new Error('There is no refresh token key');
    }

    let secretKey: string | undefined = process.env.ACCESS_KEY_TOKEN;
    if (!secretKey) {
      throw new Error('There is no refresh token key');
    }
    const verifyRefreshToken = verify(refresh_token, secretKeyRefresh);

    const { sub } = verifyRefreshToken;

    const newToken = sign({ sub }, secretKey, {
      expiresIn: '1h',
    });
    const refreshToken = sign({ sub }, secretKeyRefresh, {
      expiresIn: '7d',
    });
    return { token: newToken, refresh_token: refreshToken };
  }

}