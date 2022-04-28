import { BACKEND_PORT, BACKEND_URL } from "./constants";

export const fetchProjectDetailsService = async (id) => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/project/details/${id}`, options);
  const status = response.status;
  const data = await response.json();
  console.log('Project Service ', data);
  return { status, data };
}

export const addProjectService = async (project) => {
  console.log(project);
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project)
  }
  const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/project/new`, options);
  const status = response.status;
  const data = await response.json();
  return { status, data };
}
