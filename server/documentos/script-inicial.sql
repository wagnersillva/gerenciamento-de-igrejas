CREATE DATABASE IF NOT EXISTS sis_igreja;

create table church_jobs
(
    id          bigint unsigned auto_increment
        primary key,
    title       varchar(255) not null,
    description varchar(255) not null,
    created_at  timestamp    null,
    updated_at  timestamp    null
)
    collate = utf8mb4_unicode_ci;

create table failed_jobs
(
    id         bigint unsigned auto_increment
        primary key,
    uuid       varchar(255)                          not null,
    connection text                                  not null,
    queue      text                                  not null,
    payload    longtext                              not null,
    exception  longtext                              not null,
    failed_at  timestamp default current_timestamp() not null,
    constraint failed_jobs_uuid_unique
        unique (uuid)
)
    collate = utf8mb4_unicode_ci;

create table marital_status
(
    id         bigint unsigned auto_increment
        primary key,
    name       varchar(255) not null,
    created_at timestamp    null,
    updated_at timestamp    null
)
    collate = utf8mb4_unicode_ci;

create table migrations
(
    id        int unsigned auto_increment
        primary key,
    migration varchar(255) not null,
    batch     int          not null
)
    collate = utf8mb4_unicode_ci;

create table password_resets
(
    email      varchar(255) not null,
    token      varchar(255) not null,
    created_at timestamp    null
)
    collate = utf8mb4_unicode_ci;

create index password_resets_email_index
    on password_resets (email);

create table permissions
(
    id         bigint unsigned auto_increment
        primary key,
    `key`      varchar(255) not null,
    created_at timestamp    null,
    updated_at timestamp    null
)
    collate = utf8mb4_unicode_ci;

create table personal_access_tokens
(
    id             bigint unsigned auto_increment
        primary key,
    tokenable_type varchar(255)    not null,
    tokenable_id   bigint unsigned not null,
    name           varchar(255)    not null,
    token          varchar(64)     not null,
    abilities      text            null,
    last_used_at   timestamp       null,
    created_at     timestamp       null,
    updated_at     timestamp       null,
    constraint personal_access_tokens_token_unique
        unique (token)
)
    collate = utf8mb4_unicode_ci;

create index personal_access_tokens_tokenable_type_tokenable_id_index
    on personal_access_tokens (tokenable_type, tokenable_id);

create table roles
(
    id         bigint unsigned auto_increment
        primary key,
    `key`      varchar(255) not null,
    created_at timestamp    null,
    updated_at timestamp    null
)
    collate = utf8mb4_unicode_ci;

create table permission_role
(
    permission_id bigint unsigned not null,
    role_id       bigint unsigned not null,
    primary key (permission_id, role_id),
    constraint permission_role_permission_id_foreign
        foreign key (permission_id) references permissions (id)
            on delete cascade,
    constraint permission_role_role_id_foreign
        foreign key (role_id) references roles (id)
            on delete cascade
)
    collate = utf8mb4_unicode_ci;

create table users
(
    id                bigint unsigned auto_increment
        primary key,
    first_name        varchar(255)    not null,
    last_name         varchar(255)    not null,
    mother            varchar(255)    null,
    father            varchar(255)    null,
    baptism_date      date            null,
    birth             date            not null,
    email             varchar(255)    not null,
    email_verified_at timestamp       null,
    password          varchar(255)    not null,
    remember_token    varchar(100)    null,
    created_at        timestamp       null,
    updated_at        timestamp       null,
    church_job_id     bigint unsigned null,
    marital_status_id bigint unsigned null,
    constraint users_email_unique
        unique (email),
    constraint users_church_job_id_foreign
        foreign key (church_job_id) references church_jobs (id),
    constraint users_marital_status_id_foreign
        foreign key (marital_status_id) references marital_status (id)
)
    collate = utf8mb4_unicode_ci;

create table documents
(
    id         bigint unsigned auto_increment
        primary key,
    type       varchar(255)    not null,
    value      varchar(255)    not null,
    user_id    bigint unsigned not null,
    created_at timestamp       null,
    updated_at timestamp       null,
    constraint documents_user_id_foreign
        foreign key (user_id) references users (id)
            on delete cascade
)
    collate = utf8mb4_unicode_ci;

