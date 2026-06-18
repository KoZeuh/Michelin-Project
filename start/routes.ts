import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.get('/', [controllers.Home, 'drop']).as('home')
  router.get('/pourquoi-michelin', [controllers.Home, 'pourquoi']).as('michelin.pourquoi')
})

router
  .group(() => {
    router.get('/login', [controllers.Session, 'create']).as('session.create')
    router.post('/login', [controllers.Session, 'store']).as('session.store')
    router.get('/register', [controllers.Session, 'registerCreate']).as('session.register')
    router.post('/register', [controllers.Session, 'registerStore']).as('session.registerStore')
  })
  .use(middleware.guest())

router
  .delete('/logout', [controllers.Session, 'destroy'])
  .as('session.destroy')
  .use(middleware.auth())

router
  .group(() => {
    router.post('auth/login', [controllers.api.Auth, 'store']).as('api.auth.login')

    router
      .group(() => {
        router.delete('auth/logout', [controllers.api.Auth, 'destroy']).as('api.auth.logout')
        router
          .get('drops/:dropId/context', [controllers.api.Drops, 'context'])
          .as('api.drops.context')
        router.get('drops/:dropId/packs', [controllers.api.Drops, 'packs']).as('api.drops.packs')
        router
          .get('products/:productId/reviews', [controllers.api.Products, 'reviews'])
          .as('api.products.reviews')
        router
          .post('packs/generate-code', [controllers.api.Packs, 'generateCode'])
          .as('api.packs.generateCode')
      })
      .use(middleware.apiAuth())
  })
  .prefix('api')
