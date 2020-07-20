import * as c from './ActionTypes';

export const requestRemedies = () => ({
  type: c.REQUEST_REMEDIES
});

export const getRemediesSuccess = (remedies) => ({
  type: c.GET_REMEDIES_SUCCESS,
  remedies
});

export const getRemediesFailure = (error) => ({
  type: c.GET_REMEDIES_FAILURE,
  error
});

export const makeApiCall = () => {
  return dispatch => {
    dispatch(requestRemedies);
    return fetch(
      `http://localhost:5000/api/remedies`, {
      headers: new Headers({
        'Authorization': 'Bearer' + process.env.REACT_APP_API_KEY,
        'Content-Type': 'application/json'
      })
    }
    )
      .then(response => response.json())
      .then(
        (jsonifiedResponse) => {
          dispatch(getRemediesSuccess(jsonifiedResponse.results));
        })
      .catch((error) => {
        dispatch(getRemediesFailure(error));
      });
  }
}