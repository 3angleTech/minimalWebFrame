import { Injectable } from '@angular/core';
import { IContextStateService } from './context-state.interface';

/**
 * Service holding the state of the application.
 */
@Injectable()
export class ContextStateService implements IContextStateService {

  public isAuthenticated(): boolean {
    return false;
  }
}
