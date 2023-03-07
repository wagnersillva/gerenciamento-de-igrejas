import React from 'react'
import {Button, PageHeader, Space, Typography} from "antd";
import LayoutBreadcrumb from "../Breadcrumb";
import {getMessage} from "../../../i18n";
import "./style.css";
import {useNavigate} from "react-router-dom";
import {getPermissions} from "../../../security/auth";

export default function LayoutContent({ module, title, newRegister, breadcrumb, footer, children }){

    const navigate = useNavigate();
    const { Title } = Typography;

    const permissions = getPermissions();

    const canCreateRegister = permissions?.includes(`create-${module}`);

    function btnNewRegister(){
        return (
            <Button
                className={"btn-primary-success"}
                type="primary"
                size={"large"}
                style={{ borderRadius: "25px", minWidth: "150px" }}
                onClick={() => navigate(newRegister)}
            >
                {getMessage("comum.novo.label")}
            </Button>
        )
    }

    function getFooter(){
        return (
            <Space style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <LayoutBreadcrumb items={breadcrumb} />
                { newRegister && canCreateRegister && <Space> {btnNewRegister()} </Space> }
            </Space>
        )
    }

    return (
        <>
            <PageHeader
                style={{ marginBlock: "15px" }}
                footer={getFooter()}
            />
            <div className="site-layout-background" style={{ padding: 24 }}>
                <Space>
                    <Title className={'text-color-primary'} level={2} style={{ color: "#606060" }}>{title}</Title>
                </Space>
                { children }
            </div>
        </>
    )
}