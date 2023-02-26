export const fields = [
    { name: "key", label: "Título", rules: [{required: true, message: "Por favor, preencha o título do perfil."}], span: [12] },
    {
        name: "permissions",
        style: { width: "100%" },
        label: "Permissões",
        span: [12],
        type: "select",
        mode: "multiple",
        titles: ['Disponíveis', 'Selecionadas'],
        seletor: { identifier: "permissions", key: "id", value: "name" },
        rules:[{ required: true, message: 'Por favor, informe as permissões!'}]
    }
];