
export type TTokenType = 'acessToken' | 'refreshToken'

export type TTokenPayload ={
    iat: number
    exp: number
    sub: string
}

export interface ISecurity{

    generateToken (tokenType:TTokenType ,userId:string, secret:string, expirationTime?:string ):string

    verifyToken (token:string, secret:string): TTokenPayload

}