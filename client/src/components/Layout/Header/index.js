import React, {useState} from 'react';
import {Header} from "antd/es/layout/layout";
import {getUser, logout} from "../../../security/auth";
import {Button, Dropdown, Menu} from "antd";
import {CLIENT_URL} from "../../../config";
import DropdownAccount from "./DropdownAccount";
import DropdownChurch from "./DropdownChurch";
import {DoubleLeftOutlined} from "@ant-design/icons";
import "./style.css";

export default function LayoutHeader({setCollapsed, collapsed}){
    const [openDropdownAccount, setOpenDropdownAccount] = useState(false);
    const [openDropdownChurch, setOpenDropdownChurch] = useState(false);

    const user = getUser();

    const goToProfile = () => {
        window.location = `${CLIENT_URL}/secretaria/membros/form/${user?.id}`;
    }

    const handleMenuClick = (e) => {
        switch (e.key){
            case "1":
                goToProfile();
                break;
            case "2":
                logout();
                break;
            default:
                return
        }
    };

    const handleOpenChangeDropdown = (flag, dropdownAccount = true) => {
        if(dropdownAccount){
            setOpenDropdownAccount(flag);
        } else {
            setOpenDropdownChurch(flag)
        }
    };

    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: 'Meu perfil',
                    key: '1'
                },
                {
                    label: 'Sair',
                    key: '2',
                },
            ]}
        />
    );

    return (
        <Header
            className="site-layout-background layout-header"
            style={{ padding: 0 }}
        >
            <div className={'header-icon-collapse'}>
                <Button onClick={() => setCollapsed(!collapsed)} icon={<DoubleLeftOutlined style={{ transition: "0.3s", rotate: collapsed ? "180deg" : "0deg" }} />} />
            </div>
            <div className={'header-actions'}>
                <DropdownChurch
                    open={openDropdownChurch}
                    handleOpenChange={(flag) => handleOpenChangeDropdown(flag, false)}
                    user={user}
                />
                <DropdownAccount
                    open={openDropdownAccount}
                    handleOpenChange={handleOpenChangeDropdown}
                    user={user}
                />
            </div>
        </Header>
    )
}