import pkg1 from 'bcrypt';
import { connection } from '../index.js';
const { compare, genSalt, hash: _hash } = pkg1;
import { sendCustomError, sendCustomSuccess } from './common.js';

export const signUp = async(req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const type = req.body.type;
  const phones = req.body.phones;
  const password = req.body.password;

  var sql_findEmail = "SELECT * FROM User WHERE email = ?";
  var sql_insert = "INSERT INTO User (e_id, email, firstName, lastName, phones, pwd, type) values (?, ?, ?, ?, ?, ?, ?)";
  async function hashPassword(password) {
    const salt = await genSalt(10);
    const hash = await _hash(password, salt);
    return hash;
  }

  hashPassword(password).then((customerPassword) => {
    connection.query(sql_findEmail, [email], function (err, result) {
      if (err) {
        console.log(err);
        sendCustomError(res, 205, 'Internal Server Error');
      }
      else {
        if (result && result[0] == null) {
          let phoneStr = phones.toString();
          phoneStr = "["+ phoneStr;
          phoneStr += "]";
          
          console.log(phoneStr);
          connection.query(sql_insert, [null, email,firstName,lastName, phoneStr,customerPassword, type], function (err, result) {
            if (err) {
              sendCustomError(res, 205, 'Sign Up Failed');
            }
            else {
              sendCustomSuccess(res, result[0])
            }
          });
        }
        else {
          console.log('SQL Error:', err);
          sendCustomError(res, 205, 'Email Already Exists');
        }
      }
    });
  });
};