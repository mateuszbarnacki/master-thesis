INSERT INTO wfiis.role (id, name)
VALUES (nextval('wfiis.role_seq'), 'ADMIN'),
       (nextval('wfiis.role_seq'), 'PROJECT_CREATOR'),
       (nextval('wfiis.role_seq'), 'RESEARCHER');