import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { State } from 'src/app/reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  user!: User | undefined;

  constructor(
    private storeService: Store<State>,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    this.storeService
      .subscribe(state => {
        this.user = state.app.user;
      })

    if (this.user === undefined) {
      this.router.navigate(['signup']);
      return of(false);
    }

    return of(true);
  }
}
