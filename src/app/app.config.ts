import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from '../interceptors/auth.interceptor';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { baseUrlInterceptor } from '../interceptors/base-url.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    // provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(withInterceptors([authInterceptor, baseUrlInterceptor])),

  ],
};
