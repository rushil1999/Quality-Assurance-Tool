import { connection } from "../index.js";
import { parseRowDataPacket } from "./parsingService.js";

export const insertTester = async (tester_id) => {
    const testerAddQuery = `INSERT INTO tester (tester_id, no_of_bugs_raised) VALUES (${tester_id}, ${0})`;
    const result = await connection.query(testerAddQuery);
    console.log('Testter Addisiton result', result);
    const parsedResult = parseRowDataPacket(result);
    return parsedResult;
}

export const updateRaisedBugCountForTester = () => {
  
}