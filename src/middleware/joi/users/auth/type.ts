import { Schema } from "joi";

// --------------------------------------------------------
// Users joi validateion interface
// --------------------------------------------------------

interface UserJoi {
    signup: Schema;
    signin: Schema;
}

// --------------------------
// Export UserJoi
// --------------------------
export default UserJoi;
