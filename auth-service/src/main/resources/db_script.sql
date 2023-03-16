INSERT INTO roles (id, name) VALUES (1, 'ADMIN'), (2, 'READER'), (3, 'OFFLINE_WRITER');

INSERT INTO privileges (id, name) VALUES (1, 'READ_PROJECT'), (2, 'CREATE_PROJECT'), (3, 'DELETE_PROJECT');

INSERT INTO roles_privileges(role_id, privilege_id) VALUES (1, 1), (1, 2), (1, 3), (2, 1), (3, 2), (3, 3);