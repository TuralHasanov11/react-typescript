import React, { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";

import axios from '../api/axios';
import { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef<null | HTMLInputElement>(null);
    const errRef = useRef<null | HTMLParagraphElement>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [user, setUser] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');

    useEffect(() => {
        userRef.current?.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err: unknown) {
            const error = err as AxiosError
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current?.focus();
        }
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    {/*put router link here*/}
                    <a href="#">Sign Up</a>
                </span>
            </p>
        </section>
    )
}

export default Login