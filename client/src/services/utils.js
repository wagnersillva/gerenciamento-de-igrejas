import api from "./api";

export const getDefaultMethods = (module) => {
    return {
        list: (params) => api.get(module, { params: { ...params } }),
        prepareEdit: (id) => api.get(`${module}/prepare-edit/${id}`),
        prepareSave: () => api.get(`${module}/prepare-save`),
        save: (values) => api.post(`${module}`, { ...values }),
        update: (values) => {
            const { id, ...data } = values
            return api.put(`${module}/${id}`, { ...data })
        },
        destroy: (id) => api.delete(`${module}/${id}`),
    }
}