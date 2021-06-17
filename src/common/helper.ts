
export interface IResponse {
    status: number
    message: string
    data: object | null
}

export function response(result: object, message = 'request success', status = 200) : IResponse {
    return {data: result, message, status}
}

export function responseError(result: object, message) : IResponse {
    return {data: result, message, status: 400}
}

export function responseServerError(result: object,) : IResponse {
    return {data: result, message: 'server error', status: 500}
}