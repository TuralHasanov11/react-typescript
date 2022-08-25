import React from 'react'
import { createContext, useState } from "react";
import { IAuth, IAuthContext } from '../models';

const AuthContext = createContext<IAuthContext>({
    auth: {
        user: {},
        accessToken: ""  
    },
    // persist: "",
    // setPersist: ()=>{}
});

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<IAuth>({
        user:{},
        roles:[],
        accessToken: ""
    });

    const [persist, setPersist] = useState<string>(JSON.parse(localStorage.getItem("persist") || "") || false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;