export interface IRoles {
  data: [
    {
      id: number;
      name: string;
      permissions: [{ id: number; name: string }];
    },
  ];
  total: 1;
}

export type TPermissions = [{ id: number; name: string }];

export interface IAddRole {
  name: string;
  permissions: string[];
}
export interface IRoleForm {
  name: string;
  permissions: [{ id: number; name: string }];
}
export interface IRole {
  role: {
    id: number;
    name: string;
  };
  rolePermissions: [{ id: number; name: string }];
}
