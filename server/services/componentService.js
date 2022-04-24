import { connection } from "../index.js";
import { parseRowDataPacket } from "./parsingService.js";


export const addComponentService = async (component) => {
  try{
    const {
      c_id, 
      c_name, 
      c_desc, 
      testlead_id,
      c_status,
      project_id,
    } = component;


    let componentUpdateQuery = `UPDATE Component SET
        c_name = '${c_name}',
        c_desc = '${c_desc}',
        c_status = '${c_status}',
        project_id = '${project_id}',
        testlead_id = '${testlead_id}'
        WHERE c_id = ${c_id};
    `;
    let componentAddQuery = `INSERT INTO Component (
        c_id,
        c_name,
        c_desc,
        c_status,
        project_id,
        testlead_id) VALUES (${null}, '${c_name}', '${c_desc}', '${c_status}',${project_id},${testlead_id})
    `;

    if(c_id){ //update
    let getComponentByIdQuery = `SELECT * FROM Component WHERE c_id = ${c_id};`;
      const response = await connection.query(componentUpdateQuery);
      const insertedObject = await connection.query(getComponentByIdQuery);
      const result = parseRowDataPacket(insertedObject);
      return {
        success: true,
        data: result[0]
      };
    }
    else{ //add

      //Need to check if the testlead_id, actually belongs to a test lead or NOT...
      const response = await connection.query(componentAddQuery);
      let getComponentByIdQuery = `SELECT * FROM Component WHERE c_id = ${response.insertId};`;
      const insertedObject = await connection.query(getComponentByIdQuery);
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