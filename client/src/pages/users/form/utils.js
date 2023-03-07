export const getFormFields = ({ disabledDataUsers, isSuperAdmin }) => {
    return {
        dadosPessoais: [
            { name: "first_name", label: "Primeiro nome", rules: [{required: true, message: "Por favor, preencha o primeiro nome."}], span: [8] },
            { name: "last_name", label: "Sobrenome", rules: [{required: true, message: "Por favor, preencha o Sobrenome."}], span: [8] },
            { name: "birth", style: { width: "100%" }, label: "Data de nascimento", span: [8], type: "date", selectDate: "year", rules:[{ required: true, message: 'Por favor, informe a data de nascimento!'}], disabledDate: disabledDate },
            { name: "marital_status", style: { width: "100%" }, label: "Estado Civil", span: [8], type: "select", seletor: { identifier: "maritalStatus", key: "id", value: "name" }, rules:[{ required: true, message: 'Por favor, informe o estado civil!'}], disabled: isSuperAdmin},
            { name: "rg", type: 'rg', label: "RG", span: [8] },
            { name: "cpf", type: 'cpf', label: "CPF", span: [8] },
            { name: "mother", label: "Nome da mãe", span: [8] },
            { name: "father", label: "Nome do pai", span: [8] },
            { name: "gender", style: { width: "100%" }, label: "Gênero", span: [8], type: "select", seletor: { identifier: "genderList", key: "id", value: "name" }, rules:[{ required: true, message: 'Por favor, informe o gênero do membro!'}]}
        ],
        dadosAdicionais: [
            { name: "phone", style: { width: "100%" }, type: 'phone', label: "Telefone", span: [8] },
            { name: "cep", type: 'cep', onBlur: getCepInfoRequest, style: { width: "100%" }, label: "CEP", span: [8]},
            { name: "state", onChange: getCityList, type: "select", seletor: { identifier: "states", key: "sigla", value: "nome" }, style: { width: "100%" }, label: "Estado", span: [8]},
            { name: "city", type: "select", seletor: { identifier: "listCity", key: "nome", value: "nome" }, style: { width: "100%" }, label: "Cidade", span: [8]},
            { name: "district", style: { width: "100%" }, label: "Bairro", span: [8]},
            { name: "street", style: { width: "100%" }, label: "Rua", span: [8]},
            { name: "number_home", style: { width: "100%" }, label: "Número", span: [8]},
        ],
        informacoesParaIgreja: [
            { name: "ministerial_position", style: { width: "100%" }, label: "Cargo Ministerial", span: [12], type: "select", seletor: { identifier: "ministerialPositions", key: "id", value: "title" }, rules:[{ required: true, message: 'Por favor, informe o cargo!' }], disabled: isSuperAdmin},
            { name: "ecclesiastical_offices", style: { width: "100%" }, label: "Cargos Eclesiásticos", span: [12], type: "select", seletor: { identifier: "ecclesiasticalOffices", key: "id", value: "title" }, rules:[{ required: true, message: 'Por favor, informe pelo menos um cargo!' },], disabled: isSuperAdmin, mode: 'multiple'},
            { name: "baptism_date", style: { width: "100%" }, label: "Data batismo", span: [12], type: "date", selectDate: "year", disabledDate: disabledDate},
        ],
        dadosUsuarioSistema: [
            { name: "email", label: "E-mail", type: 'email', span: [8] },
            { name: "roles", style: { width: "100%" }, disabled: disabledDataUsers, label: "Perfis", span: [8], type: "select", seletor: { identifier: "roles", key: "id", value: "name" }, mode: 'multiple'},
            { name: "username", style: { width: "100%" }, disabled: disabledDataUsers, label: "Username", span: [8], rules:[{ max: 16, message: 'Não pode ser maior que 16 caracteres'}, { min: 4, message: "Não pode ser menor que 4 caracteres"}]},
        ]
    }
}

function disabledDate(current) {
    return current && current.valueOf() >= Date.now();
}