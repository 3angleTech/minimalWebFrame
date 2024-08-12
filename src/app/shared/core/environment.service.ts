import { Injectable } from '@angular/core';

export type EnvironmentInstanceType = 'Production' | 'Development' | 'Staging' | 'Localhost' | 'Test';

/** The environment variables. */
export interface IEnvironmentVariables {
  /** The type of the environment. */
  type: EnvironmentInstanceType;
  /** The base url of the application. */
  apiBaseUrl: string;
  /** The version of the application bundle */
  applicationVersion: string;
  /** Whether the application is in debug mode. */
  debugEnabled: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService implements IEnvironmentVariables {
  public type: EnvironmentInstanceType;
  public apiBaseUrl: string;
  public applicationVersion: string;
  public debugEnabled: boolean;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const environment = (window as any).environment as IEnvironmentVariables;
    this.type = environment.type;
    this.apiBaseUrl = environment.apiBaseUrl;
    this.applicationVersion = environment.applicationVersion;
    this.debugEnabled = environment.debugEnabled;
  }
}
