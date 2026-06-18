/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  michelin: {
    pourquoi: typeof routes['michelin.pourquoi']
  }
  api: {
    auth: {
      login: typeof routes['api.auth.login']
      logout: typeof routes['api.auth.logout']
    }
    drops: {
      context: typeof routes['api.drops.context']
      packs: typeof routes['api.drops.packs']
    }
    products: {
      reviews: typeof routes['api.products.reviews']
    }
  }
}
