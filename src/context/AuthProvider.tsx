import React from 'react'
import { createContext, useState } from "react";
import { IAuth } from '../models';

const AuthContext = createContext({
    auth: {
        user: {},
        accessToken: "",
        roles: Array()
    },
    setAuth: (auth: IAuth) => {},
    persist: "",
    setPersist: (persist: string) => {},
});

export const AuthProvider = ({children}: { children: React.ReactNode }) => {

    const [auth, setAuth] = useState<IAuth>({
        user:{},
        roles:[],
        accessToken: ""
    });

    const [persist, setPersist] = useState<string>(JSON.parse(localStorage.getItem("persist") || "") || false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;