import {request} from "express";
import conn from "../../config/database.js";
export default {
    trialRun: async (args, request) => {
        return request.ip;
    },
    trialcall: async (args,request) => {
        conn.query("SELECT * FROM students_users",(error, results, fields)=>{
            if (error) throw error;
            console.log(results);
        })
        return "call successfully done";
    },
    ip: async (args, request) => {
        console.log(args)
        return request.ip;
    },
    dataxtrial: async (args,request) => {
        return "this is working"
    }

}