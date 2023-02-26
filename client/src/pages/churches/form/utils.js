export const fields = {
    dadosPrincipais: [
        { name: "name", label: "Nome", rules: [{required: true, message: "Por favor, preencha o primeiro nome."}], span: [8] },
        { name: "description", label: "Descrição", span: [8] },
        { name: "email", label: "E-mail", rules: [{ type: 'email' }, { required: true, message: 'Por favor, informe o email!'}], span: [8] }
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
    ]
}