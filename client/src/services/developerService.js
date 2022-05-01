import { BACKEND_PORT, BACKEND_URL } from "./constants";

export const getDeveloperListService = async () => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/user/developers`, options);
  const status = response.status;
  const data = await response.json();
  console.log('Developer Service ', data, status);
  return { status, data };
}