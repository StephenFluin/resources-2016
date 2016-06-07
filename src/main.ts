import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { ResourcesAppComponent, environment } from './app/';

import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(ResourcesAppComponent, [
  FIREBASE_PROVIDERS,
  defaultFirebase('https://project-8263071350145382327.firebaseio.com/')
]);

