import { Provide } from "@midwayjs/decorator";
import { IWebMiddleware, IMidwayWebNext, MidwayWebMiddleware } from "@midwayjs/web";
import { Context } from 'egg'

@Provide()
export class ErrorHandlerMiddleware implements IWebMiddleware {
    resolve(): MidwayWebMiddleware {
        return errorHandlerMiddleware
    }
}

async function errorHandlerMiddleware(ctx: Context, next: IMidwayWebNext): Promise<void> {
    try {
        
        await next()
        if (ctx.status === 404) {
            ctx.body = {code: 404, message: 'Not Found'}
        } else if (ctx.status === 405) {
            ctx.body = {code: 405 , message: "No Author"}
        }

        
    } catch (error) {

    }
}