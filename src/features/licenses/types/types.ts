import { type FieldValues } from 'react-hook-form';

export interface ILicenses {
  available: number;
  category: string;
  expiration_date: string;
  id: number;
  key: string;
  licensed_to: string;
  manufacturer: string;
  name: string;
  notes: string;
  orderNumber: number;
  purchaseCost: number;
  quantity: number;
}

export interface ILicense {
  category_id: number | null;
  email: string;
  expiration_date: string;
  manufacturer_id: number | null;
  name: string;
  product_key: string;
  reassignable: boolean;
  slots: number;
}
export interface ILicenseDetails {
  available: number;
  category: string;
  deployed: number;
  expiration_date: string;
  id: number;
  key: string;
  licensed_to: string;
  manufacturer: string;
  name: string;
  notes: string;
  order_number: number;
  purchaseCost: number;
  quantity: number;
}
export interface IDeployedTo {
  name: string;
  type: string;
}
export interface ILicenseDeploys {
  deployed_to: IDeployedTo;
  id: number;
  is_deployed: boolean;
  notes: string;
}

export interface ILicenseFormInput extends FieldValues {
  category_id: {
    id: number;
    name: string;
  } | null;
  email: string;
  expiration_date: string;
  manufacturer_id: {
    id: number;
    name: string;
  } | null;
  name: string;
  product_key: string;
  reassignable: boolean;
  slots: number;
}
export interface ILicenseCategory {
  data: [
    {
      id: number;
      name: string;
    },
  ];
  total: number;
}
export interface ILicenseManufacturer {
  id: number;
  name: string;
}
