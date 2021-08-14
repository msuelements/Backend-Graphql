const CredentialsConfig = require("../config/credentials");
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CredentialsConfig.GOOGLE_CLIENT_ID);

const GoogleSignIn = async (token) => {
   const verify = async () => {
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
        const payload = await verify;
        const userData = {
            name: payload['name'],
            avatar: payload['picture'],
            id: payload['sub'],
            email_verified: payload['email_verified'],
            email: payload['email']
        }
        return userData;

    }catch(e){
        throw new Error(
            'Error while authenticating Google User: ' + JSON.stringify(e)
        );
    }
}

module.exports = GoogleSignIn;
