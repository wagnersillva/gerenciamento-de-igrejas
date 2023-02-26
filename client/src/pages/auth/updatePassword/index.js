import {Button, Col, Form, Input, notification, Row, Space, Tooltip} from 'antd';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updatePasswordFirstLoginRequest} from "../../../store/modules/auth/action";
import {getMessage} from "../../../i18n";
import "../style.css";
import {InfoCircleFilled} from "@ant-design/icons";
import {getUser} from "../../../security/auth";
import {useNavigate} from "react-router-dom";

export default function UpdatePassword(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLogged } = useSelector(store => store.authReducer);

    const user = getUser()

    useEffect(() => {
       if(user && user.password_changed) navigate("/");
    }, [])

    useEffect(() => {
        if(isLogged) {
            notification.success({
                message: "Senha alterada com sucesso!",
                duration: 1.5,
                onClose: () => window.location = '/'
            });
        }
    }, [isLogged])

    const onFinish = (values) => {
        dispatch(updatePasswordFirstLoginRequest({...values, id: user?.id}))
    };

    return (
            <Row justify={"center"} className={"login-wrapper"}>
                <Col span={12} className={"login-wrapper-container"}>
                    <Space style={{
                        marginBottom: 60,
                        width: "max-content",
                        marginLeft: "50%",
                        transform: "translateX(-50%)",
                        cursor: "pointer"
                    }} direction={'vertical'}>
                        <Tooltip title={"No primeiro acesso, é necessário alterar a senha!"}>
                            <InfoCircleFilled />
                            <span style={{fontWeight: "bold", fontSize: 14, marginLeft: 10}}>
                                Alteração de senha
                            </span>
                        </Tooltip>
                    </Space>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout={"vertical"}
                    >
                        <Row gutter={24} justify={"center"} style={{ marginBottom: 15}}>
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
                        <Row gutter={24} justify={"center"}>
                            <Col span={24}>
                                <Form.Item
                                    name="confirmPassword"
                                    rules={[
                                        { required: true, message: 'Por favor, informe a senha!',},
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Senhas não conferem'));
                                            },
                                        })
                                    ]}
                                >
                                    <Input.Password placeholder={"Confirmar senha"} size={"large"}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24} justify={"end"} style={{ marginTop: "25px"}}>
                            <Col span={24}>
                                <Form.Item>
                                    <Button className={"btn-primary-success"} type="primary" size={"large"} style={{ borderRadius: "25px", minWidth: "100%" }} htmlType="submit">
                                        {getMessage("comum.confirmar.label")}
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
    );
};