import 'reflect-metadata'

import dependencies from '@shared/container/dependencies'
import { AppError } from '@shared/errors/AppError'
import messages from '@shared/helpers/messages'
import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'
import { v4 } from 'uuid'
import { ICreateUserDTO } from '../../dtos/userDTO'
import { IUser } from '../../repositories/IUser'
import { responseStatus, statusCode } from '@shared/helpers/status'

@injectable()
export class SignUpUserService {
     constructor(
          @inject(dependencies.userRepository)
          private userRepositoty: IUser
     ) {}

     public async execute({
          name,
          password,
          address,
          avatarUrl,
          contact_info,
          description,
          nickname,
          provider,
          email,
          refreshToken,
     }: ICreateUserDTO) {


          if (!email) {
               throw new AppError(
                    'Email necessário',
                    statusCode.badRequest,
                    responseStatus.fail
               )
          }

        

          if (!name) {
               throw new AppError(
                    'Nome necessário',
                    statusCode.badRequest,
                    responseStatus.fail
               )
          }

          if (!password) {
               throw new AppError(
                    'Senha necessária',
                    statusCode.badRequest,
                    responseStatus.fail
               )
          }

          // Check if userExists

          const userExists = await this.userRepositoty.findByEmail(email)

        

          if (userExists) {
               throw new AppError(
                    'usuário já existente',
                    statusCode.badRequest,
                    responseStatus.fail
               )
          }

          // hash the password

          const hashedPassword = await hash(password, 8)

          const generatedId = v4()

          const user = await this.userRepositoty.createUser({
               name,
               password: hashedPassword,
               address,
               avatarUrl,
               contact_info,
               description,
               nickname,
               provider,
               userId: generatedId,
               email,
               refreshToken,
          })

         

          return {
               email: user.email,
               password: user.password,
          }
     }
}
