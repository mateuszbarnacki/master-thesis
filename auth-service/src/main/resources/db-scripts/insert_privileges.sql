INSERT INTO wfiis.privilege (id, name)
VALUES (nextval('wfiis.privilege_seq'), 'READ_PROJECT'),
       (nextval('wfiis.privilege_seq'), 'CREATE_PROJECT'),
       (nextval('wfiis.privilege_seq'), 'ADD_MEASUREMENT'),
       (nextval('wfiis.privilege_seq'), 'CREATE_USER'),
       (nextval('wfiis.privilege_seq'), 'UPDATE_PRIVILEGES'),
       (nextval('wfiis.privilege_seq'), 'DELETE_PROJECT');