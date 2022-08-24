import React from 'react'
import { createContext, useState } from "react";
import { IAuth, IAuthContext } from '../models';

const AuthContext = createContext<IAuthContext>({
    auth: {} as IAuth,
    setAuth: ()=>{}
});

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<IAuth>({
        user:{},
        roles:[]
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;