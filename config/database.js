import mysql from "mysql";
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "abhi250301",
    database: "msuelements",
    port: "3306"
});
export default conn;