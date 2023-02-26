import React, { lazy }  from 'react';
const Home = lazy(() => import("../pages/Home"));
const User = lazy(() => import("../pages/users/list"));
const UserForm = lazy(() => import("../pages/users/form"));
const ChurchJobs = lazy(() => import("../pages/churchJobs/list"));
const ChurchJobsForm = lazy(() => import("../pages/churchJobs/form"));
const Roles = lazy(() => import("../pages/roles/list"));
const RolesForm = lazy(() => import("../pages/roles/form"));
const Churches = lazy(() => import("../pages/churches/list"));
const ChurchesForm = lazy(() => import("../pages/churches/form"));

const other = [
    { url: "/", element: <Home />}
]

const secretaria = [
    { url: '/secretaria/membros', element: <User /> },
    { url: '/secretaria/membros/form', element: <UserForm /> },
    { url: '/secretaria/membros/form/:id', element: <UserForm /> },

    { url: '/secretaria/cargos', element: <ChurchJobs /> },
    { url: '/secretaria/cargos/form', element: <ChurchJobsForm /> },
    { url: '/secretaria/cargos/form/:id', element: <ChurchJobsForm /> },

    { url: '/secretaria/igrejas', element: <Churches /> },
    { url: '/secretaria/igrejas/form', element: <ChurchesForm /> },
    { url: '/secretaria/igrejas/form/:id', element: <ChurchesForm /> },
];

const seguranca = [
    { url: '/seguranca/perfil', element: <Roles /> },
    { url: '/seguranca/perfil/form', element: <RolesForm /> },
    { url: '/seguranca/perfil/form/:id', element: <RolesForm /> },
]

export const mappingRoutes = [
    ...other,
    ...secretaria,
    ...seguranca
];