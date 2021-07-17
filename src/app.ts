import { Application } from 'egg'
import { NpmPkg } from '@waiting/shared-types'

export default class AppBootHook {
    app: Application

    constructor(app: Application) {
        this.app = app
    }

    configWillLoad(): void {
        console.log("🚀 ---- your app is launch")
    }
    
    configDidLoad(): void {
        this.app.config.pkhJson = { ...this.app.config.pkg } as NpmPkg

        this.app.config.coreMiddleware.unshift('errorHandlerMiddleware')
    }
}