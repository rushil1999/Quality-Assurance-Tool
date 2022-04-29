import { connection } from "../index.js";
import { parseRowDataPacket } from "./parsingService.js";


export const addProjectService = async (project) => {
  try{
    const {
      p_id, 
      p_name, 
      p_desc, 
      manager_id,
    } = project;


    let projectUpdateQuery = `UPDATE Project SET
        p_name = '${p_name}',
        p_desc = '${p_desc}',
        manager_id = '${manager_id}'
        WHERE p_id = ${p_id};
    `;
    let projectAddQuery = `INSERT INTO Project (
        p_id,
        p_name,
        p_desc,
        manager_id) VALUES (${null}, '${p_name}', '${p_desc}',${manager_id})
    `;

    if(p_id){ //update
    let getProjectByIdQuery = `SELECT * FROM Project WHERE p_id = ${p_id};`;
      const response = await connection.query(projectUpdateQuery);
      const insertedObject = await connection.query(getProjectByIdQuery);
      const result = parseRowDataPacket(insertedObject);
      return {
        success: true,
        data: result[0]
      };
    }
    else{ //add
      const response = await connection.query(projectAddQuery);
      let getProjectByIdQuery = `SELECT * FROM Project WHERE p_id = ${response.insertId};`;
      const insertedObject = await connection.query(getProjectByIdQuery);
      const result = parseRowDataPacket(insertedObject);
      return {
        success: true,
        data: result[0]
      };
    }
  }
  catch(e){
    console.log(e);
    return {
      success: false,
      message:  e.message
    }
  }
}


export const getProjectsBasedOnManagerService = async (manager_id) =>{ 
  const getProjectsBasedOnManager = `SELECT * FROM Project WHERE manager_id = ${manager_id}`;
  try{
    const response = await  connection.query(getProjectsBasedOnManager);
    const parsedResponse = parseRowDataPacket(response);
    return{
      success: true,
      data: parsedResponse
    }
  }
  catch(e){
    console.log(e);
    return{
      success: false,
      message: e.message
    }
  }
}

export const getProjectBasedOnIdService = async (p_id) =>{ 
  const getProjectsBasedOnId = `SELECT * FROM Project WHERE p_id = ${p_id}`;
  try{
    const response = await  connection.query(getProjectsBasedOnId);
    const parsedResponse = parseRowDataPacket(response);
    return{
      success: true,
      data: parsedResponse
    }
  }
  catch(e){
    console.log(e);
    return{
      success: false,
      message: e.message
    }
  }
}


export const getTotalProjectsCountService = async () => {
  const getTotalProjectsCountQuery =   `SELECT COUNT(*) AS COUNT FROM Project`;
  try{
    const response = await connection.query(getTotalProjectsCountQuery);
    const parsedResponse = parseRowDataPacket(response);
    return {
      success: true,
      data: parsedResponse
    };
  }
  catch(e){
    console.log(e);
    return{
      success: false,
      message: e.message 
    
    }
  }
}
