//SJSU CMPE 138 Spring 2022 TEAM3 

import { BACKEND_URL, BACKEND_PORT } from "./constants";


export const addBugService = async (bug) => {
  console.log(bug);
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bug)
  }
  const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/bug/new`, options);
  const status = response.status;
  const data = await response.json();
  return { status, data };
}