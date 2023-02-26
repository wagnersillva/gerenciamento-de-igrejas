import React from 'react'
import {List as ListAnt, Popover} from "antd";

export default function TruncateEllipsisPopoverList({ min, list, title }){
    const string = list.join(", ")
    if(string?.length < min) return string

    const stringEllipsis = `${string.substring(0, min)}...`;

    return (
        <Popover content={<RenderItemPopover list={list} title={title} />}>
            {stringEllipsis}
        </Popover>
    )
}

function RenderItemPopover({ list, title }){
    return (
        <div style={{maxHeight: "250px", overflowY: "scroll"}}>
            <ListAnt
                header={
                    <h4 style={{fontWeight: "bold"}}>
                        {title}
                    </h4>
                }
                dataSource={list}
                renderItem={
                    item =>
                        <ListAnt.Item style={{ padding: 5 }}>
                            {item}
                        </ListAnt.Item>
                }
            />
        </div>
    )
}