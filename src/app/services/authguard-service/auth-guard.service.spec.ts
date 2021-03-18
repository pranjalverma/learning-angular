import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';

import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let store: MockStore;

  let initialState = {
    app: {
      user: undefined,
      data: undefined
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'signup', redirectTo:''}
        ])
      ],
      providers: [
        AuthGuardService,
        provideMockStore({ initialState })
      ]
    });
    
    service = TestBed.inject(AuthGuardService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false if the user state is not signed up', () => {
    const expected = cold('(a|)', { a: false });
    expect(service.canActivate()).toBeObservable(expected);
  });

  it('should return true if the user state is signed up', () => {
    store.setState({
      app: {
        user: {firstname: 'Pranjal'},
        data: undefined
      }
    });

    const expected = cold('(a|)', { a: true });
    expect(service.canActivate()).toBeObservable(expected);
  });
});
