export interface IUsers {
  data: [
    {
      email: string;
      id: number;
      name: string;
      phone_number: string;
      roles: any[];
      surname: string;
    },
  ];
  total: number;
}

export interface IAddUser {
  email: string;
  name?: string;
  phone_number?: number;
  roles: string[];
  surname?: string;
}

export interface IUser {
  email: string;
  name: string;
  phone_number: number;
  roles: [{ id: number; name: string }];
  surname: string;
}
export interface IAddUserForm {
  email: string;
  name?: string;
  phone_number?: number;
  roles: [{ id: number; name: string }];
  surname?: string;
}
