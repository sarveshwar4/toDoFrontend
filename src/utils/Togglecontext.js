import { createContext } from "react";

const UserContext = createContext({
    user:{
        color : "dark",
    },
});

export default UserContext;