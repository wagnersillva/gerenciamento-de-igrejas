import React from 'react';
import CustomTable from "../../../components/Table";

export default function Content({ columns, i18n, actions, data, total }){
    return (
        <CustomTable columns={columns} i18n={i18n} actions={actions} data={data} total={total} />
    )
}