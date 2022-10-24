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

export interface ILicenseFormInput extends FieldValues {
  Category: ILicenseCategory | null;
  DateOfPurchase: string;
  ExpirationDate: string;
  Key: string;
  LicensedTo: string;
  Manufacturer: ILicenseManufacturer | null;
  Name: string;
  Notes: string;
  OrderNumber: number | string;
  PurchaseCost: number | '';
  Quantity: number | '';
}
export interface ILicenseCategory {
  id: number;
  name: string;
}
export interface ILicenseManufacturer {
  id: number;
  name: string;
}
