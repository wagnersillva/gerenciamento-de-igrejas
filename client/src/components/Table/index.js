import React from 'react';
import {Button, Popconfirm, Space, Spin, Table} from "antd";
import {BsFillTrashFill, BsPencilSquare} from "react-icons/bs";
import {getMessage} from "../../i18n";
import "./style.css";
import {useSelector} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons";

export default function CustomTable({ columns, actions, data, i18n, total, onChangePagination }){

    const { error, loading } = useSelector(store => store.globalReducer );

    const renderDestroy = (actions, object) => actions.destroy && (
        <Popconfirm title="Deseja realmente excluir o registro?" disabled={object.disabledDelete} okText="Sim" cancelText="Não" onConfirm={() => actions.destroy(object)}>
            <Button disabled={object.disabledDelete}>
                <BsFillTrashFill cursor={"pointer"} />
            </Button>
        </Popconfirm>
    )

    const renderEdit = (actions, object) => actions.edit && (
        <Button onClick={() => actions.edit(object)} disabled={object.disabledUpdate} >
            <BsPencilSquare cursor={"pointer"} />
        </Button>
    )

    const getActions = () => {
        if(!actions) return []
        return {
            width: 150,
            className: "column-actions",
            title: getMessage("table.action.label"),
            key: 'action',
            fixed: 'right',
            render: (_, record) => (
                <Space size="middle" style={{ display: "flex", justifyContent: "center"}}>
                    {renderEdit(actions, record)}
                    {renderDestroy(actions, record)}
                </Space>
            )
        }
    }

    const getColumns = () => {
        return columns.map ( column => ({
            ...column,
            title: getMessage(i18n + column.title)
        }))
    }

    const tableColumns = [
        ...getColumns(),
        getActions()
    ]

    const spinProps = { className: "loading-table", spinning: loading, indicator: <LoadingOutlined spin /> }
    const paginationProps = { onChange: onChangePagination, total }
    const dataSourceProps = data?.length ? data : []

    return <Table scroll={{ x: 1000 }} loading={spinProps} pagination={paginationProps} columns={tableColumns} dataSource={dataSourceProps} />
}