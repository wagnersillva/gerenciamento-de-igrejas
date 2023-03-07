import React from "react";
import {UserOutlined} from "@ant-design/icons";

export default function CardInformation(){
    return (
        <div className={'card-information'}>
            <div className={'card-information-icon'}>
                <UserOutlined />
            </div>
            <div className={'card-information-content'}>
                <div className={'card-information-content-title'}>
                    Membros
                </div>
                <div className={'card-information-content-value'}>
                    20
                </div>
            </div>
        </div>
    )
}