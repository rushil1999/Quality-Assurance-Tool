import { connection } from "../index.js";
import { parseRowDataPacket } from "./parsingService.js";

// export const insertBug = async (obj) => {
//   try{
//     const {b_id, testcase_id, b_status, created_by, resolved_by} = obj;
//     const bugCount = await getTotalBugs() + 1;
//     const insertBugQuery = `INSERT INTO Bug (b_id, 
//       testcase_id, 
//       b_status, 
//       created_by, 
//       resolved_by) VALUES (${bugCount}, ${testcase_id}, '${b_status}',${created_by}, ${resolved_by})`;
//     const result = parseRowDataPacket(await connection.query(insertBugQuery));
    
//     console.log(result);
//     return {
//       success: true,
//       data: result
//     };
//   }
//   catch(e){
//     console.log(e);
//     return{
//       success: false,
//       message: e
//     }
//   }
// }


// export const updateBug = async (obj) => {
//   try{
//     const {b_id, testcase_id, b_status, created_by, resolved_by} = obj;
//     const insertBugQuery = `UPDATE Bug SET 
//         testcase_id = ${testcase_id}, 
//         b_status = ${b_status}, 
//         created_by = ${created_by}, 
//         resolved_by = ${resolved_by}
//         WHERE b_id = ${b_id}`;
//     const result = parseRowDataPacket(await connection.query(insertBugQuery));
//     return {
//       success: true,
//       data: result
//     };
//   }
//   catch(e){
//     console.log(e);
//     return{
//       success: false,
//       message: e
//     }
//   }
// }

export const addBugService = async (bug) => {
  try {
    const {
      b_id,
      b_status,
      created_by,
      resolved_by,
      testcase_id,
    } = bug;
    console.log(bug);
    let getBugByIdQuery = `SELECT * FROM Bug WHERE b_id = ${b_id};`;

    let bugUpdateQuery = `UPDATE Bug SET
        b_status = '${b_status}',
        created_by = ${created_by},
        resolved_by = ${resolved_by},
        testcase_id = ${testcase_id}
        WHERE b_id = ${b_id};
    `;
    
    if (b_id) { //Update
      const response = await connection.query(bugUpdateQuery);
      console.log('Updated Bug', response);
      const insertedObject = await connection.query(getBugByIdQuery);
      console.log('Inserted Obejct', insertedObject);
      const result = parseRowDataPacket(insertedObject);
      return {
        success: true,
        data: result[0]
      };
    }
    else { //Add New
      const newBugId = await getTotalBugs()+1;

      let bugAddQuery = `INSERT INTO Bug (
        b_id,
        b_status,
        created_by,
        resolved_by,
        testcase_id) VALUES (${newBugId}, '${b_status}', '${created_by}','${resolved_by}',${testcase_id})
    `;

      const response = await connection.query(bugAddQuery);
      console.log('Inserted Bug Case', response);
      getTestCaseByIdQuery = `SELECT * FROM Bug WHERE b_id = ${response.insertId};`;
      const insertedObject = await connection.query(getBugByIdQuery);
      const result = parseRowDataPacket(insertedObject);
      return {
        success: true,
        data: result[0]
      };
    }
  }
  catch (err) {
    console.log(err);
    return {
      success: false,
      message: err.message
    };
  }
}

export const getBugBasedOnTesterService = async (tester_id) => {
  try{
    const getBugBasedOnTesterQuery = `SELECT * FROM Bug WHERE created_by = ${tester_id}`;
    const result = parseRowDataPacket(await connection.query(getBugBasedOnTesterQuery));
    return {
      success: true,
      data: result
    }
  }
  catch(e){
    console.log(e);
    return {
      success: false,
      message: e
    }
  }
}

export const getBugBasedOnTestCaseService = async (testcase_id) => {
  try{
    const getBugBasedOnTestCaseQuery = `SELECT * FROM Bug WHERE testcase_id = ${testcase_id}`;
    const result = parseRowDataPacket(await connection.query(getBugBasedOnTestCaseQuery));
    console.log(result);
    return {
      success: true,
      data: result
    }
  }
  catch(e){
    console.log(e);
    return {
      success: false,
      message: e
    }
  }
}


export const getTotalBugs = async () => {
  try{
    const getTotalBugCount = `SELECT COUNT(*) FROM Bug`;
    const result = parseRowDataPacket( await connection.query(getTotalBugCount));
    console.log('Bug Count', result);
    return result[0]['COUNT(*)'];

  }
  catch(e){
    console.log(e);
  }
}