CREATE SCHEMA wfiis;

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

INSERT INTO wfiis.user (id, username, email, description, password)
VALUES (nextval('wfiis.user_seq'), 'Tester', 'tester@test.pl', 'User created for test purposes',
        '1234');


