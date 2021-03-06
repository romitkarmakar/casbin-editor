/* eslint-disable */
const exampleRequest = {
  basic: 'alice, data1, read',
  basic_with_root: 'alice, data1, read',
  basic_without_resources: 'alice, read',
  basic_without_users: 'data1, read',
  rbac: 'alice, data2, read',
  rbac_with_resource_roles: 'alice, data1, read\n' + 'alice, data1, write\n' + 'alice, data2, read\n' + 'alice, data2, write ',
  rbac_with_domains: 'alice, domain1, data1, read',
  rbac_with_deny: 'alice, data1, read\n' + 'alice, data2, write',
  abac: 'Not support',
  keymatch: 'alice, /alice_data/hello, GET',
  keymatch2: 'alice, /alice_data/hello, GET\n' + 'alice, /alice_data/hello, POST',
  ipmatch: 'Not support',
  priority: 'alice, data1, read'
};

export default exampleRequest;
