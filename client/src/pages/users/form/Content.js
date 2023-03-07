import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row, Spin} from "antd";
import {getMessage} from "../../../i18n";
import InputGroup from "../../../components/Form/InputGroups";
import {useSelector} from "react-redux";
import moment from "moment";
import FormContainer from "../../../components/Form";
import {getUser} from "../../../security/auth";
import {stringToDate} from "../../../utils/format";
import {formFields, getFormFields} from "./utils";

export default function Content({ save, id, getCepInfoRequest, getCityList }){
    const { maritalStatus, ministerialPositions, roles, ecclesiasticalOffices, user, toResetFields } = useSelector(store => store.userReducer );
    const { loading } = useSelector(store => store.globalReducer );
    const { cepInfo, listState, listCity } = useSelector(store => store.utilsReducer );
    const [ form ] = Form.useForm();
    const [ isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [ disabledDataUsers, setDisabledDataUsers] = useState(false);

    const maritalStatusFilter = maritalStatus.map( marital => ({ ...marital, name: getMessage(`secretaria.membros.maritalStatus.${marital.name}.label`)}));
    const rolesFilter = roles.map( role => ({ ...role, name: role.name}));
    const ecclesiasticalOfficesFilter = ecclesiasticalOffices?.map( ecc => ({ ...ecc, name: ecc.title}));
    const genderList = [{ id: "M", name: "Masculino"}, { id: "F", name: "Feminino"}];


    useEffect(() => {
        if(id){
            const userLogged = getUser();
            const { birth, baptism_date, marital_status_id, roles: userRoles, ecclesiasticalOffices: userEcclesiasticalOffices, ministerial_position, is_general_admin, ...toGet } = user;
            const rolesId = userRoles?.map( role => role.id);
            const ecclesiasticalOfficesId = userEcclesiasticalOffices?.map( role => role.id);
            const sameUser = userLogged.id == id;
            const isSecretary = rolesId?.includes(2);
            const isAdmin = rolesId?.includes(3);

            setIsSuperAdmin(is_general_admin);

            setDisabledDataUsers(sameUser && ((!isAdmin && !isSecretary) || is_general_admin ))

            form.setFieldsValue({
                ...toGet,
                birth: stringToDate(birth),
                baptism_date: stringToDate(baptism_date),
                marital_status: marital_status_id,
                ministerial_position: ministerial_position?.id,
                roles: rolesId,
                ecclesiastical_offices: ecclesiasticalOfficesId,
            });
        }
    }, [user, id]);

    useEffect(() => {
        if(cepInfo){
            const { bairro: district, localidade: city, uf: state, logradouro: street } = cepInfo;
            form.setFieldsValue({ state, city, district, street });
            getCityList(state);
        }
    }, [cepInfo])

    useEffect(() => {
        if(toResetFields){
            resetFields();
        }
    }, [toResetFields])

    const resetFields = () => !id && form.resetFields();

    function onFinish(values){
        if(id) values.id = id;
        const { state, cep, city, district, number_home, street, rg, cpf, ...rest} = values;
        const address = { state, cep, city, district, number_home, street }
        const documents = [];

        if(rg) documents.push({ type: 'rg', value: rg});
        if(cpf) documents.push({ type: 'cpf', value: cpf});

        const valuesFiltered = {
            ...rest,
            documents,
            address: Object.keys(address).length > 1 ? address : null
        }

        save(valuesFiltered);
    }

    const fields = {
        ...getFormFields({  isSuperAdmin, disabledDataUsers })
    }

    // const fields = {
    //     dadosPessoais: [
    //         { name: "first_name", label: "Primeiro nome", rules: [{required: true, message: "Por favor, preencha o primeiro nome."}], span: [8] },
    //         { name: "last_name", label: "Sobrenome", rules: [{required: true, message: "Por favor, preencha o Sobrenome."}], span: [8] },
    //         { name: "birth", style: { width: "100%" }, label: "Data de nascimento", span: [8], type: "date", selectDate: "year", rules:[{ required: true, message: 'Por favor, informe a data de nascimento!'}], disabledDate: disabledDate },
    //         { name: "marital_status", style: { width: "100%" }, label: "Estado Civil", span: [8], type: "select", seletor: { identifier: "maritalStatus", key: "id", value: "name" }, rules:[{ required: true, message: 'Por favor, informe o estado civil!'}], disabled: isSuperAdmin},
    //         { name: "rg", type: 'rg', label: "RG", span: [8] },
    //         { name: "cpf", type: 'cpf', label: "CPF", span: [8] },
    //         { name: "mother", label: "Nome da mãe", span: [8] },
    //         { name: "father", label: "Nome do pai", span: [8] },
    //         { name: "gender", style: { width: "100%" }, label: "Gênero", span: [8], type: "select", seletor: { identifier: "genderList", key: "id", value: "name" }, rules:[{ required: true, message: 'Por favor, informe o gênero do membro!'}]}
    //     ],
    //     dadosAdicionais: [
    //         { name: "phone", style: { width: "100%" }, type: 'phone', label: "Telefone", span: [8] },
    //         { name: "cep", type: 'cep', onBlur: getCepInfoRequest, style: { width: "100%" }, label: "CEP", span: [8]},
    //         { name: "state", onChange: getCityList, type: "select", seletor: { identifier: "states", key: "sigla", value: "nome" }, style: { width: "100%" }, label: "Estado", span: [8]},
    //         { name: "city", type: "select", seletor: { identifier: "listCity", key: "nome", value: "nome" }, style: { width: "100%" }, label: "Cidade", span: [8]},
    //         { name: "district", style: { width: "100%" }, label: "Bairro", span: [8]},
    //         { name: "street", style: { width: "100%" }, label: "Rua", span: [8]},
    //         { name: "number_home", style: { width: "100%" }, label: "Número", span: [8]},
    //     ],
    //     informacoesParaIgreja: [
    //         { name: "ministerial_position", style: { width: "100%" }, label: "Cargo Ministerial", span: [12], type: "select", seletor: { identifier: "ministerialPositions", key: "id", value: "title" }, rules:[{ required: true, message: 'Por favor, informe o cargo!' }], disabled: isSuperAdmin},
    //         { name: "ecclesiastical_offices", style: { width: "100%" }, label: "Cargos Eclesiásticos", span: [12], type: "select", seletor: { identifier: "ecclesiasticalOffices", key: "id", value: "title" }, rules:[{ required: true, message: 'Por favor, informe pelo menos um cargo!' },], disabled: isSuperAdmin, mode: 'multiple'},
    //         { name: "baptism_date", style: { width: "100%" }, label: "Data batismo", span: [12], type: "date", selectDate: "year", disabledDate: disabledDate},
    //     ],
    //     dadosUsuarioSistema: [
    //         { name: "email", label: "E-mail", type: 'email', span: [8] },
    //         { name: "roles", style: { width: "100%" }, disabled: disabledDataUsers, label: "Perfis", span: [8], type: "select", seletor: { identifier: "roles", key: "id", value: "name" }, mode: 'multiple'},
    //         { name: "username", style: { width: "100%" }, disabled: disabledDataUsers, label: "Username", span: [8], rules:[{ max: 16, message: 'Não pode ser maior que 16 caracteres'}, { min: 4, message: "Não pode ser menor que 4 caracteres"}]},
    //     ]
    // }

    function disabledDate(current) {
        return current && current.valueOf() >= Date.now();
    }

    const propsButtonCancel = {
        show: true,
        href: id ? "../../membros/" :  "../membros/"
    }

    return (
        <FormContainer form={form} onFinish={onFinish} loading={false} propsBtnSave={{ show: true }} propsBtnCancel={propsButtonCancel}>
            <InputGroup title={'Dados pessoais'} fields={fields.dadosPessoais} data={{ maritalStatus: maritalStatusFilter, genderList }}/>
            <InputGroup title={'Informações para Igreja'} fields={fields.informacoesParaIgreja} data={{ ministerialPositions, ecclesiasticalOfficesFilter }} />
            <InputGroup title={'Informações adicionais'} fields={fields.dadosAdicionais} data={{ states: listState, listCity }} />
            <InputGroup title={"Dados de Usuário"} fields={fields.dadosUsuarioSistema} data={{ roles: rolesFilter }} />
        </FormContainer>
    )
}