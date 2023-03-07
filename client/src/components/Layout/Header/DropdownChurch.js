import React from "react";
import { useDispatch } from "react-redux";
import {Dropdown, Spin} from "antd";
import {menuChurch} from "./utils";
import {DownOutlined} from "@ant-design/icons";
import {changeChurchRequest} from "../../../store/modules/auth/action";

export default function DropdownChurch({ handleOpenChange, open, user}){
    const dispatch = useDispatch()
    const { churches, church_logged, is_admin, is_secretary } = user;
    const disabled = !is_admin && !is_secretary;
    console.log(is_admin, is_secretary)

    const itemsChurch = (churches || [])?.map( church => ({
        label: church.name,
        key: church.id
    }));

    const items = [
        ...itemsChurch,
        { type: 'divider', },
        {
            label: "Criar nova Igreja",
            key: "new_church"
        }
    ];

    const churchLogged = (churches || []).find( church => church?.id === church_logged);

    const changeChurch = (churchId) => {
        if(churchId !== churchLogged?.id ){
            dispatch(changeChurchRequest(churchId));
        }
    }

    return (
        <div className="church-choose">
            <Dropdown disabled={disabled} trigger={["click"]} overlay={menuChurch(items, changeChurch, handleOpenChange)} onOpenChange={handleOpenChange} open={open}>
                <div>
                    <span className={'church-choose-title'}>
                        Igreja
                    </span>
                    <div className="church-choose-dropdown">
                        <div style={{ lineHeight: 0 }}>
                            {churchLogged?.name}
                        </div>
                        <DownOutlined style={{ opacity: disabled ? 0 : 1, transition: "0.3s", rotate: `${ open ? "-180deg" : "0deg"}` }} />
                    </div>
                </div>
            </Dropdown>
        </div>
    )
}