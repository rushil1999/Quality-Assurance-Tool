import { BACKEND_PORT, BACKEND_URL } from "./constants";

export const getTotalTestCaseCountService = async () => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/testCase/count`, options);
  const status = response.status;
  const data = await response.json();
  console.log('TestCase Service ', data);
  return { status, data };
}
