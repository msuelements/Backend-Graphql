import jwt from "jsonwebtoken";
import fs from 'fs';
const alpha = {
    "data1":"hello1",
    "data2":"hello2"
}

const privateKey = fs.readFileSync('jwtRS256.key');
const publickey = fs.readFileSync('jwtRS256.key.pub');

const encrypt = jwt.sign(alpha, privateKey, { algorithm: 'RS256' });
// const encrypt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkMjU1NDc1NzBhMDRjYmJiMGMxOTg4N2NlYjJlZTRkIiwiZW1haWwiOiJhYmhpc2h0Y2hvdWhhbkBnbWFpbC5jb20iLCJwcm4iOiIyMDE5MDMzIiwiaWF0IjoxNjI4NDgyMTM0fQ.vf_DxPOy8nTca7lyHK12bEuRLQiyLJo8yJ2OqSvbYsE";

const decoded = jwt.verify(encrypt, publickey, { algorithm: 'RS256'},(err,payload)=>{
    console.log(err)
});
