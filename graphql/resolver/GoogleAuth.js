import {OAuth2Client} from "google-auth-library";
import CredentialsConfig from "../../config/credentials.js";
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

    try{
        const payload = await verify(token);
        return {
            name: payload['name'],
            avatar: payload['picture'],
            id: payload['sub'],
            email_verified: payload['email_verified'],
            email: payload['email']
        }

    }catch(e){
        throw new Error(
            'Error while authenticating Google User: ' + JSON.stringify(e)
        );
    }
}

export default {
    // login: async (args,req) => {
    //     const {token} = args;
    //     try{
    //          const userInfo = await GoogleSignIn(token);
    //          console.log("Console Log UserInfo: ",userInfo)
    //          return {
    //              name: userInfo.name,
    //              avatar: userInfo.avatar,
    //              id: userInfo.id,
    //              email_verified: userInfo.email_verified,
    //              email: userInfo.email
    //
    //          };
    //     }catch(e){
    //         console.log(e);
    //     }
    // },

}