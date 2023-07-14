CREATE SCHEMA wfiis;

CREATE TABLE wfiis.user
(
    id          INT PRIMARY KEY,
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

CREATE TABLE IF NOT EXISTS wfiis.user_project
(
    user_id    BIGINT REFERENCES wfiis.user (id),
    project_id BIGINT REFERENCES wfiis.project (id),
    PRIMARY KEY (user_id, project_id)
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

INSERT INTO wfiis.user (id, username, email, description, password)
VALUES (nextval('wfiis.user_seq'), 'Tester', 'tester@test.pl', 'User created for test purposes',
        '1234');


