// import React from 'react'
// import {Breadcrumb} from "antd";
// import { Link } from "react-router-dom";
//
// export default function LayoutBreadcrumb({ items }){
//     return (
//         <Breadcrumb style={{ margin: '16px 0', }}>
//             { items?.map ((item, index, arr) => {
//                 const { href, label } = item
//                 // const last = arr.at(-1)
//                 return (
//                     <Breadcrumb.Item href={ label.toLowerCase() }>
//                         { href ? <Link to={href}> { label }</Link> : label }
//                     </Breadcrumb.Item>
//                 )
//             })}
//         </Breadcrumb>
//     )
// }