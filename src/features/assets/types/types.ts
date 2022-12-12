import { type HTMLInputTypeAttribute } from 'react';

import {
  type GridSelectionModel,
  type GridColumns,
  type GridSortDirection,
} from '@mui/x-data-grid';
import { type FieldValues } from 'react-hook-form';
import { type UseMutationResult } from 'react-query';
import { type AxiosError, type AxiosResponse } from 'axios';

export interface CustomToolbarProps {
  deleteHook: <Number>() => UseMutationResult<
    AxiosResponse<any, any>,
    AxiosError<unknown, any>,
    Number,
    unknown
  >;
  handleExport: () => any;
  handleModal: (id: GridSelectionModel) => void;
  name: string;
  resetSelection: () => {};
  selectedItems: GridSelectionModel;
}

export interface AssetsProps {
  data: IDataProvider;
  status?: number;
}
export interface ISort {
  order: GridSortDirection;
  sort: number | string;
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
  id: number;
  image: string;
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
  current_holder: { email: string; id: number };
  current_holder_id: number;
  has_image: boolean;
  id: number | string;
  image: string;
  image_extension: string;
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

export interface IChangeStatus {
  current_holder_id?: number | undefined;
  status: Statuses | undefined;
}
export interface DataProviderProps {
  link: string;
}
export interface IDataProvider {
  addNewLink: string;
  columns: GridColumns;
  deleteHook: <Number>() => UseMutationResult<
    AxiosResponse<any, any>,
    AxiosError<unknown, any>,
    Number,
    unknown
  >;
  detailsLink: string | null;
  editLink: string | null;
  exportLink: string;
  getDataHook: (params: IDataProviderSettings, enable?: boolean) => any;
  name: string;
}

export interface IDataProviderSettings {
  asset_id?: number;
  export?: boolean | string;
  item_id?: number;
  item_type?: string;
  page?: number | string;
  per_page?: number | string;
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
  currentHolder?: {
    id: number;
    name: string;
  };
}

export interface IUploadFile {
  file: File;
  notes: string;
}
export interface IModel {
  id: number;
  img?: string;
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
  data: [
    {
      expiration_date: string;
      id: number;
      key: string;
      name: string;
    },
  ];
  total: 1;
}

export interface IAssetComponents {
  data: [
    {
      category: {
        id: number;
        name: string;
      };
      id: number;
      manufacturer: {
        id: number;
        name: string;
      };
      name: string;
      serial: string;
    },
  ];
  total: number;
}

export interface IAssetHistory {
  data: [{ action: string; date: string; id: number; notes: string; target: string; user: string }];
  total: number;
}

export interface IAssetMaintenances {
  data: IMaintenance[];
  total: number;
}

export interface IAssetFiles {
  data: IAssetFile[];
  total: number;
}

export interface IAssetFile {
  download_link: string;
  extension: string;
  id: number;
  name: string;
  size: string;
  upload_date: string;
}

export interface IMaintenance {
  asset_id: number;
  end_date: string;
  id?: number;
  maintenance_type: string;
  notes: string;
  start_date: string;
  title: string;
  user?: {
    email: string;
    id: number;
  };
  user_id: number;
}

export interface IMaintenanceDetails {
  asset_id: number;
  end_date: string;
  maintenance_type: string;
  notes: string;
  start_date: string;
  title: string;
  user: { id: number; name: string };
}

export interface IMaintenanceForm {
  asset_id: number;
  end_date: string;
  maintenance_type: { id: string; name: string };
  notes: string;
  start_date: string;
  title: string;
  user_id: { id: number; name: string };
}

export type IImage = string;
