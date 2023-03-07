import React, { useState} from 'react';
import {Transfer} from "antd";

export default function TransferCustom({ targetKeys, setTargetKeys, selectedKeys, onChange, onSelectChange, dataSource, titles, onScroll, render }){
    const [targetKeysDefault, setTargetKeysDefault] = useState([]);
    const [selectedKeysDefault, setSelectedKeysDefault] = useState([]);

    const onChangeDefault = (nextTargetKeys, direction, moveKeys) => {
        setTargetKeys(nextTargetKeys);
    };
    const onSelectChangeDefault = (sourceSelectedKeys, targetSelectedKeys) => {
        setSelectedKeysDefault([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    return (
        <Transfer
            dataSource={dataSource || []}
            titles={titles}
            targetKeys={targetKeys || targetKeysDefault}
            selectedKeys={selectedKeys || selectedKeysDefault}
            onChange={onChange || onChangeDefault}
            onSelectChange={onSelectChange || onSelectChangeDefault}
            onScroll={onScroll}
            render={render}
        />
    );
}