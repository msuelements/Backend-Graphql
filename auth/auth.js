const GoogleSignIn = require("./google_auth");
const JWT = require("./jwt");

const GoogleAuth = async (token) => {
    try{
        const userInfo = await GoogleSignIn(token);
        const newToken = JWT.generateToken(userInfo);
        userInfo.access_token = JWT.sign(newToken,JWTsecret);
        const datetime = new Date();
        return  {
            rg_name: userInfo.name,
            rg_email: userInfo.email,
            rg_type: 'google',
            rg_social_token: token,
            rg_access_token: userInfo.access_token,
            rg_picture: userInfo.pic,
            rg_created_at: datetime,
            rg_social_id: userInfo.id,
        }
    }catch (e) {
        throw e;
    }
}

