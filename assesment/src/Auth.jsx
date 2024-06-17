import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function Auth() {
    // const auth=localStorage.getItem("isAuth");
    const auth=true
    return auth ? <Outlet />:<Navigate to={"/login"} />
}

export default Auth;
