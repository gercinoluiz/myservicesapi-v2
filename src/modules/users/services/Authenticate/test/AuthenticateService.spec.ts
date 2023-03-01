import UserRepositoryInMemory from '@modules/users/repositories/fakes/UserRepositoryInMemory'
import { container } from 'tsyringe'
import { SignUpUserService } from '../../SignUp/SignUpUserService'
import { AuthenticateService } from '../AuthenticateService'
import 'reflect-metadata'

let userRepository: UserRepositoryInMemory
let authService: AuthenticateService
let siginUp: SignUpUserService

describe('Sign Up a user ', () => {
     beforeAll(() => {
          userRepository = new UserRepositoryInMemory()

          authService = new AuthenticateService(userRepository)

          siginUp = new SignUpUserService(userRepository)
     })

     beforeEach(() => {})

     it('Should be able to authenticate a user', async () => {
          const newUser = {
               password: '123456',
               name: 'Gercino Luiz',
               email: 'gercino2@example.com',
               provider: 'google',
          }

          await siginUp.execute(newUser)

          const user = await authService.execute(newUser)

          expect(Object.keys(user)).toEqual(
               Object.keys({ user: { refreshToken: '' }, token: '' })
          )
     })
})
