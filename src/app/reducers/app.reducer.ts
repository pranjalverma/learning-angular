import {
    createReducer,
    on
  } from '@ngrx/store';
import { User } from '../models/user.model';
import { getProductDetailsAction, signupAction } from '../app.actions';

export interface AppState {
    user: User | undefined,
    data: any
}

export const initialAppState: AppState = {
    user: undefined,
    data: undefined
}

export const appReducer = createReducer(
    initialAppState,
    on(signupAction, (appState, thisAction) => {
      return {
        user: thisAction.user,
        data: appState.data
      };
    }),
    on(getProductDetailsAction, (appState, thisAction) => {
      return {
        user: appState.user,
        data: thisAction.data
      }
    })
)

// export const getProductDetailsReducer = createReducer(
//   initialAppState,
//   on(getProductDetailsAction, (appState, thisAction) => {
//     return {
//       user: appState.user,
//       data: thisAction.data
//     }
//   })
// )