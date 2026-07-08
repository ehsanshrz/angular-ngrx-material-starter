import { Injectable } from '@angular/core';

import { Store} from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectIsAuthenticated } from './auth.selectors';
import { AppState } from '../core.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  {
  constructor(private store: Store<AppState>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated);
  }
}
