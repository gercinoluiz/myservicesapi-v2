
import "reflect-metadata"

import { AuthenticateService } from '@modules/users/services/Authenticate/AuthenticateService'
import { SignUpUserService } from '../SignUpUserService'

import UserRepositoryInMemory from '@modules/users/repositories/fakes/UserRepositoryInMemory'




let siginUp: SignUpUserService
let userRepository: UserRepositoryInMemory
let authService : AuthenticateService

describe('Sign Up a user ', () => {
     beforeAll(() => {
          userRepository = new UserRepositoryInMemory()
          siginUp = new SignUpUserService(userRepository)
          authService = new AuthenticateService(userRepository)
     })

     beforeEach(()=>{
       

          
     })

     it('Should be able to sign up a user', async () => {
          const newUser = {
               name: 'Gercino Luiz',

               password: '123456',

               email: 'gercino@example.com',
          }

          const loggedInUser = await siginUp.execute(newUser)

          

           const user = await authService.execute(loggedInUser)

           
          expect(user).toHaveProperty('token')
     })



     it('Shoud not be able to create an existing user', async () => {
          try {
               const user = {
                    name: 'Gercino Luiz',

                    password: '123456',

                    email: 'gercino@example.com',
               }

               const loggedUser = await siginUp.execute(user)

               expect(loggedUser).toMatchObject({
                    email: 'gercino@example.com',
               })
          } catch (error) {
               expect(error).toMatchObject({
                    message: 'usuário já existente',
               })
          }
     })

     it('Shoud not be able to create an user without an email', async () => {
          try {
               const user = {
                    name: 'Gercino Luiz',

                    password: '123456',
               }

               const loggedUser = await siginUp.execute(user)

               expect(loggedUser).toMatchObject({
                    email: 'gercino@example.com',
               })
          } catch (error) {
               expect(error).toMatchObject({
                    message: 'Email necessário',
               })
          }
     })

     it('Shoud not be able to create an user without a name', async () => {
          try {
               const user = {
                    password: '123456',

                    email: 'gercino@example.com',
               }

               const loggedUser = await siginUp.execute(user)

               expect(loggedUser).toMatchObject({
                    email: 'gercino@example.com',
               })
          } catch (error) {
               expect(error).toMatchObject({
                    message: 'Nome necessário',
               })
          }
     })

     it('Shoud not be able to create an user without a password', async () => {
          try {
               const user = {
                    name: 'Gercino Luiz',

                    email: 'gercino@example.com',
               }

               const loggedUser = await siginUp.execute(user)

               expect(loggedUser).toMatchObject({
                    email: 'gercino@example.com',
               })
          } catch (error) {
               expect(error).toMatchObject({
                    message: 'Senha necessária',
               })
          }
     })
})
