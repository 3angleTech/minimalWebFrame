// Not sure if the lint error is correct
// eslint-disable-next-line import/no-unresolved
import 'zone.js/testing';

import { getTestBed } from '@angular/core/testing';
// eslint-disable-next-line import/no-unresolved
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
