import { Action } from '@ngrx/store';

export enum TokenActionTypes {
  ADD_TOKEN = '[TOKEN] ADD TOKEN',
  REMOVE_TOKEN = '[TOKEN] REMOVE TOKEN'
}


export class AddToken implements Action {
  readonly type = TokenActionTypes.ADD_TOKEN;
  constructor(public payload: any) { }
}

export class RemoveToken implements Action {
  readonly type = TokenActionTypes.REMOVE_TOKEN;
  constructor(public payload: any) { }
}


export type TokenActions = AddToken | RemoveToken;
