import React from 'react';
import {Col, DatePicker, Form, Input, Row, Select, Transfer, Typography} from "antd";
import TransferCustom from "./TransferCustom";
import DynamicPhone from "../DinamycPhone";
import DynamicDocument from "../DynamicDocument";
import {MaskedInput} from "antd-mask-input";
import {stylesInputs} from "../../../utils/defaultStyles";

const datePickerFormatter = {
    dateFormat: 'DD/MM/YYYY',
    weekFormat: 'DD/MM',
    monthFormat: 'MM/YYYY',
}

export default function InputGroup({ fields, title, ...rest }) {
    if(!fields?.length) return null;

    if(Array.isArray(fields[0])){
        return (
            <RenderContent title={title}>
                {fields?.map((subFields, key) => {
                    return (
                        <Row gutter={24} >
                            <ColsFormItems key={`colsFormItem-${key}`} fields={subFields} {...rest} />
                        </Row>
                    )
                })}
            </RenderContent>
        )
    } else if(fields) {
        return (
            <RenderContent title={title}>
                <Row gutter={24} >
                    <ColsFormItems fields={fields} {...rest} />
                </Row>
            </RenderContent>
        )
    }
}

function RenderContent({ title, children }){
    return (
        <>
            {title && (
                <Row>
                    <Typography.Title className={'text-color-primary'}  level={4}> {title} </Typography.Title>
                </Row>
            )}
            {children}
        </>
    )
}

function ColsFormItems({ fields, ...rest }){
    return fields?.map((field, key) =>{
        return <FormItem key={`formItem-${field.name}-${key}`} field={field} {...rest} />
    })
}

function FormItem({ field, ...rest }){
    const { size = "large", type = "text", span, name, label, placeholder, rules = [], ...others } = field;
    const [ lg = 6, md = 12, xs = 24 ] = span
    let typeInput = getTypeInput(type);
    const additionalRules = getAdditionalRules(type)

    return (
        <Col lg={lg} md={md} xs={xs}>
            <Form.Item name={name} rules={[...rules, ...additionalRules]} label={label}>
                <SwitchInput size={size} type={typeInput} placeholder={placeholder} {...others} {...rest} />
            </Form.Item>
        </Col>
    )
}

function SwitchInput({ type, size, format, ...rest }){
    if(type === 'text'){
        return <Input {...rest} size={size} />
    } else if(type === 'date'){
        return <DatePicker {...rest} size={size}  format={datePickerFormatter[format || "dateFormat"]} />
    } else if( type === 'select'){
        const { seletor, data } = rest
        const list = data[seletor.identifier]?.map( el => ({ key: el[seletor.key || "value"], value: el[seletor.value || "label"]}))
        return (
            <Select { ...rest } size={size}>
                {list?.map((option, key) => {
                    return <Select.Option key={`select-option-${key}`} value={option.key}>{option.value}</Select.Option>
                })}
            </Select>
        )
    } else if( type === 'phone'){
        return <DynamicPhone {...rest} size={size} />
    } else if( ['cpf', 'rg'].includes(type)){
        return <DynamicDocument {...rest} size={size} />
    } else if( type === 'cep'){
        return <MaskedInput {...rest} size={size} mask={'00000-000'}/>
    }
}

function getTypeInput(type){
    switch (type){
        case 'text':
        case 'email':
        case 'username':
            return 'text';
        default:
            return type
    }
}

function getAdditionalRules(type){
    const rules = [];
    switch (type){
        case 'email':
            rules.push(...defaultRules.email);
            break;
        case 'username':
            rules.push(...defaultRules.username);
            break;
        case 'phone':
            rules.push(...defaultRules.phone)
            break;
        case 'cpf':
            rules.push(...defaultRules.cpf)
            break;
        case 'rg':
            rules.push(...defaultRules.rg)
            break;
        case 'cep':
            rules.push(...defaultRules.cep)
            break;
        default:
    }

    return rules;
}

const defaultRules = {
    phone: [{ pattern: /\([1-9]{2}\) [9]{0,1}[1-9]{1}[0-9]{3}-[0-9]{4}$/, message: "Telefone com formato inválido"}],
    email: [{ type: 'email' }],
    username: [{ max: 16, message: 'Não pode ser maior que 16 caracteres'}, { min: 4, message: "Não pode ser menor que 4 caracteres"}],
    cpf: [{ pattern: /(^\d{3}\.\d{3}\.\d{3}-\d{2}$)/, message: "CPF com formato inválido"}],
    rg: [{ pattern: /(^\d{2}\.\d{3}\.\d{3}-\d{1}$)/, message: "RG com formato inválido"}],
    cep: [{ pattern: /(^[0-9]{5})-?([0-9]{3}$)/, message: "CEP com formato inválido"}],
}