create table role_user
(
    user_id bigint unsigned not null,
    role_id bigint unsigned not null,
    primary key (user_id, role_id),
    constraint role_user_role_id_foreign
        foreign key (role_id) references roles (id)
            on delete cascade,
    constraint role_user_user_id_foreign
        foreign key (user_id) references users (id)
            on delete cascade
)
    collate = utf8mb4_unicode_ci;

INSERT INTO `church_jobs` (`id`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Membro', 'Descrição do cargo de membro', '2022-09-10 17:13:45', '2022-10-12 03:00:48'),
(2, 'Pastor', 'Pastor da Igreja', '2022-10-09 03:40:55', '2022-10-09 03:40:55');

INSERT INTO `marital_status` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'SOLTEIRO', '2022-09-10 17:13:37', '2022-09-10 17:13:37'),
(2, 'CASADO', '2022-10-04 00:35:18', NULL),
(3, 'VIUVO', '2022-10-04 00:35:18', NULL);

INSERT INTO `permissions` (`id`, `key`, `created_at`, `updated_at`) VALUES
(1, 'read-user', '2022-09-10 16:46:30', '2022-10-09 07:45:14'),
(2, 'edit-user', '2022-09-10 16:46:30', '2022-10-09 07:45:14'),
(3, 'create-user', '2022-09-10 16:46:30', '2022-10-09 07:45:14'),
(4, 'delete-user', '2022-09-10 16:46:30', '2022-10-09 07:45:14'),
(6, 'read-user-details', '2022-09-10 16:46:30', '2022-10-09 07:45:14'),
(26, 'read-church-job', '2022-10-09 07:25:22', '2022-10-09 07:45:14'),
(27, 'edit-church-job', '2022-10-09 07:25:22', '2022-10-09 07:45:14'),
(28, 'create-church-job', '2022-10-09 07:25:22', '2022-10-09 07:45:14'),
(29, 'delete-church-job', '2022-10-09 07:25:22', '2022-10-09 07:45:14'),
(30, 'read-role', '2022-10-09 07:25:22', '2022-10-09 07:45:14'),
(31, 'edit-role', '2022-10-09 07:25:22', '2022-10-09 07:45:14'),
(32, 'create-role', '2022-10-09 07:25:22', '2022-10-09 07:45:14'),
(33, 'delete-role', '2022-10-09 07:25:22', '2022-10-09 07:45:14');


INSERT INTO `roles` (`id`, `key`, `created_at`, `updated_at`) VALUES
(1, 'Membro', '2022-09-10 16:46:28', '2022-09-10 16:46:28'),
(2, 'Secretario', '2022-09-10 16:46:28', '2022-09-10 16:46:28'),
(3, 'Administrador', '2022-09-10 16:46:28', '2022-09-10 16:46:28');

INSERT INTO `permission_role` (`permission_id`, `role_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 2),
(2, 3),
(3, 2),
(3, 3),
(4, 2),
(4, 3),
(6, 2),
(6, 3),
(26, 2),
(26, 3),
(27, 2),
(27, 3),
(28, 2),
(28, 3),
(29, 2),
(29, 3),
(30, 2),
(30, 3),
(31, 2),
(31, 3),
(32, 2),
(32, 3);

INSERT INTO `users` (`id`, `first_name`, `last_name`, `mother`, `father`, `baptism_date`, `birth`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `church_job_id`, `marital_status_id`) VALUES
(1, 'admin', 'geral', NULL, NULL, NULL, '2000-01-01', 'admin@admin.com', NULL, '$2y$10$yUER7S/TNqyB4HA61/nG6.DjpYTzFm27cItF8VL/V.Lji/Vj3Musm', NULL, '2022-09-10 20:16:32', '2022-10-13 04:33:04', 1, 1);

INSERT INTO `role_user` (`user_id`, `role_id`) VALUES
(1, 1),
(1, 2),
(1, 3);

