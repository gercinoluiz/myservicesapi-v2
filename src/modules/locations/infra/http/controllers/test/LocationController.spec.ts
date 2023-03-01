import 'reflect-metadata'
import { NextFunction, Request, Response } from 'express'
import DBConnection from '@shared/infra/databases/services/DBConnection'
import { app } from '@shared/infra/http/app'
import request from 'supertest'
import { container } from 'tsyringe'
import { responseStatus, statusCode } from '@shared/helpers/status'
import { v4 } from 'uuid'
import { EnsureAuthenticantion } from '@modules/middlewares/EnsureAuthenticantion'

import sinon from 'sinon'
import { nextDay } from 'date-fns'

const dbConnection = container.resolve(DBConnection)


jest.mock('@shared/helpers/status', () => {
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

// jest.mock('@modules/middlewares/EnsureAuthenticantion')




// console.log()




describe('Location Controller', () => {

     beforeAll(async()=>{
          await dbConnection.execute()


     })

     it('Should be able to get a all locations', async (done) => {


          const response = await request(app).get(`/locations`)

          expect(response.status).toBe(statusCode.ok)
          // expect(response.body).toBeInstanceOf(Array)

          done()
     })

     it('Should not be able to create a new location without a token', async () => {
          
          

          const response = await request(app)
               .post(`/locations/`)
               .send({
                    name: `Created Test ${v4()}`,
                    contact_info: {
                         scheduleWebSite:
                              'https://www.prefeitura.sp.gov.br/cidade/secretarias/esportes/clube_escola/index.php?p=44154',
                         website:
                              'https://www.prefeitura.sp.gov.br/cidade/secretarias/esportes/clube_escola/index.php?p=44154',
                         phone: '2231-4705',
                    },
                    address: {
                         street:
                              'Sé, São Paulo - State of São Paulo, 01001-000',
                         number: 3732,
                         city: 'SP',
                         country: 'BR',
                         description: '',
                         cep: '3714-3196',
                    },
                    description: '',
                    imagesUrl: [
                         {
                              url:
                                   'https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
                              descricao: '01',
                         },
                         {
                              url:
                                   'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=680&q=80',
                              descricao: '02',
                         },
                         {
                              url:
                                   'https://images.unsplash.com/photo-1423068657086-889315a2eba8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
                              descricao: '03',
                         },
                    ],
                    workingTime: 'das 08:00 às 17:00 ',
                    services: ['611121aab5cfe05a5462c387'],
               })

          
          expect(response.status).toBe(statusCode.badRequest)
     })
})
