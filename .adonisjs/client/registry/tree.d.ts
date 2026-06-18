/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: (typeof routes)['home']
  session: {
    create: (typeof routes)['session.create']
    store: (typeof routes)['session.store']
    register: (typeof routes)['session.register']
    registerStore: (typeof routes)['session.registerStore']
    destroy: (typeof routes)['session.destroy']
  }
  profile: {
    index: (typeof routes)['profile.index']
  }
  michelin: {
    pourquoi: (typeof routes)['michelin.pourquoi']
  }
  api: {
    auth: {
      login: (typeof routes)['api.auth.login']
      logout: (typeof routes)['api.auth.logout']
    }
    drops: {
      context: (typeof routes)['api.drops.context']
      packs: (typeof routes)['api.drops.packs']
    }
    products: {
      reviews: (typeof routes)['api.products.reviews']
    }
    packs: {
      generateCode: (typeof routes)['api.packs.generateCode']
    }
  }
}
