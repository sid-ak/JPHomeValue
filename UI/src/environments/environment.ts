// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Enter your own API key.
  firebaseConfig: {
    apiKey: "",
    authDomain: "jphomevalue.firebaseapp.com",
    databaseURL: "https://jphomevalue-default-rtdb.firebaseio.com",
    projectId: "jphomevalue",
    storageBucket: "jphomevalue.appspot.com",
    messagingSenderId: "782714524763",
    appId: "1:782714524763:web:389aa322fdeb9f0b3e1b7e",
    measurementId: "G-MFD8EC94QV"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
