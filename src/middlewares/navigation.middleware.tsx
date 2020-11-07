import { Middleware } from "redux";
import { HTTP_REQUEST_SUCCESS, NAVIGATE } from "@types";
import { push } from "react-router-redux";

const Navigation: Middleware = (store: any) => (next: any) => (action: any) => {
  const { type, payload = {} } = action || {};

  if (type === NAVIGATE && payload.challenge) {
    const { challenge } = payload;
    store.dispatch(push(challenge));
  } else if (type === HTTP_REQUEST_SUCCESS && payload.data) {
    const { challenge, ...data } = payload?.data || {};
    store.dispatch(push(challenge));
  }

  return next(action);
};

export default Navigation;
