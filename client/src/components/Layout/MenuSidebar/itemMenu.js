import React from "react";
import {
    DatabaseOutlined
} from "@ant-design/icons";

const prefixDefaultPermission = ["read", "edit", "delete", "create"];

const getFullLabelPermission = (session) => prefixDefaultPermission.map( permission => `${permission}-${session}`);

const getFormatRoute = (label, key, icon, children) => ({label, key, icon, children});
const getFormatSessionRoute = (label, key, icon, session, extraPermission = []) => ({
    ...getFormatRoute(label, key, icon),
    permissions: [...getFullLabelPermission(session), ...extraPermission]
});

const listItemMenu = [
    getFormatRoute('Pessoas', 'people', <DatabaseOutlined />, [
        getFormatSessionRoute('Dashboard', 'members', null, 'dashboard-user'),
        getFormatSessionRoute('Membros', 'members', null, 'user', ["read-user-details"]),
        getFormatSessionRoute('C. Membro', 'card-member', null, 'user', ["read-user-details"]),
        getFormatSessionRoute('C. Apresentação', 'cover-letter', null, 'user', ["read-user-details"]),
    ]),
    getFormatRoute('Secretaria', 'secretary', <DatabaseOutlined />, [
        getFormatSessionRoute('Secretarios', 'secretaries', null, 'secretary'),
        getFormatSessionRoute('Cargos', 'church-jobs', null, 'church-job'),
        getFormatSessionRoute('Igrejas', 'churches', null, 'church'),
    ]),
    getFormatRoute('Estudos', 'study', <DatabaseOutlined />, [
        getFormatSessionRoute('Dashboard', 'study', null, 'dashboard-study'),
        getFormatSessionRoute('Professores', 'teachers', null, 'study'),
        getFormatSessionRoute('Alunos', 'students', null, 'study'),
        getFormatSessionRoute('Salas', 'classes', null, 'study'),
        getFormatSessionRoute('Presença', 'presence', null, 'study'),
    ]),
    getFormatRoute('Financeiro', 'financeiro', <DatabaseOutlined />, [
        getFormatSessionRoute('Tesoureiros', 'treasurers', null, 'finance'),
        getFormatSessionRoute('Dashboard', 'cargos', null, 'finance'),
        getFormatSessionRoute('Receitas', 'cargos', null, 'finance'),
        getFormatSessionRoute('Despesas', 'igrejas', null, 'finance'),
    ]),
];

export {
    listItemMenu
};