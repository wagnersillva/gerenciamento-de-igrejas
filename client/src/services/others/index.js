import api from "../otherAPI";

export const utilsService = {
    getCepInfo: (value) => api.get(`https://viacep.com.br/ws/${value}/json/`),
    getStates: () => api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`),
    getCityList: (value) => api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${value}/municipios`),
}