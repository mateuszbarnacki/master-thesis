CREATE TABLE IF NOT EXISTS "user"
(
    id          SERIAL PRIMARY KEY,
    username    VARCHAR(50)  NOT NULL,
    email       VARCHAR(255) NOT NULL,
    description VARCHAR,
    password    VARCHAR(50)  NOT NULL
);

CREATE TABLE IF NOT EXISTS "role"
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS "privilege"
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS "project"
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);


CREATE TABLE IF NOT EXISTS "user_role"
(
    user_id BIGINT REFERENCES "user" (id),
    role_id BIGINT REFERENCES "role" (id),
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS "role_privilege"
(
    role_id      BIGINT REFERENCES "role" (id),
    privilege_id BIGINT REFERENCES "privilege" (id),
    PRIMARY KEY (role_id, privilege_id)
);

CREATE TABLE IF NOT EXISTS "user_project"
(
    user_id    BIGINT REFERENCES "user" (id),
    project_id BIGINT REFERENCES "project" (id),
    PRIMARY KEY (user_id, project_id)
);
