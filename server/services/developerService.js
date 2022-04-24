import { connection } from "../index.js";
import { parseRowDataPacket } from "./parsingService.js";

export const insertDeveloper = async (tester_id) => {
    const testerAddQuery = `INSERT INTO developer (developer_id, no_of_bugs_resolved) VALUES (${developer_id}, ${0})`;
    const result = await connection.query(testerAddQuery);
    console.log('Develoepr Addition result', result);
    const parsedResult = parseRowDataPacket(result);
    return parsedResult;
}


//Need to update the number of bug resolved....
