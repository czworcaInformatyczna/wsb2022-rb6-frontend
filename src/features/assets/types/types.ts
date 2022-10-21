import { type HTMLInputTypeAttribute } from 'react';

import { type GridSelectionModel, type GridColumns } from '@mui/x-data-grid';
import { type FieldValues } from 'react-hook-form';

export interface CustomToolbarProps {
  selectedItems: GridSelectionModel;
}

export interface AssetsProps {
  data: IDataProvider;
}

export interface ContextMenu {
  elementId: number;
  mouseX: number;
  mouseY: number;
}

export interface IAssets {
  category: string;
  id: number | string;
  image: string;
  manufacturer: string;
  model: string;
  name: string;
  serial: string;
  status: string;
}
export interface IAsset {
  assetTag: string;
  category: string;
  date_of_purchase: string;
  id: number | string;
  manufacturer: string;
  model: string;
  name: string;
  notes: string;
  order_number: number | string;
  purchase_cost: number;
  serial: string;
  status: string;
  waranty: number;
}
export interface IAssetDetails {
  assetTag: string;
  category: string;
  checkins: number;
  checkouts: number;
  created_at: string;
  date_of_purchase: string;
  id: number | string;
  manufacturer: string;
  model: string;
  name: string;
  notes: string;
  order_number: number | string;
  purchase_cost: number;
  requests: number;
  serial: string;
  status: string;
  waranty: number;
}

export interface DataProviderProps {
  link: string;
}
export interface IDataProvider {
  addNewLink: string;
  columns: GridColumns;
  detailsLink: string;
  editLink: string;
  getDataHook: () => any;
  name: string;
  // Add APIs object that stores api calls
}
export enum Statuses {
  Archived = 'Archived',
  Deployed = 'Deployed',
  Maintenance = 'Maintenance',
  ReadyToDeploy = 'Ready to deploy',
}

export interface IFormInput extends FieldValues {
  AssetName: string;
  AssetTag: string;
  DateOfPurchase: string;
  Model: IModel | null;
  Notes: string;
  OrderNumber: number | string;
  Photo: File;
  PurchaseCost: number | '';
  Receipt: File;
  Serial: string;
  Status: IStatus | null;
  Waranty: number | '';
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

export interface IInputProps {
  helperText?: string;
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute;
}

export interface IAssetLicenses {
  expiration_date: string;
  id: number;
  key: string;
  name: string;
}

export interface IAssetComponents {
  category: string;
  id: string;
  name: string;
  serial: string;
}

export interface IAssetHistory {
  action: string;
  date: string;
  id: number;
  notes: string;
  target: string;
  user: string;
}

export interface IAssetMaintenances {
  endDate: string;
  id: number;
  maintenanceType: string;
  notes: string;
  startDate: string;
  title: string;
  user: string;
}

export interface IAssetFiles {
  download_link: string;
  extension: string;
  id: number;
  name: string;
  size: string;
  upload_date: string;
}
