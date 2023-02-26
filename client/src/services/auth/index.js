import api from "../api";

export const authServices = {
    login: (payload) => api.post("auth/login", { ...payload }).then(response => {
        api.setAuth(response);
        return response;
    }),
    updatePasswordFirstLogin: (payload) => api.put(`auth/changed-password/${payload.id}`, { ...payload }),
    changeChurch: (churchId) => api.put("auth/change-church", {churchId}).then(() => window.location.reload())
}