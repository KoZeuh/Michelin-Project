import { ApplicationService } from '@adonisjs/core/types'

export default class DatabaseProvider {
    constructor(protected app: ApplicationService) {}

    register() {
        // Register bindings
    }

    async boot() {
        // Nothing to do during boot
    }

    async ready() {
        // Ready phase - migrations run here automatically
    }

    async shutdown() {
        // Cleanup
    }
}
