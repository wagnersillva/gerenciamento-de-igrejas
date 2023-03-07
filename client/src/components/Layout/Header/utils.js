import {Menu, Spin} from "antd";
import React from "react";
import {logout} from "../../../security/auth";
import {CLIENT_URL} from "../../../config";
import LoadingDefault from "../../LoadingDefault";

export const goToProfile = (user) => {
    window.location = `${CLIENT_URL}/secretaria/membros/form/${user?.id}`;
}

export const goToFormChurch = () => {
    window.location = `${CLIENT_URL}/secretaria/igrejas/form`;
}

const handleMenuAccountClick = (e, user) => {
    switch (e.key){
        case "1":
            goToProfile(user);
            return;
        case "2":
            logout();
            return;
        default:
            return
    }
};

export const menuAccount = (user) => (
    <Menu
        onClick={(e) => handleMenuAccountClick(e, user)}
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

const handleMenuChurchClick = (e, changeChurch, closeDropdown) => {
    switch (e.key){
        case "new_church":
            goToFormChurch();
            break;
        default:
            changeChurch(+e.key);
            closeDropdown()
    }
};

export const menuChurch = (items, changeChurch, closeDropdown) => (

        <Menu
            onClick={(e) => handleMenuChurchClick(e, changeChurch, closeDropdown)}
            items={items}
        />

);