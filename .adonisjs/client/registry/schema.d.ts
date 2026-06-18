/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type {
  ExtractBody,
  ExtractErrorResponse,
  ExtractQuery,
  ExtractQueryForGet,
  ExtractResponse,
} from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'session.create': {
    methods: ['GET', 'HEAD']
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import('#controllers/session_controller').default['create']>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import('#controllers/session_controller').default['create']>>
      >
    }
  }
  'session.store': {
    methods: ['POST']
    pattern: '/login'
    types: {
      body: ExtractBody<InferInput<typeof import('#validators/auth').loginValidator>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<typeof import('#validators/auth').loginValidator>>
      response: ExtractResponse<
        Awaited<ReturnType<import('#controllers/session_controller').default['store']>>
      >
      errorResponse:
        | ExtractErrorResponse<
            Awaited<ReturnType<import('#controllers/session_controller').default['store']>>
          >
        | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'session.register': {
    methods: ['GET', 'HEAD']
    pattern: '/register'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import('#controllers/session_controller').default['registerCreate']>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import('#controllers/session_controller').default['registerCreate']>>
      >
    }
  }
  'session.registerStore': {
    methods: ['POST']
    pattern: '/register'
    types: {
      body: ExtractBody<InferInput<typeof import('#validators/auth').registerValidator>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<typeof import('#validators/auth').registerValidator>>
      response: ExtractResponse<
        Awaited<ReturnType<import('#controllers/session_controller').default['registerStore']>>
      >
      errorResponse:
        | ExtractErrorResponse<
            Awaited<ReturnType<import('#controllers/session_controller').default['registerStore']>>
          >
        | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'session.destroy': {
    methods: ['DELETE']
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import('#controllers/session_controller').default['destroy']>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import('#controllers/session_controller').default['destroy']>>
      >
    }
  }
  'profile.index': {
    methods: ['GET', 'HEAD']
    pattern: '/profil'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import('#controllers/profile_controller').default['index']>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import('#controllers/profile_controller').default['index']>>
      >
    }
  }
  'api.packs.generateCode': {
    methods: ['POST']
    pattern: '/api/packs/generate-code'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import('#controllers/api/packs_controller').default['generateCode']>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import('#controllers/api/packs_controller').default['generateCode']>>
      >
    }
  }
  'home': {
    methods: ['GET', 'HEAD']
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import('#controllers/home_controller').default['drop']>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import('#controllers/home_controller').default['drop']>>
      >
    }
  }
  'michelin.pourquoi': {
    methods: ['GET', 'HEAD']
    pattern: '/pourquoi-michelin'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import('#controllers/home_controller').default['pourquoi']>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import('#controllers/home_controller').default['pourquoi']>>
      >
    }
  }
  'api.auth.login': {
    methods: ['POST']
    pattern: '/api/auth/login'
    types: {
      body: ExtractBody<InferInput<typeof import('#validators/auth').loginValidator>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<typeof import('#validators/auth').loginValidator>>
      response: ExtractResponse<
        Awaited<ReturnType<import('#controllers/api/auth_controller').default['store']>>
      >
      errorResponse:
        | ExtractErrorResponse<
            Awaited<ReturnType<import('#controllers/api/auth_controller').default['store']>>
          >
        | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.auth.logout': {
    methods: ['DELETE']
    pattern: '/api/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import('#controllers/api/auth_controller').default['destroy']>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import('#controllers/api/auth_controller').default['destroy']>>
      >
    }
  }
  'api.drops.context': {
    methods: ['GET', 'HEAD']
    pattern: '/api/drops/:dropId/context'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { dropId: ParamValue }
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import('#controllers/api/drops_controller').default['context']>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import('#controllers/api/drops_controller').default['context']>>
      >
    }
  }
  'api.drops.packs': {
    methods: ['GET', 'HEAD']
    pattern: '/api/drops/:dropId/packs'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { dropId: ParamValue }
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import('#controllers/api/drops_controller').default['packs']>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import('#controllers/api/drops_controller').default['packs']>>
      >
    }
  }
  'api.products.reviews': {
    methods: ['GET', 'HEAD']
    pattern: '/api/products/:productId/reviews'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { productId: ParamValue }
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import('#controllers/api/products_controller').default['reviews']>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import('#controllers/api/products_controller').default['reviews']>>
      >
    }
  }
}
