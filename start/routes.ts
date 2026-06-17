// import { middleware } from '#start/kernel'
// import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'
const MichelinController = () => import('#controllers/michelin_controller')

// import { authThrottle } from './limiter.js'
router
  .group(() => {
    // router.get('/', [controllers.Home, 'index']).as('home')
    router.get('/', [MichelinController, 'drop']).as('home')
    router.get('/pourquoi-michelin', [MichelinController, 'pourquoi']).as('michelin.pourquoi')
    // router.post('logout', [controllers.Session, 'destroy']).as('session.destroy')
  })
//   .use(middleware.auth())

  router.get('/login', ({ response }) => {
  return response.redirect('/')
}).as('session.create')

// router
//   .group(() => {
    // router.get('login', [controllers.Session, 'create']).as('session.create')
    // router.post('login', [controllers.Session, 'store']).as('session.store')
    // router.get('/login', ({ response }) => response.redirect('/'))
//   })
//   .use(middleware.guest())
//   .use(authThrottle)
