
//SEGURA

export interface ICreateUserDTO {
     name?: string
     password?: string
     address?: {}

     email?: string

     contact_info?: {
          mobile?: string
          phone?: string
          facebook?: string
          instagram?: string
          twitter?: string
     }

     avatarUrl?: string
     nickname?: string
     description?: string

     provider?: string
     userId?: string
     role?: string
     refreshToken?:string
     
}

export interface IUserRequest {
     password: string | undefined

     email: string | undefined

     provider?: string
}

export interface IRefreshTokenResponse {
     user?: {
          name: string | undefined
          contact_info?: {
               mobile?: string
               phone?: string
               facebook?: string
               instagram?: string
               twitter?: string
          }
          avatarUrl?: string
          nickname?: string
          description?: string

          provider?: string

          userId?: string
          email?: string
          refreshToken?:string
     }
     token?: string,
}

export interface IAccessTokenResponse {
     user?: {
          name?: string | undefined
          contact_info?: {
               mobile?: string
               phone?: string
               facebook?: string
               instagram?: string
               twitter?: string
          }
          avatarUrl?: string
          nickname?: string
          description?: string

          provider?: string

          userId?: string
          email?: string
          
     }
     token?: string,
}

export interface IUserFormat {
     name: string
     password: string
     address: {}
     contact_info: {
          mobile: string
          phone: string
          facebook?: string
          instagram?: string
          twitter?: string
     }
     email: string

     avatarUrl: string
     nickname: string
     description: string
     role?: string
     userId?:string
}


export interface IRefreshTokenFormat{

     
     
     refreshToken:string;
     issuedAt:Date;
     expiringDate:Date;
     ownerId:string;


}