import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

import { authThrottle } from './limiter.js'
router
    .group(() => {
        router.get('/', [controllers.Home, 'index']).as('home')

        router.post('logout', [controllers.Session, 'destroy']).as('session.destroy')
    }).use(middleware.auth())

router.group(() => {
    router.get('login', [controllers.Session, 'create']).as('session.create')
    router.post('login', [controllers.Session, 'store']).as('session.store')
}).use(middleware.guest()).use(authThrottle)
