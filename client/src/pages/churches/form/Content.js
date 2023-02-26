import React, {useEffect} from 'react';
import {Form} from "antd";
import InputGroup from "../../../components/FormContainer/InputGroups";
import {useSelector} from "react-redux";
import FormContainer from "../../../components/FormContainer";

export default function Content({ save, id, getCepInfoRequest, getCityList }){
    const { church, toResetFields } = useSelector(store => store.churchReducer );
    const { loading } = useSelector(store => store.globalReducer );
    const { cepInfo, listState, listCity } = useSelector(store => store.utilsReducer );
    const [ form ] = Form.useForm();

    useEffect(() => {
        if(id){
            const { description, name, address } = church;
            form.setFieldsValue({
                description,
                name,
                ...( address ??  {})
            });

        }
    }, [church]);

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
        const { state, cep, city, district, number_home, street, ...rest} = values;
        const address = { state, cep, city, district, number_home, street }

        const valuesFiltered = {
            ...rest,
            address: Object.keys(address).length > 1 ? address : null
        }

        save(valuesFiltered);
    }

    const fields = {
        dadosPrincipais: [
            { name: "name", label: "Nome", rules: [{required: true, message: "Por favor, preencha o primeiro nome."}], span: [12] },
            { name: "description", label: "Descrição", span: [12] },
        ],
        dadosAdicionais: [
            { name: "cep", style: { width: "100%" }, label: "cep", span: [8], onBlur: getCepInfoRequest},
            { name: "state", style: { width: "100%" }, label: "Estado", span: [8]},
            { name: "city", style: { width: "100%" }, label: "Cidade", span: [8]},
            { name: "district", style: { width: "100%" }, label: "Bairro", span: [8]},
            { name: "street", style: { width: "100%" }, label: "Rua", span: [8]},
            { name: "number_home", style: { width: "100%" }, label: "Número", span: [8]},
        ]
    }

    const propsButtonCancel = {
        show: true,
        href: id ? "../../igrejas/" :  "../igrejas/"
    }

    return (
        <FormContainer form={form} onFinish={onFinish} loading={loading} propsBtnSave={{ show: true }} propsBtnCancel={propsButtonCancel}>
            <InputGroup title={'Dados Principais'} fields={fields.dadosPrincipais} />
            <InputGroup title={'Informações de Localização'} fields={fields.dadosAdicionais} data={{ states: listState, listCity }} />
        </FormContainer>
    )
}