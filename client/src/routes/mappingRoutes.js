import React, { lazy }  from 'react';
const Home = lazy(() => import("../pages/Home"));
const User = lazy(() => import("../pages/users/list"));
const UserForm = lazy(() => import("../pages/users/form"));
const ChurchJobs = lazy(() => import("../pages/churchJobs/list"));
const ChurchJobsForm = lazy(() => import("../pages/churchJobs/form"));
const Churches = lazy(() => import("../pages/churches/list"));
const ChurchesForm = lazy(() => import("../pages/churches/form"));

const other = [
    { url: "/", element: <Home />}
];

const getSubModule = (module, submodule, component, componentForm) => {
    return [
        { url: `${module}/${submodule}`, element: component },
        ...( componentForm ? [
            { url: `${module}/${submodule}/form`, element: componentForm },
            { url: `${module}/${submodule}/form/:id`, element: componentForm },
        ] : [])
    ]
}

const people = () => {
    const module = 'people';

    return [
        ...getSubModule(module, 'members', <User />, <UserForm />),
        ...getSubModule(module, 'card-member', <User />, <UserForm />),
        ...getSubModule(module, 'cover-letter', <User />, <UserForm />),
    ]
}

const secretaria = () => {
    const module = 'secretary';

    return [
        ...getSubModule(module, 'secretaries', <ChurchJobs />, <ChurchJobsForm />),
        ...getSubModule(module, 'church-jobs', <ChurchJobs />, <ChurchJobsForm />),
        ...getSubModule(module, 'churches', <Churches />, <ChurchesForm />),
    ];
}

export const mappingRoutes = [
    ...other,
    ...secretaria(),
    ...people()
];