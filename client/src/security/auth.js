import api from "../services/api";
import {now} from "moment";

const getItem = (name) => localStorage.getItem(name)
const setItem = (name, value) => localStorage.setItem(name, value)
const removeItem = (name) => localStorage.removeItem(name)


const getToken = () => getItem('token');

const getUser = () => {
    let user = getItem('user')
    return user ? JSON.parse(user) : {}
};

const getPermissions = () => getUser()?.permissions;

const verifyToken = () => {
    if(!getToken()) return Promise.resolve({ tokenValid: false });
    return
}

const logout = () => {
    removeItem("user");
    removeItem("token");
    window.location = "/";
}

export {
    getToken,
    getPermissions,
    verifyToken,
    getUser,
    logout
}