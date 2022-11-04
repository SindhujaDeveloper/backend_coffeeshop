import bodyParser from 'body-parser';
import express from 'express';
import { publicRouter } from './router';
import cors from 'cors';
import CryptoJS from 'crypto-js';
import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid';


const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public', publicRouter);


// const key = uuidv4();

// function encrypt(text) {

//     var ciphertext = CryptoJS.AES.encrypt(text, key).toString();

//     return {
//         encryptedData: ciphertext,
//         key: key.toString('hex')
//     };
// }
// var output = encrypt("s@gmail.com");
// console.log(output);


let algorithm = 'aes-256-gcm';
let enc_password = 'k15XSjo1f6GKBfu0WbZkyC5DJgbsJyd9';
var encrypted_data = "b97w12PqzKbDTERdcQioexJ5f7Ehp68=--roKunPTIYhRp1U+e--on3Oq9irN2szOpSoVMnFvg=="


function digest_and_decrypt(digest) {
    let [encryptedValue, iv] = digest.split('--');
    let decipher = crypto.createDecipheriv(algorithm, enc_password, Buffer.from(iv, 'base64'));
    let dec = decipher.update(encryptedValue, 'base64', 'utf8');
    console.log(dec)
}

digest_and_decrypt(encrypted_data)

// var params = {
//   'apikey': '', // API Key
//   'sender': 'SEDEMO', // Sender Name
//   'to': [
//     '78680493366'  //Moblie Number
//   ],
//   'message': 'Hello, This is a test message from spring edge',
//   'format': 'json'
// };

// springedge.messages.send(params, 5000, function (err, response) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log(response);
// });

app.listen(3004, () => console.log(`Hello world app listening on port 3004!`));