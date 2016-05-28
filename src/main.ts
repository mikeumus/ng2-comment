import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
// import { enableProdMode } from '@angular/core';
import { Ng2commentAppComponent } from './app';
// import { environment } from './app/environment';

// if (environment.production) {
// 	enableProdMode();
// }

bootstrap(Ng2commentAppComponent, [ HTTP_PROVIDERS ]);

