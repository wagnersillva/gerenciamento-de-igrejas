import React, {useEffect} from 'react';
import {Form} from "antd";
import InputGroup from "../../../components/FormContainer/InputGroups";
import {fields} from "./utils";
import {useSelector} from "react-redux";
import FormContainer from "../../../components/FormContainer";

export default function Content({ save, id }){
    const { churchJob} = useSelector(store => store.churchJobReducer );
    const [ form ] = Form.useForm();

    useEffect(() => {
        if(id) form.setFieldsValue(churchJob);
    }, [churchJob, form, id]);

    const resetFields = () => !id && form.resetFields();

    function onFinish(values){
        if(id) values.id = id;
        save(values);
        resetFields();
    }

    return (
        <FormContainer loading={false} form={form} onFinish={onFinish} propsBtnSave={{ show: true }} propsBtnCancel={{ show: true, href: id ? "../../cargos/" :  "../cargos/"}}>
            <InputGroup fields={fields} />
        </FormContainer>
    )
}