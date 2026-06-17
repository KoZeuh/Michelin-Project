import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

import { authThrottle } from './limiter.js'

const ApiAuthController = () => import('#controllers/api/auth_controller')
const ApiDropsController = () => import('#controllers/api/drops_controller')
const ApiProductsController = () => import('#controllers/api/products_controller')

router
    .group(() => {
        router.get('/', [controllers.Home, 'index']).as('home')

        router.post('logout', [controllers.Session, 'destroy']).as('session.destroy')
    })
    .use(middleware.auth())

router
    .group(() => {
        router.get('login', [controllers.Session, 'create']).as('session.create')
        router.post('login', [controllers.Session, 'store']).as('session.store')
    })
    .use(middleware.guest())
    .use(authThrottle)

router.group(() => {
    router.post('auth/login', [ApiAuthController, 'store']).as('api.auth.login')

    router
        .group(() => {
            router.delete('auth/logout', [ApiAuthController, 'destroy']).as('api.auth.logout')
            router
                .get('drops/:dropId/context', [ApiDropsController, 'context'])
                .as('api.drops.context')
            router
                .get('drops/:dropId/packs', [ApiDropsController, 'packs'])
                .as('api.drops.packs')
            router
                .get('products/:productId/reviews', [ApiProductsController, 'reviews'])
                .as('api.products.reviews')
        })
        .use(middleware.apiAuth())
}).prefix('api')
