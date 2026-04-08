/**
 * PROG2005 Assignment 2 Part 2
 * App Configuration
 * Application-wide configuration and providers
 */
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { InventoryService } from './inventory/inventory';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    InventoryService
  ]
};
