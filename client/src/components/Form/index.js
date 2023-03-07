import React from 'react';
import {Button, Col, Form, Row} from "antd";
import LoadingDefault from "../LoadingDefault";
import {getMessage} from "../../i18n";

export default function FormContainer({ children, form, onFinish, loading = false, propsBtnSave, propsBtnCancel }){

    function RenderButton({ span = 4, label, ...rest }){
        return (
            <Col span={span}>
                <Form.Item>
                    <Button {...rest}>{getMessage(label)}</Button>
                </Form.Item>
            </Col>
        )
    }

    function ButtonSave(){
        const { className = "btn-primary-success", style = { borderRadius: "25px", minWidth: "100%" }, type = "primary", size = "large", label = "comum.salvar.label", show } = propsBtnSave;
        const props = { className, style, type, size, label }
        return show && ( <RenderButton htmlType="submit" {...props} />)
    }

    function ButtonCancel(){
        const { className = "btn-secondary-cancel", style = { borderRadius: "25px", minWidth: "100%", lineHeight: "42px" }, type = "primary", size = "large", href = null, label = "comum.cancel.label", show } = propsBtnCancel;
        const props = { className, style, type, size, label, ...( href && {href}) }
        return show && ( <RenderButton {...props} />)
    }

    function Buttons(){
        return (propsBtnSave.show || propsBtnCancel.show) && (
            <Row  gutter={24} justify={"end"} style={{ marginTop: "25px" }}>
                <ButtonSave />
                <ButtonCancel />
            </Row>
        )
    }

    return (
        <LoadingDefault loading={loading}>
            <Form layout="vertical" style={{ marginTop: "15px" }} form={form} onFinish={onFinish}>
                {children}
                <Buttons />
            </Form>
        </LoadingDefault>
    )
}