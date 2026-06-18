/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'michelin.pourquoi': {
    methods: ["GET","HEAD"],
    pattern: '/pourquoi-michelin',
    tokens: [{"old":"/pourquoi-michelin","type":0,"val":"pourquoi-michelin","end":""}],
    types: placeholder as Registry['michelin.pourquoi']['types'],
  },
  'api.auth.login': {
    methods: ["POST"],
    pattern: '/api/auth/login',
    tokens: [{"old":"/api/auth/login","type":0,"val":"api","end":""},{"old":"/api/auth/login","type":0,"val":"auth","end":""},{"old":"/api/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['api.auth.login']['types'],
  },
  'api.auth.logout': {
    methods: ["DELETE"],
    pattern: '/api/auth/logout',
    tokens: [{"old":"/api/auth/logout","type":0,"val":"api","end":""},{"old":"/api/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['api.auth.logout']['types'],
  },
  'api.drops.context': {
    methods: ["GET","HEAD"],
    pattern: '/api/drops/:dropId/context',
    tokens: [{"old":"/api/drops/:dropId/context","type":0,"val":"api","end":""},{"old":"/api/drops/:dropId/context","type":0,"val":"drops","end":""},{"old":"/api/drops/:dropId/context","type":1,"val":"dropId","end":""},{"old":"/api/drops/:dropId/context","type":0,"val":"context","end":""}],
    types: placeholder as Registry['api.drops.context']['types'],
  },
  'api.drops.packs': {
    methods: ["GET","HEAD"],
    pattern: '/api/drops/:dropId/packs',
    tokens: [{"old":"/api/drops/:dropId/packs","type":0,"val":"api","end":""},{"old":"/api/drops/:dropId/packs","type":0,"val":"drops","end":""},{"old":"/api/drops/:dropId/packs","type":1,"val":"dropId","end":""},{"old":"/api/drops/:dropId/packs","type":0,"val":"packs","end":""}],
    types: placeholder as Registry['api.drops.packs']['types'],
  },
  'api.products.reviews': {
    methods: ["GET","HEAD"],
    pattern: '/api/products/:productId/reviews',
    tokens: [{"old":"/api/products/:productId/reviews","type":0,"val":"api","end":""},{"old":"/api/products/:productId/reviews","type":0,"val":"products","end":""},{"old":"/api/products/:productId/reviews","type":1,"val":"productId","end":""},{"old":"/api/products/:productId/reviews","type":0,"val":"reviews","end":""}],
    types: placeholder as Registry['api.products.reviews']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
