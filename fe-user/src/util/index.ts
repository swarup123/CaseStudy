import { environment } from "../environments/environment";

export function validateEmail(value: string) {
  if (
    value &&
    new RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).test(value)
  ) {
    return false;
  }
  return true;
}

export const getAPIURL = (): string => {
  return `${environment.API_URL}`;
};
