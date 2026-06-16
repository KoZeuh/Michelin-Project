import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
    async run() {
        const superAdmin = await User.query().where('email', 'admin@schoolhub.io').first()

        if (superAdmin) {
            superAdmin.firstName = 'Super'
            superAdmin.lastName = 'Admin'
            superAdmin.password = 'demo-admin'
            superAdmin.role = 'superadmin'
            await superAdmin.save()
        } else {
            await User.create({
                email: 'admin@schoolhub.io',
                firstName: 'Super',
                lastName: 'Admin',
                password: 'demo-admin',
                role: 'superadmin',
            })
        }

        const developer = await User.query().where('email', 'user@schoolhub.io').first()

        if (developer) {
            developer.firstName = 'John'
            developer.lastName = 'Doe'
            developer.password = 'demo-user'
            developer.role = 'developer'
            await developer.save()
            return
        }

        await User.create({
            email: 'user@schoolhub.io',
            firstName: 'John',
            lastName: 'Doe',
            password: 'demo-user',
            role: 'developer',
        })
    }
}
