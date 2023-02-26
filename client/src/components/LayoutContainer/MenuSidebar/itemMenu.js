import React from "react";
import {
    DatabaseOutlined,
    SafetyOutlined
} from "@ant-design/icons";
import {BsBriefcase, BsFillShieldLockFill, BsPeople} from "react-icons/bs";
import {TbBuildingChurch} from "react-icons/tb";

const prefixDefaultPermission = ["read", "edit", "delete", "create"];

const getFullLabelPermission = (session) => prefixDefaultPermission.map( permission => `${permission}-${session}`);

const getFormatRoute = (label, key, icon, children) => ({label, key, icon, children});
const getFormatSessionRoute = (label, key, icon, session, extraPermission = []) => ({
    ...getFormatRoute(label, key, icon),
    permissions: [...getFullLabelPermission(session), ...extraPermission]
});

const listItemMenu = [
    getFormatRoute('Secretaria', 'secretaria', <DatabaseOutlined />, [
        getFormatSessionRoute('Membros', 'membros', <BsPeople />, 'user', ["read-user-details"]),
        getFormatSessionRoute('Cargos', 'cargos', <BsBriefcase />, 'church-job'),
        getFormatSessionRoute('Igrejas', 'igrejas', <TbBuildingChurch />, 'church'),
    ]),
    getFormatRoute('Segurança', 'seguranca', <SafetyOutlined />, [
        getFormatSessionRoute('Perfis', 'perfil', <BsFillShieldLockFill />, 'role')
    ]),
];

export {
    listItemMenu
};