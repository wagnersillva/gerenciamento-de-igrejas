import React, {useEffect} from 'react';
import {Button, Col, Form, Row} from "antd";
import {getMessage} from "../../../i18n";
import InputGroup from "../../../components/FormContainer/InputGroups";
import {fields} from "./utils";
import {useSelector} from "react-redux";
import FormContainer from "../../../components/FormContainer";

export default function Content({ save, id }){
    const { permissions, role } = useSelector(store => store.roleReducer );
    const [ form ] = Form.useForm();

    const permissionsFilter = permissions?.map( permission => ({ ...permission, name: getMessage(`permissions.${permission.name}.label`)}));

    useEffect(() => {
        if(id){
            const { name: key, permissions: permissionsRole, ...toGet } = role;

            form.setFieldsValue({
                ...toGet,
                permissions: permissionsRole?.map(permission => permission.id),
                key
            });
        }
    }, [role, form, id]);

    const resetFields = () => !id && form.resetFields();

    function onFinish(values){
        if(id) values.id = id;
        save(values);
        resetFields();
    }

    return (
        <FormContainer form={form} onFinish={onFinish} propsBtnSave={{ show: true }} propsBtnCancel={{ show: true, href: id ? "../../perfil/" :  "../perfil/"}}>
            <InputGroup fields={fields} data={{ permissions: permissionsFilter }} />
        </FormContainer>
    )
}