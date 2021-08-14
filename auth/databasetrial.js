import conn from "../config/database.js";


const studentUpdateQuery = `insert into students.students (id,username,prn,email,faculty_id,batch_id) 
    values ('${"023"}','${"imabhisht"}','${"2019"}','${"abhishtchouhan@gmail.com"}','${"delta"}','${"beta"}')`;

conn.query(studentUpdateQuery, (err, results, fields) => {
    if (err) throw err;
    console.log("Done, check database");
})