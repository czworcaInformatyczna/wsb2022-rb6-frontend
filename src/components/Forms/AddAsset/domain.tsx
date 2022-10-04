export interface IFormInput {
  AssetName: string;
  AssetTag: string;
  DateOfPurchase: Date;
  Model: IModel | null;
  Notes: string;
  OrderNumber: number | string;
  Photo: File;
  PurchaseCost: number;
  Receipt: File;
  Serial: string;
  Status: IStatus | null;
  Waranty: number;
}

export interface IModel {
  id: string;
  img: string;
  name: string;
}
export interface IStatus {
  id: string;
  name: string;
}
