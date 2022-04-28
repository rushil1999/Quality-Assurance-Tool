import { BACKEND_URL, BACKEND_PORT } from "./constants";

export const fetchComponentListOfProjectService = async(project_id) => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/component/project/${project_id}`, options);
  const status = response.status;
  const data = await response.json();
  console.log('Component Service ', data);
  return { status, data };
}


export const fetchComponentListOfTestleadService = async(testlead_id) => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/component/test_lead/${testlead_id}`, options);
  const status = response.status;
  const data = await response.json();
  console.log('Component Service ', data);
  return { status, data };
}
