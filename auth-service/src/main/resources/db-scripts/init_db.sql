CREATE DATABASE auth;

CREATE SCHEMA wfiis;

CREATE SEQUENCE IF NOT EXISTS wfiis.user_seq
    INCREMENT 1
    START 1;

CREATE SEQUENCE IF NOT EXISTS wfiis.role_seq
    INCREMENT 1
    START 1;

CREATE SEQUENCE IF NOT EXISTS wfiis.privilege_seq
    INCREMENT 1
    START 1;

CREATE SEQUENCE IF NOT EXISTS wfiis.project_seq
    INCREMENT 1
    START 1;

CREATE SEQUENCE IF NOT EXISTS wfiis.action_seq
    INCREMENT 1
    START 1;

CREATE TABLE IF NOT EXISTS wfiis.user
(
    id          SERIAL PRIMARY KEY,
    username    VARCHAR(50)  NOT NULL,
    email       VARCHAR(255) NOT NULL,
    description VARCHAR,
    password    VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS wfiis.role
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS wfiis.privilege
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS wfiis.project
(
    id   SERIAL PRIMARY KEY,
    user_id BIGINT,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES wfiis.user (id)
);

CREATE TABLE IF NOT EXISTS wfiis.action
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS wfiis.user_role
(
    user_id BIGINT REFERENCES wfiis.user (id),
    role_id BIGINT REFERENCES wfiis.role (id),
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS wfiis.role_privilege
(
    role_id      BIGINT REFERENCES wfiis.role (id),
    privilege_id BIGINT REFERENCES wfiis.privilege (id),
    PRIMARY KEY (role_id, privilege_id)
);

CREATE TABLE IF NOT EXISTS wfiis.project_action
(
    project_id   BIGINT REFERENCES wfiis.project (id),
    action_id BIGINT REFERENCES wfiis.action (id),
    PRIMARY KEY (project_id, action_id)
);

INSERT INTO wfiis.action (id, name)
VALUES (nextval('wfiis.action_seq'), 'ADD_MEASUREMENT'),
       (nextval('wfiis.action_seq'), 'READ_MEASUREMENT');

INSERT INTO wfiis.privilege (id, name)
VALUES (nextval('wfiis.privilege_seq'), 'READ_PROJECT'),
       (nextval('wfiis.privilege_seq'), 'CREATE_PROJECT'),
       (nextval('wfiis.privilege_seq'), 'ADD_MEASUREMENT'),
       (nextval('wfiis.privilege_seq'), 'CREATE_USER'),
       (nextval('wfiis.privilege_seq'), 'UPDATE_PRIVILEGES'),
       (nextval('wfiis.privilege_seq'), 'DELETE_PROJECT');

INSERT INTO wfiis.role (id, name)
VALUES (nextval('wfiis.role_seq'), 'ADMIN'),
       (nextval('wfiis.role_seq'), 'PROJECT_CREATOR'),
       (nextval('wfiis.role_seq'), 'RESEARCHER');

INSERT INTO wfiis.role_privilege (role_id, privilege_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (1, 4),
       (1, 5),
       (1, 6),
       (2, 1),
       (2, 2),
       (3, 1),
       (3, 3);

INSERT INTO wfiis.user (id, username, email, description, password)
VALUES (nextval('wfiis.user_seq'), 'Admin', 'admin@agh.edu.pl', 'Admin user',
        'admin');

INSERT INTO wfiis.user (id, username, email, description, password)
VALUES (nextval('wfiis.user_seq'), 'Project Creator', 'project_creator@agh.edu.pl', 'Project creator user',
        'project_creator');

INSERT INTO wfiis.user (id, username, email, description, password)
VALUES (nextval('wfiis.user_seq'), 'Researcher', 'researcher@agh.edu.pl', 'Researcher user',
        'researcher');

INSERT INTO wfiis.user_role(user_id, role_id)
VALUES (1, 1),
       (2, 2),
       (3, 3);
