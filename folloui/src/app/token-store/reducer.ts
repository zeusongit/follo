import { TokenActionTypes, TokenActions } from './actions';

export let initialToken = null;

export function reducer(state = null, action: TokenActions) {
  switch (action.type) {
    case TokenActionTypes.ADD_TOKEN:
      state = action.payload;
      return state;

    case TokenActionTypes.REMOVE_TOKEN:
      state = null;
      return state;

    default:
      return state;
  }
}
