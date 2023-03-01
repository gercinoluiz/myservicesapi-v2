import 'reflect-metadata'
import DBConnection from '@shared/infra/databases/services/DBConnection'
import { app } from '@shared/infra/http/app'
import request from 'supertest'
import { container } from 'tsyringe'
import { v4 } from 'uuid'
import { statusCode } from '@shared/helpers/status'

const dbConnection = container.resolve(DBConnection)

jest.mock('@shared/ultils/status', () => {
     mockReturnValue: {
          return {
               statusCode: {
                    badRequest: 400,
                    notFound: 404,
                    forbidden: 403,

                    ok: 200,
                    created: 201,
                    noContent: 204,

                    internalServerError: 500,
               },

               responseStatus: {
                    success: 'success',
                    fail: 'fail',
                    notallowed: 'not allowed',
                    accessDenied: 'access denied',
               },
          }
     }
})

describe('User Controller', () => {
     beforeAll(() => {
          dbConnection.execute()
     })

     it('Should be able to signup a new user', async () => {
          const response = await request(app)
               .post(`/users/signup`)
               .send({
                    name: `Gercino Luiz ${v4()}`,

                    password: '123456',

                    email: `${v4()}@example.com`,
               })

          expect(response.status).toBe(statusCode.created)
     })

     it('Should check the format of userResponse', async () => {
          const response = await request(app)
               .post(`/users/signup`)
               .send({
                    name: `Gercino Luiz ${v4()}`,

                    password: '123456',

                    email: `${v4()}@example.com`,
               })

          expect(Object.keys(response.body)).toEqual(
               Object.keys({
                    status: '',
                    data: {
                         user: {
                              name: '',
                              contact_info: {},
                              email: '',
                              refreshToken: '',
                         },
                         token: '',
                    },
               })
          )
     })

     it('Should not be able to create an existing User', async () => {
          await request(app).post(`/users/signup`).send({
               name: `Gercino Luiz`,

               password: '123456',

               email: `gercino@example.com`,
          })

          const response = await request(app).post(`/users/signup`).send({
               name: `Gercino Luiz`,

               password: '123456',

               email: `gercino@example.com`,
          })

          expect(response.status).toBe(statusCode.badRequest)
     })

     it('Should able to send a new Token acording to the refreshToken', async () => {
          const responseUser = await request(app)
               .post(`/users/signup`)
               .send({
                    name: `Gercino Luiz ${v4()}`,

                    password: '123456',

                    email: `${v4()}@example.com`,
               })

          const response = await request(app)
               .post(`/users/refresh`)
               .set(
                    'Authorization',
                    `Bearer ${responseUser.body.data.user.refreshToken}`
               )

          expect(response.status).toBe(statusCode.ok)
     })

     it('Should check if the response for a new token follows the interface pattern', async () => {
          const responseUser = await request(app)
               .post(`/users/signup`)
               .send({
                    name: `Gercino Luiz ${v4()}`,

                    password: '123456',

                    email: `${v4()}@example.com`,

                    avatarUrl: '',

                    contact_info: {},
                    nickname: '',

                    userId: '',
                    description: '',
               })

          const response = await request(app)
               .post(`/users/refresh`)
               .set(
                    'Authorization',
                    `Bearer ${responseUser.body.data.user.refreshToken}`
               )

          function checkDataType() {
               return (
                    JSON.stringify(Object.keys(response.body.data)) ===
                    JSON.stringify(Object.keys({ user: '', token: '' }))
               )
          }

          function checkUserType() {

               console.log(Object.keys(response.body.data.user))
               return (
                    JSON.stringify(Object.keys(response.body.data.user)) ===
                    JSON.stringify(
                         Object.keys({
                              name: '',
                              avatarUrl: '',
                              email: '',
                              contact_info: '',
                              nickname: '',

                              userId: '',
                              description: '',
                              
                         })
                    )
               )
          }
          
          

          expect(checkDataType() && checkUserType()).toBeTruthy()
     })
})
