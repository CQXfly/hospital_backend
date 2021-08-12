import { Application } from 'egg'
import { NpmPkg } from '@waiting/shared-types'
import { COSSTS } from './interface'

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
        
        
        this.app.cossts = new COSSTS(this.app.config.cossts)
        // cos
    }
}