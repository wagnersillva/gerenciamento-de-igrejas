import React, {useEffect, useState} from 'react';
import {Col, Form, Row, Transfer} from "antd";

export default function TransferPermission({ dataSource, initialValues }){

    const [targetKeys, setTargetKeys] = useState(initialValues);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const onChange = (nextTargetKeys, direction, moveKeys) => {
        console.log('targetKeys:', nextTargetKeys);
        console.log('direction:', direction);
        console.log('moveKeys:', moveKeys);
        setTargetKeys(nextTargetKeys);
    };
    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        console.log('sourceSelectedKeys:', sourceSelectedKeys);
        console.log('targetSelectedKeys:', targetSelectedKeys);
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };
    const onScroll = (direction, e) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
    };

    return (
        <Row>
            <Col span={24}>
                <Form.Item name={"permissions"}>
                    <Transfer
                        dataSource={dataSource}
                        titles={['Disponíveis', 'Selecionados']}
                        targetKeys={targetKeys}
                        selectedKeys={selectedKeys}
                        onChange={onChange}
                        onSelectChange={onSelectChange}
                        onScroll={onScroll}
                        render={(item) => item.title}
                    />
                </Form.Item>
            </Col>
        </Row>
    )
}