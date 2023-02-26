import React from "react";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";
import "./style.css"

const LoadingDefault = ({ children, loading, privateRoute = false,  suspense = false }) => {
    const className = suspense ? "spinner-suspense" :  privateRoute ? "spinner-private-route" : ""

    return (
        <Spin className={className} spinning={loading} indicator={<LoadingOutlined spin />}>
            {children}
        </Spin>
    )
}

export default LoadingDefault;