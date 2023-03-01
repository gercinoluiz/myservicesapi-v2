import UserRepositoryInMemory from '@modules/users/repositories/fakes/UserRepositoryInMemory'
import { RefreshTokenService } from '../RefreshTokenService'
import { SignUpUserService } from '../../SignUp/SignUpUserService'
import { AuthenticateService } from '../../Authenticate/AuthenticateService'

// Repositories
let userRepository: UserRepositoryInMemory

// Services
let authService: AuthenticateService

let siginUp: SignUpUserService

let refreshTokenService: RefreshTokenService

describe('RefreshToken', () => {
     beforeAll(() => {
          userRepository = new UserRepositoryInMemory()

          authService = new AuthenticateService(userRepository)

          siginUp = new SignUpUserService(userRepository)

          refreshTokenService = new RefreshTokenService(userRepository)
     })

     beforeEach(() => {})

     it('Should give the Authenticated user back according to the refreshToken with a new token', async () => {
          const newUser = {
               password: '123456',
               name: 'Gercino Luiz',
               email: 'gercino@example.com',
               token: 'token',
               refreshToken: 'refreshToken',
          }

          await siginUp.execute(newUser)
          const AuthUser = await authService.execute(newUser)
          

          const newUserToken = await refreshTokenService.execute(
               AuthUser.user?.refreshToken!
          )

          

          
          expect(Object.keys(newUserToken)).toEqual(
               Object.keys({ user: {}, token:''})
          )
     })
})
