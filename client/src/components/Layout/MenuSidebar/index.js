import React from "react";
import {Menu} from "antd";
import { listItemMenu } from "./itemMenu";
import {getPermissions} from "../../../security/auth";
import {useNavigate} from "react-router-dom";

export default function MenuSidebar(){
    const navigate = useNavigate();
    const userPermissions = getPermissions();

    function containSomePermission(permissions){
        return permissions.some( permission => userPermissions?.includes(permission))
    }

    function getItemMenu(){
        const filteredList = [];

        listItemMenu?.forEach( item => {
            const children = item?.children?.filter ( child => containSomePermission(child.permissions))
            if(children.length){
                filteredList.push({...item, children});
            }
        })

        return filteredList;
    }

    const onClick = (e) => {
        const { keyPath } = e
        const link = keyPath.reverse().join("/");
        navigate(`/${link}`);
    };

    return <Menu onClick={onClick} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={getItemMenu()} />
}