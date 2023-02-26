import axios from "axios";

const otherAPI = axios.create({
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
    }
});


export default otherAPI;