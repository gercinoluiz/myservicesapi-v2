
import {ISecurity,  TTokenPayload, TTokenType} from '@modules/users/repositories/ISecurity'
import { sign, verify } from 'jsonwebtoken'


export class SecutityRepository implements ISecurity{
    
    verifyToken(token: string, secret: string): TTokenPayload {

        const tokenInfo =  verify(token, secret) as TTokenPayload

        return tokenInfo
    }


    generateToken(tokenType: TTokenType, userId: string, secret: string, expirationTime?: string): string {
        

        
        
            const token =  sign({}, secret, {
                subject:userId,
                expiresIn:expirationTime
            } )
    
            return token
    
        }
    }



