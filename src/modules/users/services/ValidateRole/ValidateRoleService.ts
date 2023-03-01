import {
    IAccessTokenResponse, IUserFormat
} from '@modules/users/dtos/userDTO'
import { IUser } from '@modules/users/repositories/IUser'
import dependencies from '@shared/container/dependencies'
import { AppError } from '@shared/errors/AppError'
import { responseStatus, statusCode } from '@shared/helpers/status'
import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'


//TODO: DEVERIA SER UM FINDONE NOT ONE VALIDATE ROLE
@injectable()
export class ValidateRoleService {
     constructor(
          @inject(dependencies.userRepository)
          private userRepository: IUser
     ) {}

     async execute(id: string): Promise<IUserFormat> {
          try {

            

            const user = await this.userRepository.findById(id)

            

            if (!user) throw new AppError('Usuário não encontrado', statusCode.badRequest, responseStatus.fail) 

            return user

          } catch (error) {
               throw new AppError(
                    'Falha ao buscar o usuário',
                    statusCode.badRequest,
                    responseStatus.fail
               )
          }
     }
}
