import * as c from "./../actions/ActionTypes";

const initialState = {
  isLoading: false,
  remedies: [],
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case c.REQUEST_REMEDIES:
      return Object.assign({}, state, {
        isLoading: true
      });
    case c.GET_REMEDIES_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        remedies: action.remedies
      });
    case c.GET_REMEDIES_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    default:
      return state;
  }
};