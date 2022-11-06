import { type HTMLInputTypeAttribute } from 'react';

import { type GridSelectionModel, type GridColumns } from '@mui/x-data-grid';
import { type FieldValues } from 'react-hook-form';

export interface CustomToolbarProps {
  resetSelection: () => {};
  selectedItems: GridSelectionModel;
}

export interface AssetsProps {
  data: IDataProvider;
  status?: number;
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
  order_number: string;
  purchase_cost: number;
  serial: string;
  status: number;
  waranty: number;
}
export interface IAssetDetails {
  asset_model: {
    asset_category_id: number;
    asset_manufacturer_id: number;
    category: {
      id: number;
      name: string;
    };
    id: number;
    manufacturer: {
      id: string;
      name: string;
    };
    name: string;
  };
  checkins: number;
  checkouts: number;
  created_at: string;
  current_holder: string;
  current_holder_id: number;
  id: number | string;
  image: string;
  name: string;
  notes: string;
  order_number: string;
  price: number;
  purchase_date: string;
  requests: number;
  serial: string;
  status: number;
  tag: string;
  warranty: number;
}
export interface IAssetCreate {
  asset_model_id: number | undefined;
  image: string | null;
  name: string;
  notes: string;
  order_number: string;
  price: number | '';
  purchase_date: string;
  serial: string;
  status: Statuses | undefined;
  tag: string;
  warranty: number | '';
}
export interface DataProviderProps {
  link: string;
}
export interface IDataProvider {
  addNewLink: string;
  columns: GridColumns;
  deleteHook: () => any;
  detailsLink: string;
  editLink: string;
  getDataHook: (params: IDataProviderSettings) => any;
  name: string;
  // Add APIs object that stores api calls
}

export interface IDataProviderSettings {
  page?: number;
  per_page?: number;
  search?: string;
  status?: number;
}
export enum Statuses {
  Archived = 0,
  Deployed = 100,
  Maintenance = 25,
  ReadyToDeploy = 50,
}

export interface IAssetFormInput extends FieldValues {
  AssetName: string;
  AssetTag: string;
  DateOfPurchase: string;
  Model: IModel | null;
  Notes: string;
  OrderNumber: string;
  Photo: File;
  PurchaseCost: number | '';
  Serial: string;
  Status: IStatus | null;
  Waranty: number | '';
}

export interface IModel {
  id: number;
  img: string;
  name: string;
}
export interface IStatus {
  id: Statuses;
  name: string;
}

export interface IInputProps {
  helperText?: string;
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute;
}
export interface IDatePickerProps extends IInputProps {
  disableFuture?: boolean;
  disablePast?: boolean;
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
