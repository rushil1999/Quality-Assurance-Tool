import { connection } from '../index.js';
import { parseRowDataPacket } from './parsingService.js';
import { insertTester } from './testerService.js';
import pkg1 from 'bcrypt';

const { compare, genSalt, hash: _hash } = pkg1;
export const signUpService = async (user) => {
  try{
    const {
      e_id,
      email,
      firstName,
      lastName,
      type, 
      pwd  
    } = user;
    let getUserByIdQuery = `SELECT * FROM User WHERE e_id = ${e_id}`;
    const getLastInerstedIdQuery = `SELECT LAST_INSERT_ID();`;

    let sql_findEmail = `SELECT * FROM User WHERE email = '${email}'`;
    
    async function hashPassword(password) {
      const salt = await genSalt(10);
      const hash = await _hash(password, salt);
      return hash;
    }
    const checkEmailResponse = await connection.query(sql_findEmail);
    if(parseRowDataPacket(checkEmailResponse).length > 0){
      return {
        success: false,
        message: 'Email Already exists'
      };
    }

    let finalObj;
    finalObj = hashPassword(pwd).then(async (customerPassword) => {

      let sql_insert = `INSERT INTO User 
      (e_id, 
      email, 
      firstName, 
      lastName, 
      pwd, 
      type) VALUES (${null}, '${email}', '${firstName}', '${lastName}', '${customerPassword}', '${type}')`;


      const response = await connection.query(sql_insert);
      getUserByIdQuery = `SELECT * FROM User WHERE e_id = ${response.insertId}`;
      const insertedObject = await connection.query(getUserByIdQuery);
      const result = parseRowDataPacket(insertedObject);
      if(type === 'tester'){
        const serviceResponse = await insertTester(response.insertId);
        if(serviceResponse.length> 0){
          return {
            success: true,
            data: result[0]
          }
        }
        else{ 
          //delete recently entered user or do the entire processing in one transaction
        }
      }
      else if(type === 'developer'){
        const serviceResponse = await insertDeveloepr(response.insertId);
        if(serviceResponse.length> 0){
          return {
            success: true,
            data: result[0]
          }
        }
        else{ 
          //delete recently entered user or do the entire processing in one transaction
        }
      }
      else{
        return {
          success: true,
          data: result[0]
        }
      }
    });
    return finalObj;
  }
  catch(e){
    console.log(e);
    return{
      success: false,
      message: e.message
    }
  }
}