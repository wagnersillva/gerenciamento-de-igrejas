// AJUSTAR PARA USAR .ENV
// SERVER URL PROVISÓRIO
const getServcer = (prod) => prod ? 'https://api.church-management-sys.app' : 'http://127.0.0.1:8000'
const getClient = (prod) => prod ? 'https://gerenciamento-de-igrejas.vercel.app/' : 'http://127.0.0.1:3000'

export const SERVER_URL = getServcer(false);
export const CLIENT_URL = getClient(false);