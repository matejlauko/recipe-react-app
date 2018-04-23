/* eslint no-mixed-operators: 0 */
// @flow
import api from './server';
import { type Endpoint, type Method, METHODS, type Response } from './types';

type Settings = {
  method?: Method,
  body?: {},
};

export default function fetch(endpoint: Endpoint, settings?: Settings) {
  const method = (settings && settings.method) || METHODS.GET;
  const body = JSON.stringify((settings && settings.body) || {});

  return api(endpoint, method, body).then(respData => ({
    status: 200,
    statusText: 'OK',
    json: () => new Promise(res => res(respData)),
  }));
}

export const handleErrors = (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error: Error & { response?: {} } = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

export const handleResponse = (dispatch: any => {}, action: string) => (response: Response) => {
  return response.json().then(
    payload => {
      dispatch({ type: `${action}_SUCCESS`, payload });
    },
    error => {
      console.error(`Action ${action} failed`, error);
      dispatch({ type: `${action}_FAIL`, payload: error });
    }
  );
};
