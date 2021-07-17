import { Jwt, JwtEggConfig } from '@waiting/egg-jwt'
import { NpmPkg } from '@waiting/shared-types'
import { EggAppConfig, PowerPartial } from 'egg'

export type DefaultConfig = PowerPartial<EggAppConfig>;

export interface JwtAuthMiddlewareConfig {
    accessTokenExpiresIn: number;
    ignore: JwtEggConfig['ignore'];
    redisScope: string;
}

declare module 'egg' {
    interface Application {
        jwt: Jwt
    }

    interface EggAppConfig {
        coreMiddleware: string[]
        jwt: JwtEggConfig
        jwtAuth: JwtAuthMiddlewareConfig
        pkhJson: NpmPkg
    }
}