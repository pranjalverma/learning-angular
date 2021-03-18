import {
  ActionReducerMap
} from '@ngrx/store';
import * as forApp from './app.reducer';

export interface State {
  app: forApp.AppState
}

export const reducers: ActionReducerMap<State> = {
  app: forApp.appReducer
};
