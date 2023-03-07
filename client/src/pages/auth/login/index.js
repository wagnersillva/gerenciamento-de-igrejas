import {Button, Col, Form, Input, notification, Row, Space, Spin, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loginRequest} from "../../../store/modules/auth/action";
import {getMessage} from "../../../i18n";
import Logo from "../../../images/church-logo-full.png";
import "../style.css"

export default function Login(){
    const { isLogged } = useSelector(store => store.authReducer);
    const { loading: loadingGlobal } = useSelector(store => store.globalReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if(isLogged) {
            notification.success({
                message: "Usuário logado com sucesso!",
                duration: 1.5,
                onClose: () => {
                    window.location = '/';
                }
            });
        }
    }, [isLogged])

    const onFinish = (values) => {
        dispatch(loginRequest(values))
    };

    return (
        <Row justify={"center"} className={"login-wrapper"}>
            <Col span={12} className={"login-wrapper-container"} style={{ maxWidth: "400px" }}>
                <Row style={{ marginBottom: "50px" }} justify={"center"}>
                    <Space direction={"vertical"} align={"center"}>
                        <img src={Logo} alt={'logo'} style={{ width: 200 }} />
                    </Space>
                </Row>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    layout={"vertical"}
                >
                    <Row gutter={24} justify={"center"} style={{ marginBottom: 15}}>
                        <Col span={24}>
                            <Form.Item
                                name="email"
                                rules={[
                                    { type: "email", required: true, message: 'Por favor, informe o username!'},
                                ]}
                            >
                                <Input placeholder={"Email"} size={"large"} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24} justify={"center"}>
                        <Col span={24}>
                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: 'Por favor, informe a senha!',},
                                ]}
                            >
                                <Input.Password placeholder={"Senha"} size={"large"}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24} justify={"end"} style={{ marginTop: "25px"}}>
                        <Col span={24}>
                            <Form.Item>
                                <Button
                                    loading={loadingGlobal}
                                    className={"btn-primary-success"}
                                    type="primary"
                                    size={"large"}
                                    style={{ borderRadius: "25px", minWidth: "100%" }}
                                    htmlType="submit"
                                >
                                    {getMessage("comum.entrar.label")}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
};