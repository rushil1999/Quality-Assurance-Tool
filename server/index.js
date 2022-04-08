import express from 'express';
import cors from  'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql';

import testRouter from './routes/testRoutes.js';
import userRouter from './routes/userRotues.js';
import projectRouter from './routes/projectRoutes.js';

const port = 5000;
const corsConfig = {
  credentials: true,
  origin: true,
};


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

export const connection = mysql.createConnection({
  host     : 'qa-tool.cbm1wfipyose.us-east-1.rds.amazonaws.com',
  port     : 3306,
  user     : 'admin',
  password : 'project180b',
  database: "qa_tool"
});
 
connection.connect((err) =>{
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});




//Primary Routes
app.use('/test', testRouter);
app.use('/user', userRouter);
app.use('/project', projectRouter);