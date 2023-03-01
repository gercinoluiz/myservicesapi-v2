import "reflect-metadata";
import { SecutityRepository } from "@modules/users/infra/providers/jwt-bcrypt/repositories/SecutityRepository";
import {
    TTokenType,
    TTokenPayload,
} from "@modules/users/repositories/ISecurity";
import { AppError } from "@shared/errors/AppError";
import enviroment from "@shared/helpers/enviroment";
import { responseStatus, statusCode } from "@shared/helpers/status";

export function generateToken(userId: string, tokenType: TTokenType): string {
    const securityRepository = new SecutityRepository();

    let secret;
    let expirationTime;

    if (tokenType === "refreshToken") {
        secret = enviroment().REFRESH_TOKEN_SECRET;
        expirationTime = enviroment().JWT_REFRESH_TOKEN_LIFETIME;
    } else if (tokenType === "acessToken") {
        secret = enviroment().SECRET;
        expirationTime = enviroment().JWT_LIFETIME;
    } else {
        throw new AppError(
            "Invalid token type",
            statusCode.badRequest,
            responseStatus.fail
        );
    }

    if (!secret) {
        throw new AppError(
            "Fail to generate token",
            statusCode.badRequest,
            responseStatus.fail
        );
    }

    if (!expirationTime) {
        throw new AppError(
            "Fail to generate token",
            statusCode.badRequest,
            responseStatus.fail
        );
    }

    const token = securityRepository.generateToken(
        tokenType,
        userId,
        secret,
        expirationTime
    );

    return token;
}

export function verifyToken(token: string, secret: string): TTokenPayload {
    const securityRepository = new SecutityRepository();

    if (!token || !secret) {
        throw new AppError(
            "Token Inválido",
            statusCode.badRequest,
            responseStatus.fail
        );
    }

    const tokenInfo = securityRepository.verifyToken(token, secret);

    return tokenInfo;
}
