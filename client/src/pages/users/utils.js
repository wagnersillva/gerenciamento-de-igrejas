import React from "react";
import {getMessage} from "../../i18n";
import {messageNotDataColumnTable} from "../../utils/functions";

export const breadcrumbList = [
    { label: getMessage("secretaria.label") },
    { path: "/secretaria/membros", label: getMessage("secretaria.membros.label") }
]

export const breadcrumbForm = [
    ...breadcrumbList,
    { label: getMessage("secretaria.form.label") },
]

export const configTable = {
    i18n: "table.users.",
    columns: [
        {
            title: 'name',
            dataIndex: 'first_name',
            key: 'name',
            render: (text, object) => <>{object.first_name} {object.last_name ?? null}</>,
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
            render: (email) => messageNotDataColumnTable(email),
        },
        {
            title: 'phone',
            dataIndex: 'phone',
            key: 'phone',
            render: (email) => messageNotDataColumnTable(email),
        },
        {
            title: 'username',
            dataIndex: 'username',
            key: 'username',
            render: (username) => messageNotDataColumnTable(username),
        },
        {
            title: 'cargo',
            key: 'church_job',
            dataIndex: 'church_job',
            render: (_, record) => record.church_job && ( record.church_job.title )
        }
    ]
}