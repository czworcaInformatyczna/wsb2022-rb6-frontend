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
