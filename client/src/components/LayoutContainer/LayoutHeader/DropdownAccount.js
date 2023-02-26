import React from "react";
import {Dropdown} from "antd";
import {goToProfile, menuAccount} from "./utils";
import {MdAccountCircle} from "react-icons/md";

export default function DropdownAccount({ handleOpenChange, open, user}){
    return (
        <div className="user-account">
            <Dropdown trigger={["click"]} overlay={menuAccount(user)} onOpenChange={handleOpenChange} open={open}>
                <div className="user-account-dropdown">
                    <div className="user-account-details">
                        <div className="user-account-name">
                                <span onClick={goToProfile}>
                                    {user?.first_name}
                                </span>
                        </div>
                        <div className="user-account-email">
                            {user?.email}
                        </div>
                    </div>
                    <div style={{ lineHeight: 0 }}>
                        <MdAccountCircle size={40} />
                    </div>
                </div>
            </Dropdown>
        </div>
    )
}