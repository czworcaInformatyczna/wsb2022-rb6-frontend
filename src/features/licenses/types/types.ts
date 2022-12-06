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
  assets: [
    {
      id: number;
      name: string;
      pivot: {
        licencable_id: number;
      };
    },
  ];
  users: [
    {
      email: string;
      id: number;
      pivot: {
        licencable_id: number;
      };
    },
  ];
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

export interface IDeploy {
  model: string;
  model_id: number | null;
}

export interface IDeployForm {
  asset?: {
    id: number;
    name?: string;
  };
  model: string;
  user?: {
    email?: string;
    id: number;
  };
}

export interface ILicenseHistory {
  data: [{ action: string; date: string; id: number; notes: string; user: string }];
  total: number;
}

export interface ILicenseFile {
  download_link: string;
  extension: string;
  id: number;
  name: string;
  size: string;
  upload_date: string;
}
export interface ILicenseFiles {
  data: ILicenseFiles[];
  total: number;
}
