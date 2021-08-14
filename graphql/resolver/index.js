import trialResolver from "./TrialResolver.js";
import GoogleAuth from "./GoogleAuth.js";
import LoginAuth from "./LoginAuth.js";

const root = {
    ...trialResolver,
    ...LoginAuth
};

export default root;