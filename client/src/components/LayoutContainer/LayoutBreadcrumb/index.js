import React from 'react'
import {Breadcrumb} from "antd";
import { Link } from "react-router-dom";

export default function LayoutBreadcrumb({ items }){
    return (
        <Breadcrumb>
            { items?.map ((item, index, arr) => {
                const { path, label } = item
                const last = (arr.length-1) === index;
                return (
                    <Breadcrumb.Item key={index+label}>
                        { path && !last ? <Link to={path}> { label }</Link> : label }
                    </Breadcrumb.Item>
                )
            })}
        </Breadcrumb>
    )
}