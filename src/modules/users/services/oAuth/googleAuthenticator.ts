import { ICreateUserDTO } from '@modules/users/dtos/userDTO'
import { IUser } from '@modules/users/repositories/IUser'
import axios from 'axios'
import { v4 } from 'uuid'

interface IGoogleResponse {
     id: string
     email: string
     verified_email: true
     name: string
     given_name: string
     family_name: string
     picture: string
     locale: string
}

export async function googleAuthenticator(
     token: string
): Promise<ICreateUserDTO | undefined> {
     try {
          const user = await axios.get<IGoogleResponse>(
               `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`
          )

          const {
               email,
               family_name,
               given_name,
               id,
               locale,
               name,
               picture,
               verified_email,
          } = user.data

          return {
               userId: id,
               name,
               avatarUrl: picture,

               email,

               provider: 'google',
               password: v4(),
          }
     } catch (error) {
          console.log({ error })
     }
}
