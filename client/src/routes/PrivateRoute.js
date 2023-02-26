 import React, {useEffect, useState} from "react";
import {getToken, getUser} from "../security/auth";
import {useDispatch} from "react-redux";
import api from "../services/api";
 import {stopAuthLoading, startAuthLoading} from "../store/modules/auth/action";

function PrivateRoute({ element }) {
    const dispatch = useDispatch();

    const [auth, setAuth] = useState(false);
    const [isTokenValidated, setIsTokenValidated] = useState(false);

    const redirectToLogin = () => window.location = "/auth/login";
    const redirectToChangePassword = () => window.location = "auth/change-password";

    useEffect(() => {
        let token = getToken()

        if (token) {
            api.get('auth/check', { headers: { Authorization: `Bearer ${token}` } })
                .then( response => {
                    const { permissions, tokenValid, password_changed, churches, church_logged, id } = response?.data?.data;
                    if(!tokenValid) redirectToLogin();

                    localStorage.setItem('user', JSON.stringify({
                        ...getUser(),
                        church_logged,
                        churches,
                        permissions,
                        id
                    }));

                    if(!password_changed) redirectToChangePassword();

                    setAuth(tokenValid);
                })
                .catch(() => {
                    redirectToLogin();
                })
                .finally( () => {
                    setIsTokenValidated(true)
                    dispatch(stopAuthLoading())
                })
        } else {
            setIsTokenValidated(true); // in case there is no token
            redirectToLogin();
        }

    }, [])


    const loading = !isTokenValidated;

    return element
}

export { PrivateRoute };