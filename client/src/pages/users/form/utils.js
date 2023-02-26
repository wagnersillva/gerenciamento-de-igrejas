export const fieelds = [
    [
        { name: "first_name", label: "Primeiro nome", rules: [{required: true, message: "Por favor, preencha o primeiro nome."}], span: [8] },
        { name: "last_name", label: "Sobrenome", rules: [{required: true, message: "Por favor, preencha o Sobrenome."}], span: [8] },
        { name: "email", label: "E-mail", rules: [{ type: 'email' }, { required: true, message: 'Por favor, informe o email!'}], span: [8] }
    ],
    [
        { name: "birth", style: { width: "100%" }, label: "Data de nascimento", span: [8], type: "date", selectDate: "year", rules:[{ required: true, message: 'Por favor, informe a data de nascimento!'}], disabledDate: disabledDate},
        { name: "mother", label: "Nome da mãe", span: [8] },
        { name: "father", label: "Nome do pai", span: [8] }
    ],
    [
        { name: "marital_status", style: { width: "100%" }, label: "Estado Civil", span: [8], type: "select", seletor: { identifier: "maritalStatus", key: "id", value: "name" }, rules:[{ required: true, message: 'Por favor, informe o estado civil!'}]},
        { name: "roles", style: { width: "100%" }, label: "Perfis", span: [8], type: "select", seletor: { identifier: "roles", key: "id", value: "name" }, mode: 'multiple', rules:[{ required: true, message: 'Por favor, informe as permissões!'}], isDisabled: (obj) => !!obj.is_general_admin},
        { name: "church_job", style: { width: "100%" }, label: "Cargo", span: [8], type: "select", seletor: { identifier: "churchJobs", key: "id", value: "title" }, rules:[{ required: true, message: 'Por favor, informe o cargo!'}]},
    ]
]

export const fields = {
    dadosPessoais: [
        { name: "first_name", label: "Primeiro nome", rules: [{required: true, message: "Por favor, preencha o primeiro nome."}], span: [8] },
        { name: "last_name", label: "Sobrenome", rules: [{required: true, message: "Por favor, preencha o Sobrenome."}], span: [8] },
        { name: "birth", style: { width: "100%" }, label: "Data de nascimento", span: [8], type: "date", selectDate: "year", rules:[{ required: true, message: 'Por favor, informe a data de nascimento!'}], disabledDate: disabledDate},
        { name: "rg", label: "RG", span: [8] },
        { name: "cpf", label: "CPF", span: [8] },
        { name: "mother", label: "Nome da mãe", span: [8] },
        { name: "father", label: "Nome do pai", span: [8] }
    ],
    dadosAdicionais: [
        { name: "baptism_date", style: { width: "100%" }, label: "Data batismo", span: [8], type: "date", selectDate: "year", disabledDate: disabledDate},
        { name: "phone", style: { width: "100%" }, label: "Telefone", span: [8]},
        { name: "cep", style: { width: "100%" }, label: "cep", span: [8]},
        { name: "state", style: { width: "100%" }, label: "Estado", span: [8]},
        { name: "city", style: { width: "100%" }, label: "Cidade", span: [8]},
        { name: "disctrict", style: { width: "100%" }, label: "Bairro", span: [8]},
        { name: "street", style: { width: "100%" }, label: "Rua", span: [8]},
        { name: "number_home", style: { width: "100%" }, label: "Número", span: [8]},
    ],
    dadosUsuarioSistema: [
        { name: "email", label: "E-mail", rules: [{ type: 'email' }], span: [8] },
        { name: "roles", style: { width: "100%" }, label: "Perfis", span: [8], type: "select", seletor: { identifier: "roles", key: "id", value: "name" }, mode: 'multiple'},
        { name: "username", style: { width: "100%" }, label: "Cargo", span: [8], rules:[{ max: 16, message: 'Não pode ser maior que 16 caracteres'}, { min: 4, message: "Não pode ser menor que 4 caracteres"}]},
    ]
}

function disabledDate(current) {
    return current && current.valueOf() >= Date.now();
}