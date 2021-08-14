import {OAuth2Client} from "google-auth-library";
import CredentialsConfig from "../../config/credentials.js";
import conn from "../../config/database.js";
import {v4 as uuidv4} from 'uuid';
import jwt from "jsonwebtoken";
const client = new OAuth2Client(CredentialsConfig.GOOGLE_CLIENT_ID);

const GoogleSignIn = async (token) => {
    const verify = async (token) => {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CredentialsConfig.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            });
            return ticket.getPayload();
        } catch (e) {
            throw new e;
        }
    }

    try {
        const payload = await verify(token);
        return {
            name: payload['name'],
            avatar: payload['picture'],
            id: payload['sub'],
            email_verified: payload['email_verified'],
            email: payload['email']
        }
    } catch (e) {
        throw new Error(
            'Error while authenticating Google User: ' + JSON.stringify(e)
        );
    }
}

const PrnInformation = (email) => {
    return {
        batch_id: "f626d15e34644d5b96904ffc42a37f59",
        faculty_id: "a5c7e3d191384d2793ff1c05be2bf538",
        batch_username: "ce19poly",
        faculty_username: ""
    }
}

const signData = (payload) => {
        return jwt.sign(payload, "trialkey");
}

export default {
    login: async (args, req) => {
        const {prn, email, username} = args;
        const prnData = PrnInformation(email);
        const id = uuidv4().replace(/-/g, '');
        const batchUsernameQuery = `select * from batch.polytechnic where id = '${prnData.batch_id}'`
        const facultyUsernameQuery = `select * from university.faculty where id = '${prnData.faculty_id}'`

        const promiseBatchDetails = new Promise((resolve, reject) => {
            conn.query(batchUsernameQuery, (err, results, fields) => {
                if (err) reject(err);
                resolve(results[0])
            })
        });

        const promiseFacultyDetails = new Promise((resolve, reject) => {
            conn.query(facultyUsernameQuery, (err, results, fields) => {
                if (err) reject(err);
                resolve(results[0])
            })
        });

        const promiseUserInsert = (studentUpdateQuery) => new Promise((resolve, reject) => {
            console.log("activated Student Query");
            conn.query(studentUpdateQuery, (err, results, fields) => {
                if (err) reject(err);
                resolve();
            })
        })

        try {
            const batchDetails = await promiseBatchDetails;
            const facultyDetails = await promiseFacultyDetails;

            batchDetails.info = JSON.parse(batchDetails.info);
            batchDetails.administration = JSON.parse(batchDetails.administration);
            console.log(batchDetails, facultyDetails);
            // const studentUpdateQuery = `insert into arcticFox.students_users (id,username,prn,email,faculty_username,batch_username) values ('${id}','${username}','${prn}','${email}','${faculty_username}','${batch_username}')`;
            // await promiseUserInsert(studentUpdateQuery);

            const elementsAccess = await signData({id,email,prn});
            return {id,
                username,
                prn,
                email,
                elementsAccess,
                batchInfo: {
                    batchUsername: batchDetails.username,
                    batchName: batchDetails.name,
                    batchId: batchDetails.id,
                },
                facultyInfo: {
                    facultyUsername: facultyDetails.username,
                    facultyName: facultyDetails.name,
                    facultyId: facultyDetails.id
                }
            }
        } catch (e) {
            console.log("Local error ", e);
        }
    },

    register: async (args, req) => {

    },
    trialLogin: async (args, req) => {
        const {email, prn} = args;

        let query = `select faculty_username from arcticFox.faculties where faculty_username= 'polytechnic' `;
        conn.query(query, (err, result, fields) => {
            if (err) throw err;
            console.log(typeof (result[0].faculty_id));
        });

        return {
            prn: prn,
            email: email,
            batch_id: prnData.batch_id,
            faculty_id: prnData.faculty_id
        }
    },
}