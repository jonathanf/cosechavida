// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  bd: 'cosechavida.org',
  rutas:{
    login:'https://cosechavida.org/api/auth/token',
    producto: 'https://cosechavida.org/api/product.product?domain=[("type","ilike","product"), ("active","ilike","true")]&fields=["name","uom_id","lst_price", "type", "active"]',
    order: 'https://cosechavida.org/api/purchase.order',
    orderline:'https://cosechavida.org/api/purchase.order.line'

  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
