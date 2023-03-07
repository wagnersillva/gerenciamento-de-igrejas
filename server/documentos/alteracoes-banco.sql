----- ALTERAÇÕES 22/10/2022

alter table users add column password_changed int(1) not null default 0;

----- ALTERAÇÕES 23/10/2022

alter table roles add column is_admin int(1) not null default 0;
alter table roles add column is_secretary int(1) not null default 0;
alter table roles add column is_removable int(1) not null default 1;

alter table users add column is_general_admin int(1) not null default 0;


update roles set is_admin = 1, is_removable = 0 where id = 3;
update roles set is_secretary = 1, is_removable = 0 where id = 2;

update users set users.is_general_admin = 1 where id = 1;

----  ATUALIZAÇÃO 27/10/2022

alter table users add column username varchar(100);
alter table users add column phone varchar(50);
alter table users add column gender varchar(1);

create table address (
     id bigint unsigned auto_increment primary key,
     district varchar(100),
     city varchar(100),
     street varchar(100),
     number_home varchar(100),
     state varchar(100),
     country varchar(100),
     cep varchar(100),
     created_at timestamp null,
     updated_at timestamp null,
     user_id bigint unsigned not null
);

alter table address add constraint fk_id_users_address foreign key (user_id) references users(id) on delete cascade;

alter table users modify email varchar(255) null;

-- adicionando table churchs

create table churches (
     id bigint unsigned auto_increment primary key,
     name varchar(255) not null,
     description varchar(500) not null,
     address_id bigint not null,
     matriz_id bigint
);

alter table churches
    add constraint fk_church_matriz_id
        foreign key(matriz_id) references churches(id);

alter table churches
    add constraint fk_church_address_id
        foreign key(address_id) references address(id);

alter table users
    add constraint fk_users_church_id
        foreign key (church_id) references churches(id)

alter table churches add column created_at timestamp null;
alter table churches add column updated_at timestamp null;
alter table churches modify address_id bigint unsigned null;

alter table address modify user_id bigint unsigned; -- mudar associação entre endereco e usuario

alter table users add church_logged bigint unsigned;

rename table church_jobs to ministerial_position;

create table ecclesiastical_office (
    id bigint unsigned auto_increment primary key,
    title       varchar(255) not null,
    description varchar(255) not null,
    created_at  timestamp    null,
    updated_at  timestamp    null
);

create table ecclesiastical_office_users (
    user_id bigint unsigned not null,
    ecclesiastical_office_id bigint unsigned not null,
    primary key (user_id, ecclesiastical_office_id),
    constraint ecc_office_ecc_id_foreign
     foreign key (ecclesiastical_office_id) references ecclesiastical_office (id)
         on delete cascade,
    constraint ecc_office_user_id_foreign
     foreign key (user_id) references users (id)
         on delete cascade
);

alter table users drop column username;
