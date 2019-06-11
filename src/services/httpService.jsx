import Axios from "axios";
import { toast } from "react-toastify";
import * as Sentry from "@sentry/browser";

Axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

  if (!expectedError) {
    console.log("Logging the error: ", error);
    Sentry.captureException(error);
    toast.error("Unexpected error occured!");
  }

  return Promise.reject(error);
});

export default {
  get: Axios.get,
  post: Axios.post,
  put: Axios.put,
  delete: Axios.delete
};
