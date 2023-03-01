import { IAccessTokenResponse, ICreateUserDTO, IUserFormat } from '../dtos/userDTO'
import { IRefreshTokenResponse,  } from '../dtos/userDTO'



export interface IUser {
     createUser({
          name,
          password,
          address,
          avatarUrl,
          contact_info,
          description,
          nickname,
          provider,
          email
     }: ICreateUserDTO): Promise<ICreateUserDTO>

     deleteUser(): Promise<void>;

     updateUser(): Promise<void>;

     findByEmail(email: string): Promise<ICreateUserDTO>;

     findById(id: string): Promise<IUserFormat>;

     findAllUsers(): Promise<void>;

     deleteToken(userId:string, token:string):Promise<void>;

     findbyIdAndToken (userId:string, token:string): Promise<any>;

     updateRefreshToken(userId:string, refreshToken:string): Promise<IRefreshTokenResponse>;
}
