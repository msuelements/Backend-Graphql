import passport from "passport";
import PassportStrategy from "passport-google-oauth2";
const GoogleStrategy = PassportStrategy.Strategy;
const GOOGLE_CLIENT_ID = "90654341856-v41411r6k8o5u90jeeq67u8pu9dchfon.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "rvfbXHuyhdrJDEVftk1fZszs";

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/callbackgoogle",
        passReqToCallback: true,
    },
    function(request, accessToken, refreshToken, profile, done) {
        console.log(accessToken,refreshToken);
        return done(null, profile);
    }));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});