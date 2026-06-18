import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'michelin.pourquoi': { paramsTuple?: []; params?: {} }
    'api.auth.login': { paramsTuple?: []; params?: {} }
    'api.auth.logout': { paramsTuple?: []; params?: {} }
    'api.drops.context': { paramsTuple: [ParamValue]; params: {'dropId': ParamValue} }
    'api.drops.packs': { paramsTuple: [ParamValue]; params: {'dropId': ParamValue} }
    'api.products.reviews': { paramsTuple: [ParamValue]; params: {'productId': ParamValue} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'michelin.pourquoi': { paramsTuple?: []; params?: {} }
    'api.drops.context': { paramsTuple: [ParamValue]; params: {'dropId': ParamValue} }
    'api.drops.packs': { paramsTuple: [ParamValue]; params: {'dropId': ParamValue} }
    'api.products.reviews': { paramsTuple: [ParamValue]; params: {'productId': ParamValue} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'michelin.pourquoi': { paramsTuple?: []; params?: {} }
    'api.drops.context': { paramsTuple: [ParamValue]; params: {'dropId': ParamValue} }
    'api.drops.packs': { paramsTuple: [ParamValue]; params: {'dropId': ParamValue} }
    'api.products.reviews': { paramsTuple: [ParamValue]; params: {'productId': ParamValue} }
  }
  POST: {
    'api.auth.login': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'api.auth.logout': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}